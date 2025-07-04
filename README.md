# 🛍️ E-commerce Product Page

Uma página de produto moderna e responsiva construída com Next.js, TypeScript e Tailwind CSS. Este projeto apresenta uma interface elegante para exibição de produtos com sistema de reviews, botões de compra e integração com pixels de rastreamento.

## ✨ Características

- **Design Responsivo**: Interface otimizada para desktop, tablet e mobile
- **Sistema de Reviews**: Reviews de usuários com filtros e ordenação
- **Botões de Compra**: Botões sticky e modais de compra
- **Pixels de Rastreamento**: Integração com Facebook Pixel e outros pixels
- **UI Moderna**: Componentes baseados em shadcn/ui
- **TypeScript**: Código totalmente tipado
- **Performance**: Otimizado com Next.js 14

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **Framer Motion** - Animações

## 📦 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/ecommerce-product-page.git
cd ecommerce-product-page
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
ecommerce-product-t/
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── buy-button.tsx    # Botão de compra
│   ├── ProductDetails.tsx # Detalhes do produto
│   └── ReviewsModal.tsx  # Modal de reviews
├── data/                 # Dados estáticos
│   ├── products.json     # Informações dos produtos
│   └── reviews.json      # Reviews dos usuários
├── hooks/                # Custom hooks
├── lib/                  # Utilitários
└── public/               # Arquivos estáticos
```

## 🎨 Componentes Principais

### ProductDetails
Exibe informações detalhadas do produto com imagens, preços e descrições.

### ReviewsModal
Modal interativo para visualização de reviews com filtros e ordenação.

### BuyButton
Botão de compra com integração de pixels de rastreamento.

### StickyBuyButton
Botão de compra fixo na parte inferior da tela.

## 📊 Sistema de Reviews

O projeto inclui um sistema completo de reviews com:

- **Filtros**: Por rating, verificação, fotos e idioma
- **Ordenação**: Por data, rating e utilidade
- **Estatísticas**: Análise de sentimentos e distribuição
- **Fotos**: Suporte a múltiplas imagens por review
- **Badges**: Identificação de usuários verificados

## 🔧 Configuração de Pixels

O projeto suporta integração com múltiplos pixels de rastreamento:

- Facebook Pixel
- Google Analytics
- Pixels customizados

Veja o arquivo `PIXELS-SETUP.md` para instruções detalhadas.

## 📱 Responsividade

O design é totalmente responsivo com breakpoints otimizados:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎯 Funcionalidades

- ✅ Página de produto responsiva
- ✅ Sistema de reviews completo
- ✅ Botões de compra com tracking
- ✅ Modal de reviews interativo
- ✅ Filtros e ordenação
- ✅ Integração com pixels
- ✅ Design moderno e acessível
- ✅ Performance otimizada

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Faça upload da pasta .next
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você tiver alguma dúvida ou sugestão, abra uma issue no GitHub ou entre em contato.

---

**Desenvolvido com ❤️ usando Next.js e TypeScript** # te
