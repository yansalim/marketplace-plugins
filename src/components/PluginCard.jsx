import { fmtBRL } from '../utils/currency.js';

// Card de plugin com controle de adicionar/remover.

export const PluginCard = ({ plugin, emCarrinho, onAdd, onRemove }) => {
  const handleClick = () => {
    if (emCarrinho) {
      onRemove(plugin.id);
    } else {
      onAdd(plugin);
    }
  };

  const baseButtonClasses = 'rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{plugin.nome}</h3>
            <p className="mt-1 text-sm text-slate-500">{plugin.descricao}</p>
          </div>
          {plugin.destaque && (
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase text-brand-800">
              Popular
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-500">
          <span className="rounded-full bg-slate-100 px-2 py-1">{plugin.categoria}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1">Versão {plugin.versao}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1">Compatível {plugin.compatibilidade}</span>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xl font-bold text-slate-900">{fmtBRL(plugin.precoBRL)}</span>
        <button
          type="button"
          onClick={handleClick}
          className={`${baseButtonClasses} ${
            emCarrinho
              ? 'bg-rose-500 text-white hover:bg-rose-400 focus:ring-rose-500 focus:ring-offset-white'
              : 'bg-brand-500 text-slate-900 hover:bg-brand-400 focus:ring-brand-600 focus:ring-offset-white'
          }`}
        >
          {emCarrinho ? 'Remover' : 'Adicionar'}
        </button>
      </div>
    </div>
  );
};
