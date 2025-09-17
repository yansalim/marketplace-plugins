// Utilidades puras para valores monetários em BRL.

export const fmtBRL = (n) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);

export const calculateTotalBRL = (itens) => itens.reduce((acc, item) => acc + (item.precoBRL ?? 0), 0);
