'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { trackAllInitiateCheckout } from './tracking-pixels'

// Declaração global para TypeScript
declare global {
  interface Window {
    ShopifyBuy: any
  }
}

// Cache global para evitar recarregar o SDK
let shopifySDKPromise: Promise<any> | null = null
let shopifySDKLoaded = false

interface BuyButtonProps {
  productName: string
  productPrice: number
  productImage?: string
  onAddToCart?: (quantity: number) => void
}

interface ShopifyBuyButtonProps {
  domain: string
  storefrontAccessToken: string
  productId: string
  productName: string
  productPrice: number
  productImage?: string
  onAddToCart?: (quantity: number) => void
}

// Função para verificar se o SDK está pronto
const isShopifySDKReady = (): boolean => {
  return !!(
    window.ShopifyBuy &&
    typeof window.ShopifyBuy.buildClient === 'function'
  )
}

// Função para carregar o SDK v3.0 do Shopify
const loadShopifySDK = (): Promise<any> => {
  if (shopifySDKLoaded && isShopifySDKReady()) {
    return Promise.resolve(window.ShopifyBuy)
  }

  if (shopifySDKPromise) {
    return shopifySDKPromise
  }

  shopifySDKPromise = new Promise((resolve, reject) => {
    // Verificar se já está carregado
    if (isShopifySDKReady()) {
      shopifySDKLoaded = true
      resolve(window.ShopifyBuy)
      return
    }

    const script = document.createElement('script')
    // Usar a versão 3.0 do JS Buy SDK
    script.src = 'https://sdks.shopifycdn.com/js-buy-sdk/v3/latest/index.umd.min.js'
    script.async = true
    
    script.onload = () => {
      // Aguardar e verificar se o SDK está pronto
      let attempts = 0
      const maxAttempts = 30 // 3 segundos máximo
      
      const checkSDK = () => {
        attempts++
        
        if (isShopifySDKReady()) {
          shopifySDKLoaded = true
          resolve(window.ShopifyBuy)
        } else if (attempts >= maxAttempts) {
          reject(new Error('SDK do Shopify não inicializou após 3 segundos'))
        } else {
          setTimeout(checkSDK, 100)
        }
      }
      
      checkSDK()
    }
    
    script.onerror = () => {
      shopifySDKPromise = null
      reject(new Error('Falha ao carregar o SDK do Shopify'))
    }
    
    document.head.appendChild(script)
  })

  return shopifySDKPromise
}

// Função para fazer queries GraphQL no Shopify Storefront API
const shopifyStorefrontQuery = async (
  domain: string,
  storefrontAccessToken: string,
  query: string,
  variables?: any
) => {
  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  
  if (data.errors) {
    throw new Error(`GraphQL error: ${data.errors[0].message}`)
  }

  return data.data
}

