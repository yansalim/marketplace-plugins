// Persistência de pedidos no localStorage.

const STORAGE_KEY = 'marketplace.plugins.pedidos';

const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage;

const readPedidos = () => {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Falha ao ler pedidos salvos', error);
    return [];
  }
};

const writePedidos = (pedidos) => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
  } catch (error) {
    console.error('Falha ao salvar pedidos', error);
  }
};

export const ordersService = {
  salvarPedido(pedido) {
    const pedidos = readPedidos();
    pedidos.push(pedido);
    writePedidos(pedidos);
    return pedido;
  },
  listarPedidos() {
    return readPedidos();
  },
  obterUltimoPedido() {
    const pedidos = readPedidos();
    return pedidos.length ? pedidos[pedidos.length - 1] : null;
  },
};
