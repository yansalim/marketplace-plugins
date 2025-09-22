import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../store/cartContext.jsx';
import { CartIcon } from './CartIcon.jsx';

// Header fixo com navegação principal.

const activeClasses = 'text-brand-700 font-semibold';
const baseLink = 'text-sm font-medium text-slate-600 transition hover:text-brand-700';

export const Header = () => {
  const { itens } = useCart();
  const quantidade = itens.length;

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          Marketplace
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          <NavLink to="/" className={({ isActive }) => `${baseLink} ${isActive ? activeClasses : ''}`}>
            Início
          </NavLink>
          <NavLink
            to="/plugins"
            className={({ isActive }) => `${baseLink} ${isActive ? activeClasses : ''}`}
          >
            Plugins
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) => `${baseLink} ${isActive ? activeClasses : ''}`}
          >
            Checkout
          </NavLink>
        </nav>
        <Link
          to="/checkout"
          className="flex items-center gap-3 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-brand-500/15 transition hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-white"
        >
          <span className="hidden sm:inline">Carrinho</span>
          <CartIcon quantidade={quantidade} />
        </Link>
      </div>
    </header>
  );
};
