// Código para o nó "Code" do n8n
const crypto = require('crypto');

// Função para criptografar em SHA256
function hashSHA256(data) {
  if (!data) return '';
  return crypto.createHash('sha256').update(data.toString().toLowerCase().trim()).digest('hex');
}

// Extrair dados do webhook Shopify
const shopifyData = $input.all()[0].json.body[0].body[0].body;

// Gerar hashes
const email = shopifyData.email || '';
const phone = shopifyData.sms_marketing_phone || '';
const emailHash = hashSHA256(email);
const phoneHash = hashSHA256(phone);

// Retornar dados formatados
return [
  {
    // Dados originais do Shopify (preservados)
    body: $input.all()[0].json.body,
    
    // Dados criptografados
    email_hash: emailHash,
    phone_hash: phoneHash,
    
    // Dados para o TikTok payload
    order_id: shopifyData.id,
    total_price: parseFloat(shopifyData.total_price) || 0,
    currency: shopifyData.currency || 'USD',
    product_id: shopifyData.line_items[0]?.product_id || 'unknown',
    product_title: shopifyData.line_items[0]?.title || 'Purchase from Shopify',
    product_price: parseFloat(shopifyData.line_items[0]?.price) || 0,
    product_quantity: parseInt(shopifyData.line_items[0]?.quantity) || 1,
    
    // Dados originais para debug
    original_email: email,
    original_phone: phone,
    timestamp: Math.floor(new Date().getTime() / 1000)
  }
]; 