#!/bin/bash

echo "🚀 Configurando servidor de criptografia TikTok no Ubuntu..."

# Atualiza o sistema
echo "📦 Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

# Instala Node.js se não estiver instalado
if ! command -v node &> /dev/null; then
    echo "📥 Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Instala PM2 para gerenciar o processo
if ! command -v pm2 &> /dev/null; then
    echo "🔧 Instalando PM2..."
    sudo npm install -g pm2
fi

# Instala dependências do projeto
echo "📋 Instalando dependências..."
npm install

# Cria diretório de logs
mkdir -p logs

echo "✅ Setup concluído!"
echo ""
echo "Para iniciar o servidor:"
echo "  npm start          # Modo desenvolvimento"
echo "  npm run prod       # Modo produção com PM2"
echo ""
echo "Para testar:"
echo "  npm test" 