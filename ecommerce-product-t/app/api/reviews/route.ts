import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET(request: NextRequest) {
  try {
    // Caminho para o arquivo JSON dos reviews
    const jsonFilePath = path.join(process.cwd(), 'data', 'reviews.json')
    
    // Ler o arquivo JSON
    const fileContents = await fs.readFile(jsonFilePath, 'utf8')
    const reviewsData = JSON.parse(fileContents)

    // Parâmetros de consulta
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const rating = searchParams.get('rating')
    const verified = searchParams.get('verified')
    const photos = searchParams.get('photos')
    const language = searchParams.get('language')
    const sentiment = searchParams.get('sentiment')
    const sortBy = searchParams.get('sortBy') || 'newest'
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset') || '0'
    const search = searchParams.get('search')

    let filteredReviews = [...reviewsData.reviews]

    // Filtrar por produto
    if (productId) {
      filteredReviews = filteredReviews.filter(review => 
        review.productId === parseInt(productId)
      )
    }

    // Filtrar por rating
    if (rating && rating !== 'all') {
      filteredReviews = filteredReviews.filter(review => 
        review.rating === parseInt(rating)
      )
    }

    // Filtrar por verificação
    if (verified && verified !== 'all') {
      if (verified === 'verified') {
        filteredReviews = filteredReviews.filter(review => review.verified)
      } else {
        filteredReviews = filteredReviews.filter(review => !review.verified)
      }
    }

    // Filtrar por fotos
    if (photos && photos !== 'all') {
      if (photos === 'with_photos') {
        filteredReviews = filteredReviews.filter(review => review.photos.length > 0)
      } else {
        filteredReviews = filteredReviews.filter(review => review.photos.length === 0)
      }
    }

    // Filtrar por idioma
    if (language && language !== 'all') {
      filteredReviews = filteredReviews.filter(review => review.language === language)
    }

    // Filtrar por sentimento
    if (sentiment && sentiment !== 'all') {
      if (sentiment === 'positive') {
        filteredReviews = filteredReviews.filter(review => 
          review.sentiment === 'positive' || review.sentiment === 'very_positive'
        )
      } else if (sentiment === 'negative') {
        filteredReviews = filteredReviews.filter(review => 
          review.sentiment === 'negative' || review.sentiment === 'very_negative'
        )
      } else {
        filteredReviews = filteredReviews.filter(review => review.sentiment === sentiment)
      }
    }

    // Busca por texto
    if (search) {
      const searchLower = search.toLowerCase()
      filteredReviews = filteredReviews.filter(review =>
        review.title.toLowerCase().includes(searchLower) ||
        review.content.toLowerCase().includes(searchLower) ||
        review.user.name.toLowerCase().includes(searchLower) ||
        review.pros.some(pro => pro.toLowerCase().includes(searchLower)) ||
        review.cons.some(con => con.toLowerCase().includes(searchLower)) ||
        review.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Ordenação
    switch (sortBy) {
      case 'newest':
        filteredReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'oldest':
        filteredReviews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'highest_rating':
        filteredReviews.sort((a, b) => b.rating - a.rating)
        break
      case 'lowest_rating':
        filteredReviews.sort((a, b) => a.rating - b.rating)
        break
      case 'most_helpful':
        filteredReviews.sort((a, b) => b.helpful.count - a.helpful.count)
        break
      case 'least_helpful':
        filteredReviews.sort((a, b) => a.helpful.count - b.helpful.count)
        break
      default:
        filteredReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    // Paginação
    const offsetNum = parseInt(offset)
    const limitNum = limit ? parseInt(limit) : undefined
    
    const totalResults = filteredReviews.length
    const paginatedReviews = limitNum 
      ? filteredReviews.slice(offsetNum, offsetNum + limitNum)
      : filteredReviews.slice(offsetNum)

    // Calcular estatísticas dos resultados filtrados
    const filteredStats = {
      totalReviews: totalResults,
      averageRating: totalResults > 0 
        ? filteredReviews.reduce((sum, review) => sum + review.rating, 0) / totalResults
        : 0,
      ratingDistribution: filteredReviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1
        return acc
      }, {} as { [key: string]: number }),
      verifiedPurchases: filteredReviews.filter(r => r.verified).length,
      reviewsWithPhotos: filteredReviews.filter(r => r.photos.length > 0).length,
      filteredResults: true
    }

    // Resposta completa
    const response = {
      ...reviewsData,
      reviews: paginatedReviews,
      statistics: {
        ...reviewsData.statistics,
        ...filteredStats
      },
      pagination: {
        total: totalResults,
        offset: offsetNum,
        limit: limitNum || totalResults,
        hasMore: limitNum ? offsetNum + limitNum < totalResults : false
      },
      appliedFilters: {
        productId,
        rating,
        verified,
        photos,
        language,
        sentiment,
        sortBy,
        search
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro ao processar reviews:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor ao carregar reviews' },
      { status: 500 }
    )
  }
} 