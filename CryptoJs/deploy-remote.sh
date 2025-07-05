#!/bin/bash

# Script de deploy para servidor Ubuntu
# Uso: ./deploy-remote.sh

echo "🚀 Iniciando deploy no servidor Ubuntu..."

SERVER_IP="161.35.141.62"
APP_DIR="/opt/tiktok-crypto"
SERVICE_NAME="tiktok-crypto"

echo "📋 Conectando ao servidor $SERVER_IP..."

# Cria o diretório da aplicação no servidor
ssh root@$SERVER_IP "mkdir -p $APP_DIR"

# Copia os arquivos para o servidor
echo "📦 Enviando arquivos..."
scp package.json root@$SERVER_IP:$APP_DIR/
scp server.js root@$SERVER_IP:$APP_DIR/
scp ecosystem.config.js root@$SERVER_IP:$APP_DIR/
scp deploy.sh root@$SERVER_IP:$APP_DIR/

# Conecta ao servidor e executa o setup
echo "🔧 Executando setup no servidor..."
ssh root@$SERVER_IP << 'EOF'
cd /opt/tiktok-crypto

# Atualiza o sistema
apt update && apt upgrade -y

# Instala Node.js se necessário
if ! command -v node &> /dev/null; then
    echo "📥 Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# Instala PM2 globalmente
if ! command -v pm2 &> /dev/null; then
    echo "🔧 Instalando PM2..."
    npm install -g pm2
fi

# Instala dependências do projeto
echo "📋 Instalando dependências..."
npm install

# Cria diretório de logs
mkdir -p logs

# Para o serviço se estiver rodando
pm2 stop tiktok-crypto 2>/dev/null || true
pm2 delete tiktok-crypto 2>/dev/null || true

# Inicia o serviço
echo "🚀 Iniciando serviço..."
pm2 start ecosystem.config.js

# Salva a configuração do PM2
pm2 save

# Configura PM2 para iniciar automaticamente
pm2 startup

# Configura firewall para a porta 3000
ufw allow 3000

echo "✅ Deploy concluído!"
echo "🌐 Servidor disponível em: http://161.35.141.62:3000"
echo "🧪 Teste: curl http://161.35.141.62:3000/test"
echo "📋 Status: pm2 status"
echo "📝 Logs: pm2 logs tiktok-crypto"

EOF

echo "🎉 Deploy finalizado com sucesso!"
echo ""
echo "🌐 URLs disponíveis:"
echo "  http://161.35.141.62:3000/health"
echo "  http://161.35.141.62:3000/test"
echo "  POST http://161.35.141.62:3000/crypto/tiktok"
echo "  POST http://161.35.141.62:3000/crypto/shopify-webhook"
echo ""
echo "📝 Para verificar logs:"
echo "  ssh root@161.35.141.62 'pm2 logs tiktok-crypto'" 