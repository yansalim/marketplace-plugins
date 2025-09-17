// Modelos compartilhados para plugins e pedidos.

/**
 * @typedef {Object} Plugin
 * @property {string} id
 * @property {string} nome
 * @property {string} descricao
 * @property {'Fiscal' | 'Financeiro' | 'Estoque' | 'Vendas' | 'Relatórios'} categoria
 * @property {string} versao
 * @property {string} compatibilidade
 * @property {number} precoBRL
 * @property {boolean} [destaque]
 */

/**
 * @typedef {Object} Pedido
 * @property {string} id
 * @property {{ pluginId: string, nome: string, precoBRL: number }[]} itens
 * @property {number} totalBRL
 * @property {string} criadoEm
 */

export const PluginCategorias = ['Fiscal', 'Financeiro', 'Estoque', 'Vendas', 'Relatórios'];
