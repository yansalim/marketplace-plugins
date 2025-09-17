import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { calculateTotalBRL } from '../utils/currency.js';

// Estado global do carrinho com persistência simples em localStorage.

const STORAGE_KEY = 'marketplace.plugins.carrinho';

const initialState = { itens: [], totalBRL: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'HYDRATE': {
      const itens = action.payload?.itens ?? [];
      return {
        itens,
        totalBRL: calculateTotalBRL(itens),
      };
    }
    case 'ADD_ITEM': {
      const existe = state.itens.some((item) => item.pluginId === action.payload.pluginId);
      if (existe) return state;
      const itens = [...state.itens, action.payload];
      return {
        itens,
        totalBRL: calculateTotalBRL(itens),
      };
    }
    case 'ADD_BATCH': {
      const atuais = new Map(state.itens.map((item) => [item.pluginId, item]));
      action.payload.forEach((item) => {
        if (!atuais.has(item.pluginId)) {
          atuais.set(item.pluginId, item);
        }
      });
      const itens = Array.from(atuais.values());
      return {
        itens,
        totalBRL: calculateTotalBRL(itens),
      };
    }
    case 'REMOVE_ITEM': {
      const itens = state.itens.filter((item) => item.pluginId !== action.payload);
      return {
        itens,
        totalBRL: calculateTotalBRL(itens),
      };
    }
    case 'CLEAR': {
      return initialState;
    }
    default:
      return state;
  }
};

const CartContext = createContext({
  itens: [],
  totalBRL: 0,
  addItem: () => {},
  addBatch: () => {},
  removeItem: () => {},
  clear: () => {},
});

const lerStorage = () => {
  if (typeof window === 'undefined') return initialState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const data = JSON.parse(raw);
    const itens = Array.isArray(data.itens) ? data.itens : [];
    return {
      itens,
      totalBRL: calculateTotalBRL(itens),
    };
  } catch (error) {
    console.error('Erro ao carregar carrinho salvo', error);
    return initialState;
  }
};

const salvarStorage = (state) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ itens: state.itens, totalBRL: state.totalBRL })
    );
  } catch (error) {
    console.error('Erro ao persistir carrinho', error);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const iniciou = useRef(false);

  useEffect(() => {
    if (!iniciou.current) {
      const salvo = lerStorage();
      dispatch({ type: 'HYDRATE', payload: salvo });
      iniciou.current = true;
    }
  }, []);

  useEffect(() => {
    if (!iniciou.current) return;
    salvarStorage(state);
  }, [state]);

  const addItem = (plugin) => {
    if (!plugin) return;
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        pluginId: plugin.id,
        nome: plugin.nome,
        precoBRL: plugin.precoBRL,
      },
    });
  };

  const addBatch = (plugins) => {
    if (!Array.isArray(plugins) || !plugins.length) return;
    dispatch({
      type: 'ADD_BATCH',
      payload: plugins.map((plugin) => ({
        pluginId: plugin.id,
        nome: plugin.nome,
        precoBRL: plugin.precoBRL,
      })),
    });
  };

  const removeItem = (pluginId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: pluginId });
  };

  const clear = () => dispatch({ type: 'CLEAR' });

  return (
    <CartContext.Provider value={{ ...state, addItem, addBatch, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
