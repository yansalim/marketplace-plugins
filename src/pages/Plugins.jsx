import { useMemo, useState } from 'react';
import { PluginCard } from '../components/PluginCard.jsx';
import { FiltersBar } from '../components/FiltersBar.jsx';
import { useCart } from '../store/cartContext.jsx';
import { pluginsService } from '../services/pluginsService.js';

// Página de catálogo com busca, filtros e ação demo.

const Plugins = () => {
  const categorias = useMemo(() => pluginsService.categoriasDisponiveis(), []);
  const [termo, setTermo] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const { itens, addItem, removeItem, addBatch } = useCart();
  const itensIds = useMemo(() => itens.map((item) => item.pluginId), [itens]);

  const pluginsFiltrados = useMemo(
    () => pluginsService.buscar({ termo, categoria }),
    [termo, categoria]
  );

  const handleDemo = () => {
    const populares = pluginsService.sugerirPopulares(3);
    addBatch(populares);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Marketplace de Plugins</h1>
          <p className="text-sm text-slate-600">
            Explore integrações por categoria ou utilize a busca por palavra-chave.
          </p>
        </div>
        <button
          type="button"
          onClick={handleDemo}
          className="self-start rounded-full border border-brand-300 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-200"
        >
          Adicionar 3 plugins populares
        </button>
      </div>

      <FiltersBar
        termo={termo}
        categoria={categoria}
        categorias={categorias}
        onTermoChange={setTermo}
        onCategoriaChange={setCategoria}
      />

      {pluginsFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-brand-200 bg-white p-10 text-center">
          <span className="text-4xl">🔍</span>
          <p className="text-sm text-slate-500">
            Nenhum plugin encontrado com os filtros atuais. Ajuste a busca ou categoria para ver outras opções.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pluginsFiltrados.map((plugin) => (
            <PluginCard
              key={plugin.id}
              plugin={plugin}
              emCarrinho={itensIds.includes(plugin.id)}
              onAdd={addItem}
              onRemove={removeItem}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Plugins;
