import crypto from 'crypto';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount } = req.body;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({ error: 'El importe no es válido' });
    }

    // Redsys expects amount as integer in cents (e.g. 10.00 EUR -> 1000)
    const amountInCents = Math.round(Number(amount) * 100).toString();

    // Generate unique order ID. Must be 4 to 12 chars, starting with at least 4 digits.
    // We use current year+month (4 digits, e.g. 2606) + a 6-digit random number.
    const yearMonth = new Date().toISOString().slice(2, 7).replace('-', ''); // e.g. "2606"
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
    const orderId = `${yearMonth}${randomDigits}`;

    // Get config from environment variables (or fallbacks for Sandbox testing)
    const merchantKey = process.env.REDSYS_SECRET_KEY || 'sq7HjrUOBfKmC576ILgskD5srU870gJ7';
    const merchantCode = process.env.REDSYS_MERCHANT_CODE || '999008881';
    const terminal = process.env.REDSYS_TERMINAL || '1';
    const isProduction = process.env.REDSYS_ENVIRONMENT === 'production';
    
    // Determine the environment URL
    const actionUrl = isProduction
      ? 'https://sis.redsys.es/sis/realizarPago'
      : 'https://sis-t.redsys.es:25443/sis/realizarPago';

    // Base URL of the website
    const host = req.headers.host || 'suenocompartido.org';
    const protocol = host.startsWith('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    // Parameters expected by Redsys
    const params = {
      DS_MERCHANT_AMOUNT: amountInCents,
      DS_MERCHANT_ORDER: orderId,
      DS_MERCHANT_MERCHANTCODE: merchantCode,
      DS_MERCHANT_CURRENCY: '978', // Euro
      DS_MERCHANT_TRANSACTIONTYPE: '0', // Autorización
      DS_MERCHANT_TERMINAL: terminal,
      DS_MERCHANT_MERCHANTURL: `${baseUrl}/api/payment-webhook`,
      DS_MERCHANT_URLOK: `${baseUrl}/transparencia?status=success&order=${orderId}`,
      DS_MERCHANT_URLKO: `${baseUrl}/transparencia?status=error&order=${orderId}`,
    };

    // Convert parameters to JSON and Base64 encode
    const merchantParameters = Buffer.from(JSON.stringify(params)).toString('base64');

    // Cryptographic signature calculation (Redsys HMAC-SHA256)
    // 1. Decode base64 merchant key
    const key = Buffer.from(merchantKey, 'base64');

    // 2. Encrypt orderId with 3DES (des-ede3-cbc), using IV of 8 zero bytes
    const iv = Buffer.alloc(8, 0);
    const cipher = crypto.createCipheriv('des-ede3-cbc', key, iv);
    cipher.setAutoPadding(false);

    // Manual zero padding of the orderId to 3DES block size (8 bytes)
    const blockSize = 8;
    const paddingLength = blockSize - (orderId.length % blockSize);
    const paddedOrderId = Buffer.concat([
      Buffer.from(orderId, 'utf8'),
      Buffer.alloc(paddingLength, 0)
    ]);

    let derivedKey = cipher.update(paddedOrderId);
    derivedKey = Buffer.concat([derivedKey, cipher.final()]);

    // 3. HMAC-SHA256 of the Base64-encoded parameters using the derived key
    const hmac = crypto.createHmac('sha256', derivedKey);
    hmac.update(merchantParameters);
    const signature = hmac.digest('base64');

    // Return the required fields for the form POST request
    return res.status(200).json({
      actionUrl,
      signatureVersion: 'HMAC_SHA256_V1',
      merchantParameters,
      signature,
      orderId,
    });
  } catch (error) {
    console.error('Error generating Redsys signature:', error);
    return res.status(500).json({ error: 'Error interno al generar la solicitud de pago' });
  }
};
