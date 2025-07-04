import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET(request: NextRequest) {
  try {
    // Caminho para o arquivo JSON
    const jsonFilePath = path.join(process.cwd(), 'data', 'products.json')
    
    // Ler o arquivo JSON
    const fileContents = await fs.readFile(jsonFilePath, 'utf8')
    const productsData = JSON.parse(fileContents)

    // Parâmetros de consulta
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const trending = searchParams.get('trending')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const minRating = searchParams.get('minRating')
    const search = searchParams.get('search')

    let filteredProducts = [...productsData.products]

    // Filtrar por categoria se especificado
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product: any) => product.category === category
      )
    }

    // Filtrar apenas produtos trending se especificado
    if (trending === 'true') {
      filteredProducts = filteredProducts.filter(
        (product: any) => product.trending === true
      )
    }

    // Filtrar apenas produtos em destaque se especificado
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(
        (product: any) => product.featured === true
      )
    }

    // Filtrar por faixa de preço
    if (minPrice || maxPrice) {
      const min = minPrice ? parseFloat(minPrice) : 0
      const max = maxPrice ? parseFloat(maxPrice) : Infinity
      filteredProducts = filteredProducts.filter(
        (product: any) => product.price.current >= min && product.price.current <= max
      )
    }

    // Filtrar por avaliação mínima
    if (minRating) {
      const rating = parseFloat(minRating)
      filteredProducts = filteredProducts.filter(
        (product: any) => product.rating.average >= rating
      )
    }

    // Pesquisar por texto
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter((product: any) => 
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.shortDescription.toLowerCase().includes(searchLower) ||
        product.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      )
    }

    // Limitar número de produtos se especificado
    if (limit) {
      const limitNum = parseInt(limit)
      filteredProducts = filteredProducts.slice(0, limitNum)
    }

    // Criar resposta com produtos filtrados
    const response = {
      ...productsData,
      products: filteredProducts,
      metadata: {
        ...productsData.metadata,
        totalProducts: filteredProducts.length,
        filteredResults: filteredProducts.length !== productsData.products.length
      }
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'Content-Type': 'application/json',
      },
    })

  } catch (error) {
    console.error('Erro ao carregar dados dos produtos:', error)
    return NextResponse.json(
      { 
        error: 'Falha ao carregar dados dos produtos',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

// Endpoint para estatísticas dos produtos
export async function HEAD() {
  try {
    const jsonFilePath = path.join(process.cwd(), 'data', 'products.json')
    const fileContents = await fs.readFile(jsonFilePath, 'utf8')
    const productsData = JSON.parse(fileContents)

    const featuredProducts = productsData.products.filter((p: any) => p.featured)
    const trendingProducts = productsData.products.filter((p: any) => p.trending)
    const inStockProducts = productsData.products.filter((p: any) => p.stock.available)
    const categories = [...new Set(productsData.products.map((p: any) => p.category))]

    const stats = {
      totalProducts: productsData.products.length,
      featuredCount: featuredProducts.length,
      trendingCount: trendingProducts.length,
      inStockCount: inStockProducts.length,
      totalCategories: categories.length,
      categories: categories,
      averageRating: productsData.metadata.averageRating,
      totalReviews: productsData.metadata.totalReviews,
      lastUpdated: productsData.metadata.lastUpdated,
      version: productsData.metadata.version
    }

    return new NextResponse(null, {
      status: 200,
      headers: {
        'X-Product-Stats': JSON.stringify(stats),
        'Cache-Control': 'public, s-maxage=3600',
      },
    })

  } catch (error) {
    return new NextResponse(null, { status: 500 })
  }
} 