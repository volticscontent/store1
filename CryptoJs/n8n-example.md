# 📡 Como Usar no n8n

## 🔧 Configuração no n8n

### 1. HTTP Request Node (Recomendado)

Adicione um nó "HTTP Request" após receber o webhook do Shopify:

**Configurações:**
- **Method:** POST
- **URL:** `http://161.35.141.62:3000/crypto/shopify-webhook`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body:** Use a saída completa do webhook do Shopify

### 2. Para Dados Específicos

Se você quiser enviar dados específicos:

**URL:** `http://161.35.141.62:3000/crypto/tiktok`

**Body:**
```json
{
  "email": "{{$json.email}}",
  "phone": "{{$json.phone}}",
  "value": "{{$json.total_price}}",
  "currency": "{{$json.currency}}",
  "order_id": "{{$json.id}}",
  "description": "{{$json.line_items[0].title}}"
}
```

### 3. Execute Command Node

Se preferir usar linha de comando:

```bash
curl -X POST http://161.35.141.62:3000/crypto/shopify-webhook \
  -H "Content-Type: application/json" \
  -d '{{JSON.stringify($json)}}'
```

## 📤 Resposta do Servidor

O servidor retorna um payload completo pronto para envio ao TikTok:

```json
{
  "success": true,
  "tiktok_payload": {
    "pixel_code": "{{PIXEL_CODE}}",
    "event": "Purchase",
    "event_id": "order_123456",
    "timestamp": "1751319836",
    "context": {
      "user_agent": "Shopify-TikTok-Integration",
      "ip": "{{IP_ADDRESS}}",
      "user": {
        "email": "hash_do_email_em_sha256",
        "phone": "hash_do_telefone_em_sha256",
        "external_id": "id_externo_baseado_no_hash"
      },
      "page": {
        "url": "{{SHOPIFY_STORE_URL}}",
        "referrer": "{{REFERRER}}"
      }
    },
    "properties": {
      "contents": [{
        "content_id": "order_123456",
        "content_type": "product",
        "content_name": "Nome do Produto",
        "brand": "{{SHOPIFY_STORE_NAME}}",
        "price": 150.99,
        "quantity": 1
      }],
      "currency": "BRL",
      "value": 150.99,
      "content_type": "product",
      "order_id": "order_123456"
    }
  },
  "shopify_data": {
    "order_id": "123456",
    "email": "usuario@email.com",
    "phone": "11999999999",
    "total_value": 150.99,
    "currency": "BRL",
    "product_name": "Nome do Produto"
  }
}
```

## 🎯 Enviando para o TikTok

Após processar os dados, use outro HTTP Request Node para enviar ao TikTok:

**URL:** `https://business-api.tiktok.com/open_api/v1.3/event/track/`

**Headers:**
```
Content-Type: application/json
Access-Token: SEU_ACCESS_TOKEN_AQUI
```

**Body:** Use `{{$json.tiktok_payload}}` da resposta do nosso servidor

## 🔄 Fluxo Completo no n8n

1. **Webhook** - Recebe dados do Shopify
2. **HTTP Request** - Envia para nosso servidor (`/crypto/shopify-webhook`)
3. **HTTP Request** - Envia payload criptografado para TikTok
4. **IF/Switch** - Verifica se o envio foi bem-sucedido

## 🛠️ Substituição de Variáveis

No payload retornado, substitua os placeholders:
- `{{PIXEL_CODE}}` - Seu código do pixel TikTok
- `{{IP_ADDRESS}}` - IP do usuário (se disponível)
- `{{PAGE_URL}}` - URL da página de checkout
- `{{REFERRER}}` - URL de origem
- `{{BRAND_NAME}}` - Nome da sua marca
- `{{SHOPIFY_STORE_NAME}}` - Nome da loja Shopify
- `{{SHOPIFY_STORE_URL}}` - URL da loja Shopify 