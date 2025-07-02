# Oklahoma City Thunder - Página de Produto Mobile

Este é um projeto Vue.js focado em mobile que replica a página de produto do site oficial do Oklahoma City Thunder, especificamente para a camisa "YOUTH OKLAHOMA CITY THUNDER CUSTOM ICON SWINGMAN JERSEY 2024-25".

## 🏀 Características

- **Mobile-First**: Design otimizado para dispositivos móveis
- **Menu Navegação Completo**: Menu lateral com todas as categorias do site oficial
- **Galeria de Imagens**: Carrossel de imagens do produto com navegação
- **Design Responsivo**: Adaptável para tablet e desktop
- **Componentes Modulares**: Estrutura organizada em componentes Vue

## 📱 Estrutura do Projeto

```
src/
├── pagina_do_produto.vue          # Componente principal
├── components/
│   ├── common/                    # Componentes compartilhados
│   │   ├── Header.vue            # Cabeçalho com menu mobile
│   │   └── Footer.vue            # Rodapé com navegação inferior
│   └── pagProduto-sections/       # Seções da página de produto
│       └── HeroSection.vue       # Seção principal com imagem e info
├── App.vue                       # Componente raiz
└── main.js                       # Ponto de entrada
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🖼️ Scraping de Imagens

O projeto inclui um script Python para fazer download das imagens do produto:

### Executar o Scraper
```bash
# Instalar dependências Python
pip install -r requirements.txt

# Executar o scraper
python image_scraper.py
```

O script irá:
- Baixar todas as imagens do produto
- Salvar em `public/images/`
- Criar um manifest.json com informações das imagens
- Organizar os arquivos com nomes descritivos

## 🎨 Design e UX

### Cores Principais
- **Azul Thunder**: `#1e3a8a`
- **Branco**: `#ffffff`
- **Cinza Claro**: `#f8f9fa`
- **Vermelho Desconto**: `#ef4444`

### Componentes Principais

#### Header
- Menu hambúrguer com navegação completa
- Logo do Oklahoma City Thunder
- Ícone de usuário
- Breadcrumb de navegação

#### Menu Mobile
- Navegação hierárquica com submenus
- Campo de busca integrado
- Categorias: NBA Finals, Players, Jerseys, Mens, Womens, Youth, Hats, Accessories
- Animações suaves de abertura/fechamento

#### HeroSection
- Título do produto em destaque
- SKU do produto
- Carrossel de imagens com navegação
- Badge de desconto
- Indicadores de imagem

#### Footer
- Navegação inferior fixa
- Ícones de menu, carrinho e home
- Badge de contagem do carrinho

## 📱 Responsividade

O projeto utiliza uma abordagem mobile-first com breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px  
- **Desktop**: ≥ 1024px

## 🛠️ Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript reativo
- **Vite**: Build tool e dev server
- **CSS3**: Estilização com Flexbox e Grid
- **Python**: Script de scraping de imagens
- **Requests**: Biblioteca Python para HTTP

## 📋 Funcionalidades Implementadas

- ✅ Header com menu mobile completo
- ✅ Menu lateral com categorias hierárquicas
- ✅ Seção principal do produto (HeroSection)
- ✅ Carrossel de imagens do produto
- ✅ Footer com navegação inferior
- ✅ Design mobile-first responsivo
- ✅ Script de scraping de imagens
- ✅ Estrutura modular de componentes

## 🎯 Próximos Passos

- [ ] Seção de detalhes do produto
- [ ] Seletor de tamanho
- [ ] Botão de adicionar ao carrinho
- [ ] Seção de produtos relacionados
- [ ] Integração com API de produtos
- [ ] Testes unitários

## 📄 Licença

Este projeto é apenas para fins educacionais e demonstração de habilidades de desenvolvimento frontend.

## 🤝 Contribuição

Este é um projeto pessoal, mas sugestões e feedback são sempre bem-vindos!
