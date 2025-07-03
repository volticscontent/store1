# 📦 API de Produtos - Documentação

## 🎯 Visão Geral

A API de produtos serve dados estruturados em JSON para uma aplicação de e-commerce completa. Os dados incluem produtos detalhados, categorias, filtros e configurações do sistema.

## 📍 Endpoints

### GET `/api/products`

Retorna todos os dados dos produtos em formato JSON estruturado.

**Resposta:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "Organizador de Cozinha Multifuncional",
      "description": "Organizador de cozinha premium...",
      "shortDescription": "Organizador premium para cozinha...",
      "price": {
        "current": 45.99,
        "original": 65.99,
        "currency": "R$",
        "discount": 30
      },
      "rating": {
        "average": 4.5,
        "total": 1250,
        "stars": { "5": 750, "4": 350, "3": 100, "2": 30, "1": 20 }
      },
      "images": {
        "main": "/placeholder.jpg",
        "gallery": ["/placeholder.jpg", "/placeholder.svg"],
        "thumbnail": "/placeholder.svg"
      },
      "specifications": {
        "material": "Aço Inoxidável",
        "dimensions": "30x20x15 cm",
        "weight": "1.2 kg",
        "color": "Prata",
        "warranty": "2 anos"
      },
      "category": "cozinha",
      "tags": ["organizador", "cozinha", "premium", "inox"],
      "stock": {
        "available": true,
        "quantity": 50,
        "soldCount": 1250
      },
      "shipping": {
        "free": true,
        "estimatedDays": "3-5 dias úteis"
      },
      "featured": true,
      "trending": false
    }
  ],
  "categories": [
    {
      "id": "cozinha",
      "name": "Cozinha",
      "description": "Organizadores e acessórios para cozinha",
      "icon": "chef-hat",
      "color": "#FF6B35"
    }
  ],
  "filters": {
    "priceRanges": [
      {"min": 0, "max": 30, "label": "Até R$ 30"}
    ],
    "ratings": [
      {"min": 4.5, "label": "4.5+ estrelas"}
    ],
    "availability": [
      {"value": "inStock", "label": "Em estoque"}
    ]
  },
  "settings": {
    "currency": "R$",
    "language": "pt-BR",
    "itemsPerPage": 12,
    "enableFilters": true,
    "enableSearch": true,
    "enableWishlist": true,
    "enableQuickView": true
  },
  "metadata": {
    "lastUpdated": "2025-01-03",
    "version": "2.0.0",
    "totalProducts": 6,
    "totalCategories": 6,
    "averageRating": 4.5,
    "totalReviews": 6770
  }
}
```

### 🔍 Parâmetros de Consulta

#### `?category=string`
Filtra produtos por categoria específica.

**Exemplo:**
```bash
GET /api/products?category=cozinha
```

#### `?trending=true`
Retorna apenas produtos em tendência.

**Exemplo:**
```bash
GET /api/products?trending=true
```

#### `?featured=true`
Retorna apenas produtos em destaque.

**Exemplo:**
```bash
GET /api/products?featured=true
```

#### `?limit=number`
Limita o número de produtos retornados.

**Exemplo:**
```bash
GET /api/products?limit=3
```

#### `?minPrice=number&maxPrice=number`
Filtra produtos por faixa de preço.

**Exemplo:**
```bash
GET /api/products?minPrice=30&maxPrice=50
```

#### `?minRating=number`
Filtra produtos por avaliação mínima.

**Exemplo:**
```bash
GET /api/products?minRating=4.5
```

#### `?search=string`
Pesquisa por texto no título, descrição ou tags.

**Exemplo:**
```bash
GET /api/products?search=organizador
```

### HEAD `/api/products`

Retorna estatísticas dos produtos nos headers HTTP.

**Headers de resposta:**
```
X-Product-Stats: {
  "totalProducts": 6,
  "featuredCount": 3,
  "trendingCount": 3,
  "inStockCount": 6,
  "totalCategories": 6,
  "categories": ["cozinha", "armazenamento", "organizacao"],
  "averageRating": 4.5,
  "totalReviews": 6770,
  "lastUpdated": "2025-01-03",
  "version": "2.0.0"
}
```

## 📋 Estrutura dos Dados

### 🏷️ Produto

```typescript
interface Product {
  id: number
  title: string
  description: string
  shortDescription: string
  price: {
    current: number
    original: number
    currency: string
    discount: number
  }
  rating: {
    average: number
    total: number
    stars: {
      "5": number
      "4": number
      "3": number
      "2": number
      "1": number
    }
  }
  images: {
    main: string
    gallery: string[]
    thumbnail: string
  }
  specifications: {
    material: string
    dimensions: string
    weight: string
    color: string
    warranty: string
  }
  category: string
  tags: string[]
  stock: {
    available: boolean
    quantity: number
    soldCount: number
  }
  shipping: {
    free: boolean
    cost?: number
    estimatedDays: string
  }
  featured: boolean
  trending: boolean
}
```

### 🏪 Categoria

```typescript
interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
}
```

### 🔍 Filtros

```typescript
interface Filters {
  priceRanges: Array<{
    min: number
    max: number
    label: string
  }>
  ratings: Array<{
    min: number
    label: string
  }>
  availability: Array<{
    value: string
    label: string
  }>
}
```

## 🚀 Como Usar

### 1. Hook React/Next.js

```tsx
import { useProducts } from '@/hooks/useProducts'

