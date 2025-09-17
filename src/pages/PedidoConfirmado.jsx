import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersService } from '../services/ordersService.js';
import { fmtBRL } from '../utils/currency.js';

// Tela após a confirmação, exibindo resumo do último pedido.

const PedidoConfirmado = () => {
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const ultimo = ordersService.obterUltimoPedido();
    setPedido(ultimo);
  }, []);

  return (
    <section className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-3xl border border-brand-100 bg-white p-8 text-center shadow-lg shadow-brand-500/15">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-2xl">✅</span>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Pedido registrado</h1>
        <p className="text-sm text-slate-600">
          Tudo certo! Em breve você receberá o lançamento deste pedido junto ao seu boleto mensal.
        </p>
        {pedido && (
          <p className="text-sm text-slate-600">
            Total do pedido: <strong className="text-slate-900">{fmtBRL(pedido.totalBRL)}</strong>
          </p>
        )}
      </div>
      <Link
        to="/plugins"
        className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-white"
      >
        Explorar novos plugins
      </Link>
    </section>
  );
};

export default PedidoConfirmado;
