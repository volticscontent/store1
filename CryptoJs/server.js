const express = require('express');
const CryptoJS = require('crypto-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));

/**
 * Função para criptografar dados em SHA256
 */
function encryptSHA256(data) {
    return CryptoJS.SHA256(data).toString();
}

/**
 * Endpoint principal para criptografar dados do Shopify para TikTok
 */
app.post('/crypto/tiktok', (req, res) => {
    try {
        const { 
            email, 
            phone, 
            value = 0, 
            currency = 'BRL', 
            order_id,
            content_type = 'product',
            description = 'Purchase'
        } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                error: 'Email é obrigatório'
            });
        }

        // Limpa e criptografa o email
        const cleanEmail = email.toLowerCase().trim();
        const emailHash = encryptSHA256(cleanEmail);

        // Monta o payload no formato esperado pelo TikTok
        const tiktokPayload = {
            pixel_code: "{{PIXEL_CODE}}", // Será substituído no n8n
            event: "Purchase",
            event_id: order_id || `order_${Date.now()}`,
            timestamp: Math.floor(Date.now() / 1000).toString(),
            context: {
                user_agent: "TikTok-Business-API",
                ip: "{{IP_ADDRESS}}", // Será substituído no n8n
                user: {
                    email: emailHash,
                    external_id: emailHash.substring(0, 16) // ID externo baseado no hash
                },
                page: {
                    url: "{{PAGE_URL}}", // Será substituído no n8n
                    referrer: "{{REFERRER}}" // Será substituído no n8n
                }
            },
            properties: {
                contents: [{
                    content_id: order_id || "default_content",
                    content_type: content_type,
                    content_name: description,
                    brand: "{{BRAND_NAME}}", // Será substituído no n8n
                    price: parseFloat(value),
                    quantity: 1
                }],
                currency: currency,
                value: parseFloat(value),
                content_type: content_type,
                order_id: order_id || `order_${Date.now()}`
            }
        };

        // Se houver telefone, adiciona ao contexto do usuário
        if (phone) {
            let cleanPhone = phone.toString().replace(/\s+/g, '').trim();
            if (!cleanPhone.startsWith('+')) {
                cleanPhone = `+55${cleanPhone}`;
            }
            tiktokPayload.context.user.phone = encryptSHA256(cleanPhone);
        }

        const result = {
            success: true,
            tiktok_payload: tiktokPayload,
            debug_info: {
                original_email: email,
                original_phone: phone,
                email_hash: emailHash,
                phone_hash: phone ? encryptSHA256(phone.toString().replace(/\s+/g, '').trim().startsWith('+') 
                    ? phone.toString().replace(/\s+/g, '').trim() 
                    : `+55${phone.toString().replace(/\s+/g, '').trim()}`) : null,
                timestamp: Math.floor(Date.now() / 1000)
            }
        };

        res.json(result);

    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno do servidor'
        });
    }
});

/**
 * Endpoint para processar webhook completo do Shopify
 */
