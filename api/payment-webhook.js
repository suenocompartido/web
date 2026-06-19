const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Redsys parameters are sent in the request body (usually urlencoded or json)
    const { Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature } = req.body || {};

    if (!Ds_MerchantParameters || !Ds_Signature) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    // 1. Decode parameters
    const decodedParamsStr = Buffer.from(Ds_MerchantParameters, 'base64').toString('utf8');
    const params = JSON.parse(decodedParamsStr);

    const orderId = params.Ds_Order || params.DS_MERCHANT_ORDER;
    const responseCode = Number(params.Ds_Response || params.DS_RESPONSE);

    // 2. Re-calculate signature to verify authenticity
    const merchantKey = process.env.REDSYS_SECRET_KEY || 'sq7HjrUOBfKmC576ILgskD5srU870gJ7';
    
    // Decode base64 merchant key
    const key = Buffer.from(merchantKey, 'base64');

    // Encrypt orderId with 3DES
    const iv = Buffer.alloc(8, 0);
    const cipher = crypto.createCipheriv('des-ede3-cbc', key, iv);
    cipher.setAutoPadding(false);

    const blockSize = 8;
    const paddingLength = blockSize - (orderId.length % blockSize);
    const paddedOrderId = Buffer.concat([
      Buffer.from(orderId, 'utf8'),
      Buffer.alloc(paddingLength, 0)
    ]);

    let derivedKey = cipher.update(paddedOrderId);
    derivedKey = Buffer.concat([derivedKey, cipher.final()]);

    // Calculate HMAC-SHA256
    const hmac = crypto.createHmac('sha256', derivedKey);
    hmac.update(Ds_MerchantParameters);
    const calculatedSignature = hmac.digest('base64');

    // Replace URL-safe characters in received signature if necessary
    const receivedSignature = Ds_Signature.replace(/-/g, '+').replace(/_/g, '/');

    if (calculatedSignature !== receivedSignature) {
      console.error('Signature verification failed! Potential tampering.');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Check payment result
    const isSuccess = responseCode >= 0 && responseCode <= 99;

    if (isSuccess) {
      console.log(`Payment SUCCESS for Order: ${orderId}, Amount: ${params.Ds_Amount}, Response: ${responseCode}`);
    } else {
      console.log(`Payment FAILED for Order: ${orderId}, Response: ${responseCode}`);
    }

    // Always respond with 200 OK to Redsys
    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing Redsys webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
