import { useEffect, useRef } from 'react';
import { fmtBRL } from '../utils/currency.js';

// Overlay de sucesso exibido após confirmar pedido.

export const SuccessOverlay = ({ aberto, totalBRL, onOk }) => {
  const botaoRef = useRef(null);

  useEffect(() => {
    if (aberto && botaoRef.current) {
      botaoRef.current.focus();
    }
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Confirmação de compra"
    >
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
        <h2 className="text-lg font-semibold text-slate-900">Adquirido com sucesso!</h2>
        <p className="mt-3 text-sm text-slate-600">
          A cobrança no valor de <strong className="text-slate-900">{fmtBRL(totalBRL)}</strong> virá no próximo boleto.
        </p>
        <button
          ref={botaoRef}
          type="button"
          onClick={onOk}
          className="mt-6 w-full rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-white"
        >
          OK
        </button>
      </div>
    </div>
  );
};
