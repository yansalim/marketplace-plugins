// Serviço simples em memória para consulta dos plugins.

import { PluginCategorias } from '../models/index.js';

const pluginSeed = [
  {
    id: 'plugin-nf-e',
    nome: 'Nota Fiscal Eletrônica',
    descricao: 'Emita NF-e em poucos cliques com validação automática.',
    categoria: 'Fiscal',
    versao: '2.3.1',
    compatibilidade: 'ERP XPTO 12+',
    precoBRL: 199.9,
    destaque: true,
  },
  {
    id: 'plugin-sefaz-sync',
    nome: 'Sincronização SEFAZ',
    descricao: 'Consulta e concilia dados da SEFAZ com seu ERP.',
    categoria: 'Fiscal',
    versao: '1.9.0',
    compatibilidade: 'ERP XPTO 11+',
    precoBRL: 149.9,
  },
  {
    id: 'plugin-cnab',
    nome: 'Integração CNAB',
    descricao: 'Gere arquivos CNAB e envie para os principais bancos.',
    categoria: 'Fiscal',
    versao: '3.1.0',
    compatibilidade: 'ERP XPTO 10+',
    precoBRL: 89.9,
  },
  {
    id: 'plugin-conciliacao',
    nome: 'Conciliação Bancária Automática',
    descricao: 'Importe extratos e concilie lançamentos em segundos.',
    categoria: 'Financeiro',
    versao: '4.0.0',
    compatibilidade: 'ERP XPTO 12+',
    precoBRL: 249.9,
    destaque: true,
  },
  {
    id: 'plugin-dre-simples',
    nome: 'DRE Simplificado',
    descricao: 'Visualize o desempenho financeiro com indicadores claros.',
    categoria: 'Financeiro',
    versao: '1.5.2',
    compatibilidade: 'ERP XPTO 9+',
    precoBRL: 59.9,
  },
  {
    id: 'plugin-gestao-boletos',
    nome: 'Gestão de Boletos',
    descricao: 'Emita e controle boletos com lembretes automáticos.',
    categoria: 'Financeiro',
    versao: '2.2.0',
    compatibilidade: 'ERP XPTO 10+',
    precoBRL: 129.9,
  },
  {
    id: 'plugin-lote-validade',
    nome: 'Gestão de Lotes e Validade',
    descricao: 'Controle lotes, validade e alertas de reposição.',
    categoria: 'Estoque',
    versao: '2.0.3',
    compatibilidade: 'ERP XPTO 11+',
    precoBRL: 179.9,
  },
  {
    id: 'plugin-inventario-movel',
    nome: 'Inventário Móvel',
    descricao: 'Realize inventários em tempo real com qualquer dispositivo.',
    categoria: 'Estoque',
    versao: '3.4.1',
    compatibilidade: 'ERP XPTO 12+',
    precoBRL: 229.9,
    destaque: true,
  },
  {
    id: 'plugin-integracao-ean',
    nome: 'Integração EAN',
    descricao: 'Leia códigos EAN/GTIN e atualize o catálogo automaticamente.',
    categoria: 'Estoque',
    versao: '1.8.0',
    compatibilidade: 'ERP XPTO 9+',
    precoBRL: 139.9,
  },
  {
    id: 'plugin-comissoes',
    nome: 'Gestão de Comissões',
    descricao: 'Calcule comissões por vendedor e acompanhe metas.',
    categoria: 'Vendas',
    versao: '2.6.0',
    compatibilidade: 'ERP XPTO 10+',
    precoBRL: 189.9,
  },
  {
    id: 'plugin-orcamentos',
    nome: 'Orçamentos Ágeis',
    descricao: 'Gere propostas profissionais e acompanhe aprovações.',
    categoria: 'Vendas',
    versao: '2.1.2',
    compatibilidade: 'ERP XPTO 9+',
    precoBRL: 99.9,
  },
  {
    id: 'plugin-pdv-offline',
    nome: 'PDV Offline',
    descricao: 'Continue vendendo mesmo sem conexão, com sincronização posterior.',
    categoria: 'Vendas',
    versao: '5.0.0',
    compatibilidade: 'ERP XPTO 12+',
    precoBRL: 299.9,
    destaque: true,
  },
  {
    id: 'plugin-painel-kpi',
    nome: 'Painel KPI Executivo',
    descricao: 'Dashboards interativos com os principais KPIs do negócio.',
    categoria: 'Relatórios',
    versao: '3.3.3',
    compatibilidade: 'ERP XPTO 11+',
    precoBRL: 249.9,
  },
  {
    id: 'plugin-exportacao-avancada',
    nome: 'Exportação Avançada',
    descricao: 'Defina layouts personalizados e exporte para BI.',
    categoria: 'Relatórios',
    versao: '1.4.0',
    compatibilidade: 'ERP XPTO 10+',
    precoBRL: 169.9,
  },
  {
    id: 'plugin-dashboard-vendas',
    nome: 'Dashboard de Vendas Omni',
    descricao: 'Consolide todas as vendas em um painel unificado.',
    categoria: 'Vendas',
    versao: '1.0.0',
    compatibilidade: 'ERP XPTO 12+',
    precoBRL: 219.9,
  },
];

export const pluginsService = {
  listAll() {
    return [...pluginSeed];
  },
  buscar({ termo = '', categoria = 'Todos' } = {}) {
    const normalizado = termo.trim().toLowerCase();
    return pluginSeed.filter((plugin) => {
      const correspondeBusca = normalizado
        ? `${plugin.nome} ${plugin.descricao}`.toLowerCase().includes(normalizado)
        : true;
      const correspondeCategoria = categoria === 'Todos' ? true : plugin.categoria === categoria;
      return correspondeBusca && correspondeCategoria;
    });
  },
  obterPorId(id) {
    return pluginSeed.find((plugin) => plugin.id === id) ?? null;
  },
  sugerirPopulares(quantidade = 3) {
    const populares = pluginSeed.filter((plugin) => plugin.destaque);
    if (populares.length >= quantidade) {
      return populares.slice(0, quantidade);
    }
    return pluginSeed.slice(0, quantidade);
  },
  categoriasDisponiveis() {
    return ['Todos', ...PluginCategorias];
  },
};
