# Marketplace de Plugins

Aplicativo web em React para explorar, adicionar ao carrinho e comprar plugins de um ERP para PMEs.

## Requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
npm install
```

## Executar em modo desenvolvimento

```bash
npm run dev
```

O servidor local será iniciado pelo Vite. Acesse o endereço indicado no terminal (geralmente `http://localhost:5173`).

## Funcionalidades

- Catálogo de 15 plugins com filtros por categoria e busca textual.
- Carrinho global com persistência em `localStorage`.
- Checkout com cálculo automático de subtotal e total.
- Fluxo de compra sem pagamento real, exibindo overlay de sucesso com o total em BRL.
- Registro de pedidos em `localStorage` e tela de confirmação dedicada.
- Botão "Adicionar 3 plugins populares" para modo demo/QA.
