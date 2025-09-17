import { Link } from 'react-router-dom';
import { fmtBRL } from '../utils/currency.js';
import { pluginsService } from '../services/pluginsService.js';

// Landing com hero curto e CTA principal.

const Home = () => {
  const populares = pluginsService.sugerirPopulares(3);
  const faixaPreco = `${fmtBRL(Math.min(...populares.map((p) => p.precoBRL)))} - ${fmtBRL(
    Math.max(...populares.map((p) => p.precoBRL))
  )}`;

  return (
    <section className="mt-8 grid gap-10 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
        <span className="inline-block rounded-full bg-brand-100 px-4 py-1 text-xs font-semibold uppercase text-brand-800">
          Plugins para PMEs
        </span>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Turbine seu ERP com integrações criadas para o dia a dia da sua PME.
        </h1>
        <p className="text-base text-slate-600">
          Descubra soluções de vendas, estoque, finanças e relatórios que aceleram processos e reduzem rotinas manuais.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/plugins"
            className="rounded-full bg-brand-500 px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-white"
          >
            Explorar plugins
          </Link>
          <Link
            to="/checkout"
            className="rounded-full border border-brand-300 px-6 py-3 text-center text-sm font-semibold text-brand-700 transition hover:border-brand-400 hover:text-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-2"
          >
            Ver carrinho
          </Link>
        </div>
      </div>
      <aside className="rounded-3xl border border-brand-100 bg-white p-6 shadow-lg shadow-brand-500/15">
        <h2 className="text-lg font-semibold text-slate-900">Populares da semana</h2>
        <p className="mt-2 text-sm text-slate-500">Planos entre {faixaPreco}</p>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          {populares.map((plugin) => (
            <li key={plugin.id} className="flex items-start justify-between gap-3">
              <span>
                <span className="block font-semibold text-slate-900">{plugin.nome}</span>
                <span className="block text-xs text-slate-500">{plugin.categoria}</span>
              </span>
              <span className="font-semibold text-brand-700">{fmtBRL(plugin.precoBRL)}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};

export default Home;
