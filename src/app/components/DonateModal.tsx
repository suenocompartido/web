import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Heart, CreditCard, Loader2 } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DonateModal({ isOpen, onOpenChange }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bizum'>('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presets = [5, 10, 20, 50];

  const handlePresetSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setError(null);
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount(null);
    setError(null);
  };

  const getFinalAmount = (): number => {
    if (selectedAmount !== null) {
      return selectedAmount;
    }
    const parsed = parseFloat(customAmount);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = getFinalAmount();

    if (finalAmount <= 0) {
      setError('Por favor, selecciona o introduce un importe válido para donar.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Fetch Redsys signature and parameters from serverless function
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: finalAmount, method: paymentMethod }),
      });

      if (!response.ok) {
        let errMsg = 'Error al procesar la solicitud.';
        try {
          const errorData = await response.json();
          errMsg = errorData.error || errMsg;
        } catch (_) {
          errMsg = `El servidor devolvió un error (Código: ${response.status}).`;
        }
        throw new Error(errMsg);
      }

      const paymentData = await response.json();
      const { actionUrl, signatureVersion, merchantParameters, signature } = paymentData;

      // 2. Create dynamic form to perform a POST redirect to Redsys
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = actionUrl;

      const addInput = (name: string, value: string) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      addInput('Ds_SignatureVersion', signatureVersion);
      addInput('Ds_MerchantParameters', merchantParameters);
      addInput('Ds_Signature', signature);

      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ha ocurrido un error al conectar con el servidor.');
      setLoading(false);
    }
  };

  const currentAmount = getFinalAmount();
  const isBizum = paymentMethod === 'bizum';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-8 rounded-2xl">
        <DialogHeader className="items-center text-center">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
            <Heart className="w-8 h-8 fill-primary/20" />
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Haz un Donativo
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground mt-2">
            Tu generosidad nos ayuda a ofrecer apoyo, recursos y terapias a los afectados por esclerosis, ELA y enfermedades similares en Los Pedroches.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleDonate} className="space-y-6 mt-4">
          {/* Preset Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`py-3 px-2 rounded-xl text-lg font-semibold border-2 transition-all ${
                  selectedAmount === preset
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-white text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
                }`}
              >
                {preset}€
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground block">
              U otro importe personalizado (€)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="1"
                placeholder="Ej. 15.00"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white border border-border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground font-semibold text-lg">
                EUR
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground block">
              Método de pago
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-medium cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-white text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-base">Tarjeta</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('bizum')}
                className={`py-3 px-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-medium cursor-pointer ${
                  paymentMethod === 'bizum'
                    ? 'border-[#00A499] bg-[#00A499]/5 text-[#00A499]'
                    : 'border-border bg-white text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A499] flex-shrink-0" />
                <span className="text-base font-bold tracking-tight">Bizum</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? undefined : (isBizum ? '#00A499' : undefined)
            }}
            className={`w-full py-4 text-white font-semibold rounded-xl text-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${
              isBizum
                ? 'hover:bg-[#008f85] focus:ring-[#00A499]'
                : 'bg-primary hover:bg-accent focus:ring-primary'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Conectando con TPV...</span>
              </>
            ) : (
              <>
                {isBizum ? (
                  <>
                    <span className="w-3 h-3 rounded-full bg-white" />
                    <span>Donar con Bizum {currentAmount > 0 ? `${currentAmount.toFixed(2)} €` : ''}</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-6 h-6" />
                    <span>Donar con Tarjeta {currentAmount > 0 ? `${currentAmount.toFixed(2)} €` : ''}</span>
                  </>
                )}
              </>
            )}
          </button>

          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            Serás redirigido de forma segura a la pasarela oficial de pago TPV de CaixaBank (Cyberpac) para completar la transacción.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