export function BuyButton({ productName, productPrice, productImage }: BuyButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleBuyNow = async () => {
    setIsLoading(true)
    try {
      // Disparar evento InitiateCheckout nos pixels
      const totalValue = productPrice * quantity
      trackAllInitiateCheckout(totalValue, 'BRL')
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      toast({
        title: "Redirecting!",
        description: `Opening checkout for ${quantity}x ${productName}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to process purchase.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const totalPrice = (productPrice * quantity).toFixed(2)

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-lg font-semibold min-w-[2rem] text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-600">R${totalPrice}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
      </div>

      <Button
        onClick={handleBuyNow}
        disabled={isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Buy Now
          </div>
        )}
      </Button>
    </div>
  )
}

export function ShopifyBuyButton({
  domain,
  storefrontAccessToken,
  productId,
  productName,
  productPrice,
  productImage
}: ShopifyBuyButtonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [variantId, setVariantId] = useState<string | null>(null)
  const { toast } = useToast()

  // Buscar produto e suas variantes primeiro
  const fetchProduct = useCallback(async () => {
    try {
      console.log('Buscando produto:', productId)

      const PRODUCT_QUERY = `
        query getProduct($id: ID!) {
          product(id: $id) {
            id
            title
            handle
            availableForSale
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      `

      const variables = {
        id: `gid://shopify/Product/${productId}`,
      }

      const data = await shopifyStorefrontQuery(
        domain,
        storefrontAccessToken,
        PRODUCT_QUERY,
        variables
      )

      if (!data.product) {
        throw new Error('Produto não encontrado')
      }

      if (!data.product.availableForSale) {
        throw new Error('Produto não disponível para venda')
      }

      const availableVariants = data.product.variants.edges.filter(
        (edge: any) => edge.node.availableForSale
      )

      if (availableVariants.length === 0) {
        throw new Error('Nenhuma variante disponível para venda')
      }

      // Pegar a primeira variante disponível
      const firstVariant = availableVariants[0].node
      setVariantId(firstVariant.id)

      console.log('Produto encontrado:', data.product.title)
      console.log('Variante disponível:', firstVariant.id)

      return firstVariant.id

    } catch (err) {
      console.error('Erro ao buscar produto:', err)
      throw err
    }
  }, [domain, storefrontAccessToken, productId])

  // Criar checkout usando Storefront API
  const createCheckout = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      console.log('Iniciando processo de checkout...')

      // Primeiro buscar o produto e variante
      const availableVariantId = await fetchProduct()

      if (!availableVariantId) {
        throw new Error('Nenhuma variante disponível')
      }

      console.log('Criando checkout com variante:', availableVariantId)

      const CREATE_CHECKOUT_MUTATION = `
        mutation checkoutCreate($input: CheckoutCreateInput!) {
          checkoutCreate(input: $input) {
            checkout {
              id
              webUrl
              lineItems(first: 5) {
                edges {
                  node {
                    id
                    title
                    quantity
                  }
                }
              }
            }
            checkoutUserErrors {
              field
              message
            }
          }
        }
      `

      const variables = {
        input: {
          lineItems: [
            {
              variantId: availableVariantId,
              quantity: 1,
            },
          ],
        },
      }

      const data = await shopifyStorefrontQuery(
        domain,
        storefrontAccessToken,
        CREATE_CHECKOUT_MUTATION,
        variables
      )

      if (data.checkoutCreate.checkoutUserErrors.length > 0) {
        throw new Error(data.checkoutCreate.checkoutUserErrors[0].message)
      }

      const checkout = data.checkoutCreate.checkout
      setCheckoutUrl(checkout.webUrl)

      console.log('Checkout criado com sucesso!')
      
    } catch (err) {
      console.error('Erro ao criar checkout:', err)
      setError(`Erro ao conectar com Shopify: ${err instanceof Error ? err.message : 'Erro desconhecido'}`)
    } finally {
      setIsLoading(false)
    }
  }, [domain, storefrontAccessToken, fetchProduct])

  useEffect(() => {
    createCheckout()
  }, [createCheckout])

  // Função para comprar agora
  const handleBuyNow = async () => {
    if (!checkoutUrl) {
      console.error('URL do checkout não disponível')
      toast({
        title: "Error",
        description: "Checkout not ready. Please try again.",
        variant: "destructive",
      })
      return
    }

    try {
      console.log('Redirecionando para checkout:', checkoutUrl)

      // Disparar evento InitiateCheckout nos pixels
      trackAllInitiateCheckout(productPrice, 'BRL')

      // Redirecionar para checkout
      window.open(checkoutUrl, '_blank')

      toast({
        title: "Redirecting!",
        description: `Opening checkout for ${productName}.`,
      })

    } catch (err) {
      console.error('Erro ao redirecionar:', err)
      toast({
        title: "Error",
        description: "Unable to open checkout.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-center py-4">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="ml-2 text-gray-600">Preparing checkout...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center py-4">
          <p className="text-red-600 mb-4 text-sm">{error}</p>
          <p className="text-gray-600 mb-4 text-sm">Using alternative button:</p>
          <BuyButton
            productName={productName}
            productPrice={productPrice}
            productImage={productImage}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Button
        onClick={handleBuyNow}
        disabled={isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
      >
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Buy Now
        </div>
      </Button>
    </div>
  )
}

export function ShopifyBuyButtonCompact({
  domain,
  storefrontAccessToken,
  productId,
  productName,
  productPrice,
  productImage
}: ShopifyBuyButtonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [variantId, setVariantId] = useState<string | null>(null)
  const { toast } = useToast()

  // Buscar produto e suas variantes primeiro
  const fetchProduct = useCallback(async () => {
    try {
      const PRODUCT_QUERY = `
        query getProduct($id: ID!) {
          product(id: $id) {
            id
            title
            handle
            availableForSale
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      `

      const variables = {
        id: `gid://shopify/Product/${productId}`,
      }

      const data = await shopifyStorefrontQuery(
        domain,
        storefrontAccessToken,
        PRODUCT_QUERY,
        variables
      )

      if (!data.product) {
        throw new Error('Produto não encontrado')
      }

      if (!data.product.availableForSale) {
        throw new Error('Produto não disponível para venda')
      }

      const availableVariants = data.product.variants.edges.filter(
        (edge: any) => edge.node.availableForSale
      )

      if (availableVariants.length === 0) {
        throw new Error('Nenhuma variante disponível para venda')
      }

      // Pegar a primeira variante disponível
      const firstVariant = availableVariants[0].node
      setVariantId(firstVariant.id)

      return firstVariant.id

    } catch (err) {
      console.error('Erro ao buscar produto compacto:', err)
      throw err
    }
  }, [domain, storefrontAccessToken, productId])

  // Criar checkout usando Storefront API
  const createCheckout = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Primeiro buscar o produto e variante
      const availableVariantId = await fetchProduct()

      if (!availableVariantId) {
        throw new Error('Nenhuma variante disponível')
      }

      const CREATE_CHECKOUT_MUTATION = `
        mutation checkoutCreate($input: CheckoutCreateInput!) {
          checkoutCreate(input: $input) {
            checkout {
              id
              webUrl
              lineItems(first: 5) {
                edges {
                  node {
                    id
                    title
                    quantity
                  }
                }
              }
            }
            checkoutUserErrors {
              field
              message
            }
          }
        }
      `

      const variables = {
        input: {
          lineItems: [
            {
              variantId: availableVariantId,
              quantity: 1,
            },
          ],
        },
      }

      const data = await shopifyStorefrontQuery(
        domain,
        storefrontAccessToken,
        CREATE_CHECKOUT_MUTATION,
        variables
      )

      if (data.checkoutCreate.checkoutUserErrors.length > 0) {
        throw new Error(data.checkoutCreate.checkoutUserErrors[0].message)
      }

      const checkout = data.checkoutCreate.checkout
      setCheckoutUrl(checkout.webUrl)
      
    } catch (err) {
      console.error('Erro ao criar checkout compacto:', err)
      setError('Erro ao conectar com Shopify')
    } finally {
      setIsLoading(false)
    }
  }, [domain, storefrontAccessToken, fetchProduct])

  useEffect(() => {
    createCheckout()
  }, [createCheckout])

  // Função para comprar agora
  const handleBuyNow = async () => {
    if (!checkoutUrl) {
      console.error('URL do checkout não disponível')
      return
    }

    try {
      // Disparar evento InitiateCheckout nos pixels
      trackAllInitiateCheckout(productPrice, 'BRL')

      window.open(checkoutUrl, '_blank')

      toast({
        title: "Redirecting!",
        description: `Opening checkout for ${productName}.`,
      })

    } catch (err) {
      console.error('Erro ao redirecionar:', err)
      toast({
        title: "Error",
        description: "Unable to open checkout.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <Button disabled className="bg-orange-500 hover:bg-orange-600 text-white">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
        Loading...
      </Button>
    )
  }

  if (error) {
    return (
      <Button 
        onClick={() => {
          toast({
            title: "Error",
            description: "Unable to process purchase.",
            variant: "destructive",
          })
        }}
        className="bg-orange-500 hover:bg-orange-600 text-white"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Buy
      </Button>
    )
  }

  return (
    <Button
      onClick={handleBuyNow}
      disabled={isLoading}
      className="bg-orange-500 hover:bg-orange-600 text-white"
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Buy
    </Button>
  )
} 