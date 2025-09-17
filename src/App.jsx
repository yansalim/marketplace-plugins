import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Plugins from './pages/Plugins.jsx';
import Checkout from './pages/Checkout.jsx';
import PedidoConfirmado from './pages/PedidoConfirmado.jsx';

// Shell do app com Header fixo e roteamento principal.

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <Header />
      <main className="mx-auto mt-6 w-full max-w-6xl px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plugins" element={<Plugins />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
