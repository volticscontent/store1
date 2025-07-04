# Pixels de Tracking Instalados

## Configuração Concluída ✅

### 1. Facebook Pixel
- **ID do Pixel**: `1258450491879496`
- **Token de Acesso**: Configurado (EAAHZCzh3mL4U...)
- **Eventos Rastreados**:
  - `PageView` - Automaticamente disparado quando a página carrega
  - `InitiateCheckout` - Disparado quando o usuário clica no botão "Buy Now"
- **⚠️ Problema Resolvido**: Múltiplas inicializações corrigidas

### 2. Utmify Pixel
- **ID do Pixel**: `686750c6f365e00741fc1515`
- **Scripts Carregados**:
  - Script do Pixel: `https://cdn.utmify.com.br/scripts/pixel/pixel.js`
  - Script UTM: `https://cdn.utmify.com.br/scripts/utms/latest.js`
- **Eventos Rastreados**:
  - `PageView` - Automaticamente rastreado pelo script
  - `InitiateCheckout` - Disparado quando o usuário clica no botão "Buy Now"
- **⚠️ Problema Resolvido**: Múltiplas inicializações corrigidas

## Correções Implementadas

### 🔧 Problema: Facebook Pixel ativado 3 vezes
**Solução Implementada**:
- ✅ Sistema de flag global `__fbPixelInitialized` para evitar múltiplas inicializações
- ✅ Verificação de scripts existentes antes de carregar novos
- ✅ Singleton pattern no componente `TrackingPixels`
- ✅ Verificações robustas em todas as funções de tracking

### 🔧 Melhorias de Performance
- ✅ Carregamento inteligente de scripts (só carrega se não existir)
- ✅ Verificação de inicialização antes de disparar eventos
- ✅ Timeout de 100ms para garantir que pixels estejam prontos
- ✅ Logs detalhados para debugging

## Arquivos Criados

### 1. `components/facebook-pixel.tsx`
- Componente React para carregar e configurar o Facebook Pixel
- **NOVO**: Sistema de prevenção de múltiplas inicializações
- **NOVO**: Verificação de scripts existentes
- Inclui funções para disparar eventos personalizados
- Tratamento de erros e logs para debugging

### 2. `components/utmify-pixel.tsx`
- Componente React para carregar os scripts do Utmify
- **NOVO**: Sistema de prevenção de múltiplas inicializações
- **NOVO**: Verificação de scripts existentes
- Configuração automática do Pixel ID
- Carregamento dos scripts UTM padrão

### 3. `components/tracking-pixels.tsx`
- Componente principal que integra todos os pixels
- **NOVO**: Sistema singleton para evitar múltiplas renderizações
- **NOVO**: Timeout de 100ms para garantir que pixels estejam prontos
- Função `trackAllInitiateCheckout()` para disparar eventos em todos os pixels
- Centraliza a configuração de IDs e tokens

### 4. Integração em `components/buy-button.tsx`
- Importação do tracking de pixels
- Chamada de `trackAllInitiateCheckout()` em todas as funções de compra
- Tracking automático com valor do produto e moeda (BRL)

### 5. Integração em `app/layout.tsx`
- Componente `TrackingPixels` adicionado ao layout principal
- Carregamento automático dos pixels em todas as páginas

## Como Funciona

### PageView
- **Facebook Pixel**: Disparado automaticamente quando o componente carrega (APENAS UMA VEZ)
- **Utmify**: Rastreado automaticamente pelo script UTM

### InitiateCheckout
- Disparado quando o usuário clica em qualquer botão "Buy Now"
- **NOVO**: Timeout de 100ms para garantir que pixels estejam prontos
- Inclui o valor do produto e moeda (BRL)
- Funciona em todos os componentes de botão:
  - `BuyButton` (botão genérico)
  - `ShopifyBuyButton` (botão principal do Shopify)
  - `ShopifyBuyButtonCompact` (botão compacto do sticky footer)

## Debugging

Para verificar se os pixels estão funcionando:

1. Abra o Console do navegador (F12)
2. Procure pelas mensagens de log:
   - `Inicializando pixels de tracking...`
   - `Facebook Pixel carregado com sucesso`
   - `Utmify Pixel carregado com sucesso`
   - `Facebook Pixel - InitiateCheckout tracked: [valor] BRL`
   - `Utmify - InitiateCheckout tracked: [valor] BRL`

### 🚨 Mensagens de Prevenção
Se você ver essas mensagens, significa que o sistema está funcionando corretamente:
- `Facebook Pixel já foi inicializado, pulando...`
- `Utmify Pixel já foi inicializado, pulando...`
- `Pixels já foram inicializados, pulando renderização...`

## Configurações Atuais

```javascript
// Facebook Pixel
const FACEBOOK_PIXEL_ID = '1258450491879496'
const FACEBOOK_ACCESS_TOKEN = 'EAAHZCzh3mL4U...'

// Utmify Pixel
const UTMIFY_PIXEL_ID = '686750c6f365e00741fc1515'
```

## Status
- ✅ Facebook Pixel instalado e configurado
- ✅ Utmify Pixel instalado e configurado
- ✅ Eventos PageView funcionando (SEM DUPLICAÇÃO)
- ✅ Eventos InitiateCheckout funcionando
- ✅ Integração completa com botões de compra
- ✅ Logs de debugging implementados
- ✅ **NOVO**: Sistema de prevenção de múltiplas inicializações
- ✅ **NOVO**: Verificação de scripts existentes
- ✅ **NOVO**: Singleton pattern implementado
- ✅ **NOVO**: Timeout para garantir que pixels estejam prontos

## ⚠️ Problema Resolvido
O warning "Facebook pixel activated 3 times" foi corrigido através de:
1. Sistema de flags globais para evitar múltiplas inicializações
2. Verificação de scripts existentes antes de carregar novos
3. Singleton pattern no componente principal
4. Verificações robustas em todas as funções de tracking 