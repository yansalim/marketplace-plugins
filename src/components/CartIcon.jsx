const CarrinhoSvg = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h9.8a1 1 0 00.98-.8l1.2-6H6.42"
    />
    <circle cx="9" cy="19" r="1.5" />
    <circle cx="17" cy="19" r="1.5" />
  </svg>
);

export const CartIcon = ({ quantidade = 0 }) => {
  const mostrarBadge = quantidade > 0;
  return (
    <span
      className="relative inline-flex items-center"
      aria-label={`Carrinho com ${quantidade} itens`}
    >
      <CarrinhoSvg className="h-6 w-6 text-slate-900" />
      {mostrarBadge && (
        <span className="absolute -top-1 -right-1 min-w-[1.25rem] rounded-full bg-rose-500 px-1 text-center text-xs font-semibold text-white">
          {quantidade}
        </span>
      )}
    </span>
  );
};
