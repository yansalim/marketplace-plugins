import { fmtBRL } from '../utils/currency.js';

// Lista de itens do checkout com ação para remover e subtotal.

export const CheckoutList = ({ itens, onRemove }) => {
  if (!itens.length) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
        Seu carrinho está vazio. Adicione plugins para finalizar a compra.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {itens.map((item) => (
        <li
          key={item.pluginId}
          className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">{item.nome}</p>
            <p className="text-xs text-slate-500">{fmtBRL(item.precoBRL)}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.pluginId)}
            className="text-sm font-medium text-rose-500 transition hover:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-white"
          >
            Remover
          </button>
        </li>
      ))}
    </ul>
  );
};