function ProductList() {
  const { 
    products, 
    categories, 
    loading, 
    error,
    searchProducts,
    filterProductsByPrice 
  } = useProducts()
  
  if (loading) return <div>Carregando produtos...</div>
  if (error) return <div>Erro: {error}</div>
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### 2. Fetch Direto

```javascript
// Buscar todos os produtos
const response = await fetch('/api/products')
const data = await response.json()

// Buscar produtos de cozinha
const kitchenProducts = await fetch('/api/products?category=cozinha')

// Buscar produtos em alta, entre R$ 30-50, avaliação 4+
const filtered = await fetch('/api/products?trending=true&minPrice=30&maxPrice=50&minRating=4')

// Pesquisar por "organizador"
const searchResults = await fetch('/api/products?search=organizador')
```

### 3. Funcionalidades do Hook

```typescript
const { 
  // Dados originais
  products,           // Todos os produtos
  categories,         // Todas as categorias
  filters,           // Configurações de filtros
  settings,          // Configurações do sistema
  metadata,          // Metadados do dataset
  
  // Para compatibilidade legada
  popularProducts,   // Produtos em destaque (formato legado)
  trendingProducts,  // Produtos em alta (formato legado)
  
  // Novas funções
  getFeaturedProducts,      // () => Product[]
  getTrendingProductsNew,   // () => Product[]
  getProductById,           // (id: number) => Product | undefined
  getProductsByCategory,    // (category: string) => LegacyProduct[]
  searchProducts,           // (query: string) => Product[]
  filterProductsByPrice,    // (min: number, max: number) => Product[]
  filterProductsByRating,   // (minRating: number) => Product[]
  
  // Estados
  loading,
  error
} = useProducts()
```

## 📁 Estrutura de Arquivos

```
├── data/
│   └── products.json           # Dados fonte dos produtos (NOVO)
├── hooks/
│   └── useProducts.ts          # Hook React atualizado
├── app/api/products/
│   └── route.ts               # API endpoint atualizada
└── docs/
    └── API-PRODUCTS.md        # Esta documentação
```

## 🔄 Cache e Performance

- **Cache HTTP**: 60 segundos com stale-while-revalidate de 5 minutos
- **Fallback**: Se a API falhar, o hook tenta carregar o arquivo JSON estático
- **Headers de estatísticas**: Cache de 1 hora para estatísticas
- **Filtros otimizados**: Filtros aplicados no servidor para melhor performance

## 🛠️ Desenvolvimento

### Atualizando Produtos

1. Edite `data/products.json`
2. Atualize o campo `metadata.lastUpdated`
3. Incremente `metadata.version` se necessário
4. A API automaticamente servirá os novos dados

### Estrutura do JSON

```json
{
  "products": [...],       // Array de produtos
  "categories": [...],     // Array de categorias
  "filters": {...},        // Configurações de filtros
  "settings": {...},       // Configurações do sistema
  "metadata": {...}        // Metadados do dataset
}
```

## 📊 Exemplos Avançados

### Carrossel com Dados Dinâmicos

```tsx
function ProductCarousel() {
  const { getFeaturedProducts, getTrendingProductsNew } = useProducts()
  
  const featuredProducts = getFeaturedProducts()
  const trendingProducts = getTrendingProductsNew()
  
  return (
    <div>
      <Carousel>
        {featuredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            price={`${product.price.currency} ${product.price.current}`}
            image={product.images.main}
            rating={product.rating.average}
          />
        ))}
      </Carousel>
    </div>
  )
}
```

### Busca e Filtros

```tsx
function ProductSearch() {
  const { searchProducts, filterProductsByPrice, categories } = useProducts()
  
  const [query, setQuery] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 })
  
  const filteredProducts = useMemo(() => {
    let results = searchProducts(query)
    return filterProductsByPrice(priceRange.min, priceRange.max)
  }, [query, priceRange])
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar produtos..."
      />
      <PriceSlider 
        value={priceRange}
        onChange={setPriceRange}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  )
}
```

### Metadados no Footer

```tsx
function Footer() {
  const { metadata } = useProducts()
  
  return (
    <footer>
      {metadata && (
        <div className="text-xs text-gray-400">
          Dados v{metadata.version} • 
          Atualizado em {metadata.lastUpdated} • 
          {metadata.totalProducts} produtos
        </div>
      )}
    </footer>
  )
}
```

## 🌟 Features Implementadas

✅ **Estrutura Moderna**: JSON organizado em seções lógicas  
✅ **Produtos Detalhados**: Especificações completas, múltiplas imagens  
✅ **Sistema de Categorias**: Categorias com cores e ícones  
✅ **Filtros Avançados**: Por preço, avaliação, categoria, disponibilidade  
✅ **Busca Inteligente**: Pesquisa em título, descrição e tags  
✅ **API Flexível**: Múltiplos parâmetros de consulta  
✅ **Compatibilidade**: Mantém compatibilidade com código legado  
✅ **Tipagem TypeScript**: Interfaces completas para todos os dados  
✅ **Cache Otimizado**: Performance melhorada com cache HTTP  
✅ **Fallback Strategy**: Carregamento alternativo se a API falhar  
✅ **Metadados Ricos**: Informações detalhadas sobre o dataset  

## 📈 Próximos Passos

- [ ] Pagination para grandes volumes de produtos
- [ ] WebSocket para atualizações em tempo real
- [ ] CDN para imagens dos produtos
- [ ] Sistema de reviews e comentários
- [ ] Wishlist persistente
- [ ] Comparação de produtos
- [ ] Recomendações personalizadas
``` 