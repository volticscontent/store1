# Script de deploy do Windows para VPS Ubuntu
# Execute com: .\deploy-windows.ps1

$SERVER_IP = "161.35.141.62"
$APP_DIR = "/opt/tiktok-crypto"

Write-Host "🚀 Iniciando deploy para VPS Ubuntu..." -ForegroundColor Green

# Criar diretório no servidor
Write-Host "📁 Criando diretório no servidor..." -ForegroundColor Yellow
ssh root@$SERVER_IP "mkdir -p $APP_DIR"

# Copiar arquivos
Write-Host "📦 Copiando arquivos..." -ForegroundColor Yellow
scp package.json root@${SERVER_IP}:${APP_DIR}/
scp server.js root@${SERVER_IP}:${APP_DIR}/
scp ecosystem.config.js root@${SERVER_IP}:${APP_DIR}/

# Setup no servidor
Write-Host "🔧 Configurando servidor..." -ForegroundColor Yellow
ssh root@$SERVER_IP @"
cd $APP_DIR

# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js se necessário
if ! command -v node &> /dev/null; then
    echo "📥 Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# Instalar PM2
if ! command -v pm2 &> /dev/null; then
    echo "🔧 Instalando PM2..."
    npm install -g pm2
fi

# Instalar dependências
echo "📋 Instalando dependências..."
npm install

# Parar serviço anterior se existir
pm2 stop tiktok-crypto 2>/dev/null || true
pm2 delete tiktok-crypto 2>/dev/null || true

# Iniciar serviço
echo "🚀 Iniciando serviço..."
pm2 start ecosystem.config.js

# Salvar configuração
pm2 save
pm2 startup

# Configurar firewall
ufw allow 3000

echo "✅ Deploy concluído!"
echo "🌐 Servidor: http://161.35.141.62:3000"
echo "🧪 Teste: curl http://161.35.141.62:3000/test"
"@

Write-Host "🎉 Deploy finalizado!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs disponíveis:" -ForegroundColor Cyan
Write-Host "  http://161.35.141.62:3000/health"
Write-Host "  http://161.35.141.62:3000/test"
Write-Host "  POST http://161.35.141.62:3000/crypto/tiktok"
Write-Host "  POST http://161.35.141.62:3000/crypto/shopify-webhook"
Write-Host ""
Write-Host "📝 Para verificar status:" -ForegroundColor Yellow
Write-Host "  ssh root@161.35.141.62 'pm2 status'" 