# 🔐 Servidor de Criptografia para TikTok

Servidor Node.js para criptografar email e telefone em SHA256 para integração com TikTok via n8n.

## 🚀 Deploy Rápido no Servidor

### Deploy Automático (Recomendado)
```bash
chmod +x deploy-remote.sh
./deploy-remote.sh
```

### Deploy Manual via SSH
```bash
ssh root@161.35.141.62
cd /opt
git clone <seu-repositorio> tiktok-crypto
cd tiktok-crypto
chmod +x deploy.sh
./deploy.sh
npm run prod
```

## 🚀 Deploy no Ubuntu Local

### 1. Configuração Automática
```bash
chmod +x deploy.sh
./deploy.sh
```

### 2. Configuração Manual
```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Instalar dependências
npm install
```

## 🎯 Como Usar

### Iniciar o Servidor
```bash
# Desenvolvimento
npm start

# Produção (com PM2)
npm run prod

# Parar servidor
npm run stop

# Reiniciar servidor
npm run restart

# Ver logs
npm run logs
```

### Testar o Servidor
```bash
# Teste básico
npm test

# Ou
curl http://localhost:3000/test
```

## 📡 Endpoints Disponíveis

### 1. Health Check
```bash
GET http://localhost:3000/health
```

### 2. Teste
```bash
GET http://localhost:3000/test
```

### 3. Criptografar Dados Simples
```bash
POST http://localhost:3000/crypto/tiktok
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "phone": "11999999999"
}
```

### 4. Webhook do Shopify
```bash
POST http://localhost:3000/crypto/shopify-webhook
Content-Type: application/json

# Recebe o payload completo do Shopify
```

## 🔧 Uso no n8n

### Opção 1: HTTP Request Node
1. Adicione um nó "HTTP Request"
2. Configure:
   - Method: POST
   - URL: `http://localhost:3000/crypto/tiktok`
   - Headers: `Content-Type: application/json`
   - Body: 
   ```json
   {
     "email": "{{$json.email}}",
     "phone": "{{$json.phone}}"
   }
   ```

### Opção 2: Execute Command (curl)
```bash
curl -X POST http://localhost:3000/crypto/tiktok \
  -H "Content-Type: application/json" \
  -d '{"email":"{{$json.email}}","phone":"{{$json.phone}}"}'
```

## 📤 Resposta do Servidor

```json
{
  "success": true,
  "data": {
    "email_hash": "80b4e8d05c93319758abe9cb7f3f8168c66242c65ea3cbe2f44bdedfa69d6a52",
    "phone_hash": "bcf0e6800ad0081abe532b34c7ce972a28b6036dd7688c4daa02fd54b73a55b0",
    "event_time": 1751319268
  }
}
```

## 🔥 Firewall (se necessário)

```bash
# Permitir porta 3000
sudo ufw allow 3000

# Ou apenas para localhost
sudo ufw allow from 127.0.0.1 to any port 3000
```

## 📋 Logs

```bash
# Ver logs em tempo real
pm2 logs crypto-server

# Ou ver arquivos de log
tail -f logs/combined.log
```

## 🛠️ Troubleshooting

### Verificar se o processo está rodando
```bash
pm2 status
```

### Reiniciar se necessário
```bash
pm2 restart crypto-server
```

### Verificar conectividade
```bash
netstat -tlnp | grep 3000
``` 