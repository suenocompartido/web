import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';

export function RootLayout() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const status = searchParams.get('status');
    const order = searchParams.get('order');

    if (status === 'success') {
      toast.success('¡Muchas gracias por tu donativo!', {
        description: `Tu colaboración (Ref: ${order || ''}) se ha procesado con éxito.`,
        duration: 8000,
      });
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('status');
      newParams.delete('order');
      setSearchParams(newParams, { replace: true });
    } else if (status === 'error') {
      toast.error('La donación no se pudo completar', {
        description: 'Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.',
        duration: 8000,
      });
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('status');
      newParams.delete('order');
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}
