import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutList } from '../components/CheckoutList.jsx';
import { SuccessOverlay } from '../components/SuccessOverlay.jsx';
import { useCart } from '../store/cartContext.jsx';
import { ordersService } from '../services/ordersService.js';
import { calculateTotalBRL, fmtBRL } from '../utils/currency.js';

// Fechamento do pedido com resumo financeiro e confirmação.

const Checkout = () => {
  const navigate = useNavigate();
  const { itens, removeItem, clear } = useCart();
  const total = useMemo(() => calculateTotalBRL(itens), [itens]);
  const [overlayAberto, setOverlayAberto] = useState(false);
  const [totalConfirmado, setTotalConfirmado] = useState(0);

  const confirmarCompra = () => {
    if (!itens.length) return;

    const pedido = {
      id: `pedido-${Date.now()}`,
      itens: itens.map((item) => ({ ...item })),
      totalBRL: total,
      criadoEm: new Date().toISOString(),
    };

    ordersService.salvarPedido(pedido);
    setTotalConfirmado(total);
    setOverlayAberto(true);
    clear();
  };

  const handleOk = () => {
    setOverlayAberto(false);
    navigate('/pedido-confirmado');
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
          <p className="text-sm text-slate-600">
            Revise os plugins adicionados ao carrinho e confirme a compra quando estiver tudo certo.
          </p>
        </div>
        <CheckoutList itens={itens} onRemove={removeItem} />
      </div>
      <aside className="h-max space-y-4 rounded-3xl border border-brand-100 bg-white p-6 shadow-lg shadow-brand-500/15">
        <h2 className="text-lg font-semibold text-slate-900">Resumo</h2>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span>{fmtBRL(total)}</span>
        </div>
        <div className="flex items-center justify-between text-base font-semibold text-slate-900">
          <span>Total</span>
          <span>{fmtBRL(total)}</span>
        </div>
        <button
          type="button"
          onClick={confirmarCompra}
          disabled={!itens.length}
          className="w-full rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          Confirmar compra
        </button>
        <p className="text-xs text-slate-500">
          Nada será cobrado automaticamente. Registramos o pedido e enviaremos no próximo boleto.
        </p>
      </aside>

      <SuccessOverlay aberto={overlayAberto} totalBRL={totalConfirmado} onOk={handleOk} />
    </section>
  );
};

export default Checkout;
