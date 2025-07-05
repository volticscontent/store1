# 🔄 Como Trocar de Loja Shopify

## 📍 **Arquivo Central:** `src/config/shopify-config.js`

Este arquivo controla **TODAS** as configurações do Shopify no projeto.

---

## 🎯 **Para trocar de loja:**

### 1. **Abra:** `src/config/shopify-config.js`

### 2. **Altere apenas estas linhas:**

```javascript
// 🎯 CONFIGURAÇÕES ATIVAS (MUDE AQUI PARA TROCAR DE LOJA)
export const SHOPIFY_CONFIG = {
  domain: 'SUA_NOVA_LOJA.myshopify.com',           // ← Mude aqui
  storefrontAccessToken: 'SEU_NOVO_TOKEN',         // ← Mude aqui
  apiVersion: '2024-01'
}

// 📦 PRODUTOS ATIVOS (MUDE AQUI PARA TROCAR IDS)
export const PRODUCTS = {
  main: {
    id: 'SEU_NOVO_ID_PRINCIPAL',                   // ← Mude aqui
    nodeIds: [
      'product-component-1750959272674',
      'product-component-1750658269915'
    ],
    name: 'Nome do Produto',
    sku: 'SEU_SKU',
    price: 49.99
  },
  cap: {
    id: 'ID_DO_BONE',                              // ← Mude aqui
    nodeId: 'product-component-1750960182776',
    name: 'Boné Thunder',
    type: 'cap'
  },
  // ... outros produtos
}
```

### 3. **Salve o arquivo**

### 4. **Recarregue a página**

✅ **PRONTO!** Todos os botões e configurações serão atualizados automaticamente.

---

## 🏪 **Configurações Pré-definidas:**

### **Loja Antiga:**
```javascript
domain: 'sryxr0-ff.myshopify.com'
token: 'cf54ba84fb3eeca3e76d2a30c008b2dc'
```

### **Loja Nova:**
```javascript
domain: 's1qbpp-6n.myshopify.com'
token: 'f8b561a2fc2d25e9124114d58c0b7643'
```

---

## 🔧 **Arquivos que são atualizados automaticamente:**

- ✅ `index.html` - Botões do Shopify
- ✅ `useCart.js` - Configurações do carrinho
- ✅ Todos os componentes Vue
- ✅ Sistema de tracking

---

## 🎨 **Para alterar cores dos botões:**

```javascript
export const BUTTON_STYLES = {
  backgroundColor: '#SUA_COR',     // ← Mude aqui
  hoverColor: '#SUA_COR_HOVER',   // ← Mude aqui
  borderRadius: '40px'
}
```

---

## 📊 **Para debug:**

No console do navegador:
```javascript
window.ShopifyHelper.logCurrentConfig()
``` 