app.post('/crypto/shopify-webhook', (req, res) => {
    try {
        let data = req.body;
        let email, phone, value, currency, orderId, contentName;

        // Navega pela estrutura do webhook para encontrar os dados
        if (Array.isArray(data)) {
            data = data[0];
        }

        // Procura os dados em diferentes níveis da estrutura
        if (data.body) {
            let checkout = data.body;
            while (Array.isArray(checkout)) {
                checkout = checkout[0];
                if (checkout.body) {
                    checkout = checkout.body;
                }
            }
            email = checkout.email;
            phone = checkout.phone || checkout.sms_marketing_phone;
            value = parseFloat(checkout.total_price) || 0;
            currency = checkout.currency || checkout.presentment_currency || 'USD';
            orderId = checkout.id || checkout.name;
            
            // Extrai nome do produto se disponível
            if (checkout.line_items && checkout.line_items.length > 0) {
                contentName = checkout.line_items[0].title || checkout.line_items[0].presentment_title;
            }
        } else {
            email = data.email;
            phone = data.phone || data.sms_marketing_phone;
            value = parseFloat(data.total_price) || 0;
            currency = data.currency || data.presentment_currency || 'USD';
            orderId = data.id || data.name;
            
            if (data.line_items && data.line_items.length > 0) {
                contentName = data.line_items[0].title || data.line_items[0].presentment_title;
            }
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                error: 'Email não encontrado no webhook'
            });
        }

        // Cria o payload com os dados extraídos do Shopify
        const shopifyData = {
            email,
            phone,
            value,
            currency,
            order_id: orderId,
            content_type: 'product',
            description: contentName || 'Purchase from Shopify'
        };

        // Processa usando a função principal
        req.body = shopifyData;
        
        // Chama diretamente a lógica do endpoint principal
        const { 
            email: reqEmail, 
            phone: reqPhone, 
            value: reqValue = 0, 
            currency: reqCurrency = 'BRL', 
            order_id: reqOrderId,
            content_type = 'product',
            description = 'Purchase'
        } = shopifyData;

        const cleanEmail = reqEmail.toLowerCase().trim();
        const emailHash = encryptSHA256(cleanEmail);

        const tiktokPayload = {
            pixel_code: "{{PIXEL_CODE}}",
            event: "Purchase",
            event_id: reqOrderId || `order_${Date.now()}`,
            timestamp: Math.floor(Date.now() / 1000).toString(),
            context: {
                user_agent: "Shopify-TikTok-Integration",
                ip: "{{IP_ADDRESS}}",
                user: {
                    email: emailHash,
                    external_id: emailHash.substring(0, 16)
                },
                page: {
                    url: "{{SHOPIFY_STORE_URL}}",
                    referrer: "{{REFERRER}}"
                }
            },
            properties: {
                contents: [{
                    content_id: reqOrderId || "shopify_product",
                    content_type: content_type,
                    content_name: description,
                    brand: "{{SHOPIFY_STORE_NAME}}",
                    price: parseFloat(reqValue),
                    quantity: 1
                }],
                currency: reqCurrency,
                value: parseFloat(reqValue),
                content_type: content_type,
                order_id: reqOrderId || `shopify_order_${Date.now()}`
            }
        };

        if (reqPhone) {
            let cleanPhone = reqPhone.toString().replace(/\s+/g, '').trim();
            if (!cleanPhone.startsWith('+')) {
                cleanPhone = `+55${cleanPhone}`;
            }
            tiktokPayload.context.user.phone = encryptSHA256(cleanPhone);
        }

        const result = {
            success: true,
            source: 'shopify_webhook',
            tiktok_payload: tiktokPayload,
            shopify_data: {
                order_id: orderId,
                email: reqEmail,
                phone: reqPhone,
                total_value: reqValue,
                currency: reqCurrency,
                product_name: description
            },
            debug_info: {
                email_hash: emailHash,
                phone_hash: reqPhone ? encryptSHA256(reqPhone.toString().replace(/\s+/g, '').trim().startsWith('+') 
                    ? reqPhone.toString().replace(/\s+/g, '').trim() 
                    : `+55${reqPhone.toString().replace(/\s+/g, '').trim()}`) : null,
                timestamp: Math.floor(Date.now() / 1000)
            }
        };

        res.json(result);

    } catch (error) {
        console.error('Erro ao processar webhook:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao processar webhook',
            details: error.message
        });
    }
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

/**
 * Endpoint de teste
 */
app.get('/test', (req, res) => {
    const testEmail = 'test@example.com';
    const testPhone = '+5511999999999';
    const emailHash = encryptSHA256(testEmail);
    const phoneHash = encryptSHA256(testPhone);
    
    const tiktokPayload = {
        pixel_code: "{{PIXEL_CODE}}",
        event: "Purchase",
        event_id: `test_order_${Date.now()}`,
        timestamp: Math.floor(Date.now() / 1000).toString(),
        context: {
            user_agent: "TikTok-Business-API-Test",
            ip: "{{IP_ADDRESS}}",
            user: {
                email: emailHash,
                phone: phoneHash,
                external_id: emailHash.substring(0, 16)
            },
            page: {
                url: "{{PAGE_URL}}",
                referrer: "{{REFERRER}}"
            }
        },
        properties: {
            contents: [{
                content_id: "test_product_123",
                content_type: "product",
                content_name: "Test Product",
                brand: "{{BRAND_NAME}}",
                price: 99.99,
                quantity: 1
            }],
            currency: "BRL",
            value: 99.99,
            content_type: "product",
            order_id: `test_order_${Date.now()}`
        }
    };
    
    res.json({
        success: true,
        message: 'Servidor funcionando! ✅',
        server_info: {
            status: 'online',
            endpoints: [
                'GET /health - Health check',
                'GET /test - Este endpoint de teste',
                'POST /crypto/tiktok - Criptografia básica',
                'POST /crypto/shopify-webhook - Webhook do Shopify'
            ]
        },
        sample_tiktok_payload: tiktokPayload,
        debug_info: {
            test_email: testEmail,
            test_phone: testPhone,
            email_hash: emailHash,
            phone_hash: phoneHash,
            timestamp: Math.floor(Date.now() / 1000)
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📋 Health: http://localhost:${PORT}/health`);
    console.log(`🧪 Test: http://localhost:${PORT}/test`);
    console.log(`🔐 Crypto: POST http://localhost:${PORT}/crypto/tiktok`);
    console.log(`📦 Webhook: POST http://localhost:${PORT}/crypto/shopify-webhook`);
}); 