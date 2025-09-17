// Barra de filtros com busca e seleção de categoria.

export const FiltersBar = ({ termo, categoria, categorias, onTermoChange, onCategoriaChange }) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40 sm:flex-row sm:items-center">
      <label className="flex flex-1 items-center gap-3 rounded-full bg-slate-100 px-4 py-2">
        <span className="text-sm font-medium text-slate-500">Buscar</span>
        <input
          type="search"
          value={termo}
          onChange={(event) => onTermoChange(event.target.value)}
          placeholder="Nome ou descrição"
          className="w-full bg-transparent text-sm text-slate-700 outline-none"
          aria-label="Buscar plugins"
        />
      </label>
      <label className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-500">Categoria</span>
        <select
          value={categoria}
          onChange={(event) => onCategoriaChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
          aria-label="Filtrar por categoria"
        >
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
