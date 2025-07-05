'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { trackAllInitiateCheckout } from './tracking-pixels'

// Global declaration for TypeScript
declare global {
  interface Window {
    ShopifyBuy: any
  }
}

// Global cache to avoid reloading the SDK
let shopifySDKPromise: Promise<any> | null = null
let shopifySDKLoaded = false

interface BuyButtonProps {
  domain: string
  storefrontAccessToken: string
  productId: string
  productName: string
  productPrice: number
  productImage: string
  onAddToCart: (quantity: number) => void
}

interface SimpleBuyButtonProps {
  productName: string
  productPrice: number
  productImage: string
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

// Function to check if the SDK is ready
const isShopifySDKReady = (): boolean => {
  return !!(
    window.ShopifyBuy &&
    typeof window.ShopifyBuy.buildClient === 'function'
  )
}

// Function to load Shopify SDK v3.0
const loadShopifySDK = (): Promise<any> => {
  if (shopifySDKLoaded && isShopifySDKReady()) {
    return Promise.resolve(window.ShopifyBuy)
  }

  if (shopifySDKPromise) {
    return shopifySDKPromise
  }

  shopifySDKPromise = new Promise((resolve, reject) => {
    // Check if it's already loaded
    if (isShopifySDKReady()) {
      shopifySDKLoaded = true
      resolve(window.ShopifyBuy)
      return
    }

    const script = document.createElement('script')
    // Use JS Buy SDK version 3.0
    script.src = 'https://sdks.shopifycdn.com/js-buy-sdk/v3/latest/index.umd.min.js'
    script.async = true
    
    script.onload = () => {
      // Wait and check if the SDK is ready
      let attempts = 0
      const maxAttempts = 30 // 3 seconds maximum
      
      const checkSDK = () => {
        attempts++
        
        if (isShopifySDKReady()) {
          shopifySDKLoaded = true
          resolve(window.ShopifyBuy)
        } else if (attempts >= maxAttempts) {
          reject(new Error('Shopify SDK did not initialize after 3 seconds'))
        } else {
          setTimeout(checkSDK, 100)
        }
      }
      
      checkSDK()
    }
    
    script.onerror = () => {
      shopifySDKPromise = null
      reject(new Error('Failed to load Shopify SDK'))
    }
    
    document.head.appendChild(script)
  })

  return shopifySDKPromise
}

// Função principal para queries do Shopify Storefront
async function shopifyStorefrontQuery(query: string, variables: any, storefrontAccessToken: string, domain: string) {
  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors)
      throw new Error(`GraphQL error: ${data.errors[0].message}`)
    }

    return data.data
  } catch (error) {
    console.error('Shopify Storefront API error:', error)
    throw error
  }
}

// Function to test and get all available variants from a product
async function testProductVariants(productId: string, storefrontAccessToken: string, shop: string) {
  console.log(`Testing product variants for product ID: ${productId}`);
  
  const query = `
    query GetProductVariants($id: ID!) {
      node(id: $id) {
        ... on Product {
          id
          title
          handle
          variants(first: 50) {
            nodes {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${shop}/api/2025-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables: { id: productId }
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return null;
    }

    if (data.data?.node?.variants) {
      console.log('Available variants:', data.data.node.variants.nodes);
      return data.data.node.variants.nodes;
    }
    
    return null;
  } catch (error) {
    console.error('Error testing product variants:', error);
    return null;
  }
}

// Function to get product variants by handle (easier to use)
async function getProductVariantsByHandle(handle: string, storefrontAccessToken: string, shop: string) {
  console.log(`Getting product variants for handle: ${handle}`);
  
  const query = `
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        variants(first: 50) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${shop}/api/2025-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables: { handle }
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return null;
    }

    if (data.data?.product?.variants) {
      console.log('Product:', data.data.product.title);
      console.log('Available variants:', data.data.product.variants.nodes);
      
      // Log each variant with its ID for easy copying
      data.data.product.variants.nodes.forEach((variant: any, index: number) => {
        console.log(`Variant ${index + 1}:`, {
          id: variant.id,
          title: variant.title,
          availableForSale: variant.availableForSale,
          price: variant.price.amount,
          options: variant.selectedOptions
        });
      });
      
      return data.data.product.variants.nodes;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting product variants:', error);
    return null;
  }
}

// Function to list all available products in the store
async function listAllProducts(storefrontAccessToken: string, shop: string) {
  console.log('Listing all products in the store...');
  
  const query = `
    query GetAllProducts {
      products(first: 50) {
        nodes {
          id
          title
          handle
          availableForSale
          variants(first: 10) {
            nodes {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${shop}/api/2025-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return null;
    }

    if (data.data?.products?.nodes) {
      console.log('=== ALL PRODUCTS IN STORE ===');
      data.data.products.nodes.forEach((product: any, index: number) => {
        console.log(`Product ${index + 1}:`, {
          id: product.id,
          title: product.title,
          handle: product.handle,
          availableForSale: product.availableForSale,
          variantCount: product.variants.nodes.length
        });
        
        // Log variants for each product
        product.variants.nodes.forEach((variant: any, vIndex: number) => {
          console.log(`  Variant ${vIndex + 1}:`, {
            id: variant.id,
            title: variant.title,
            availableForSale: variant.availableForSale,
            price: variant.price.amount
          });
        });
      });
      
      return data.data.products.nodes;
    }
    
    return null;
  } catch (error) {
    console.error('Error listing products:', error);
    return null;
  }
}

// Função melhorada para testar o token
async function testStorefrontToken(storefrontAccessToken: string, domain: string) {
  try {
    console.log('🔍 Testando token do Storefront Access...')
    console.log('Token:', storefrontAccessToken)
    console.log('Domain:', domain)
    
    // Teste simples primeiro - apenas shop info
    const simpleQuery = `
      query {
        shop {
          name
        }
      }
    `

    // Tentar diferentes versões da API
    const apiVersions = ['2024-01', '2023-10', '2023-07', '2023-04']
    
    for (const version of apiVersions) {
      console.log(`🔄 Testando API versão ${version}...`)
      
      const response = await fetch(`https://${domain}/api/${version}/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        },
        body: JSON.stringify({ query: simpleQuery }),
      })

      console.log(`📊 Resposta da API ${version}:`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      })

      if (response.ok) {
        const data = await response.json()
        
        if (data.errors) {
          console.error(`❌ Erros GraphQL na versão ${version}:`, data.errors)
          continue
        }

        console.log(`✅ Token funcionando na versão ${version}!`)
        console.log('🏪 Dados da loja:', data.data.shop)
        
        // Agora tenta buscar produtos
        await testProductsQuery(storefrontAccessToken, domain, version)
        return
      } else {
        console.error(`❌ Erro na versão ${version}:`, response.status, response.statusText)
        
        // Tenta ler o corpo da resposta para mais detalhes
        try {
          const errorText = await response.text()
          console.error(`📄 Detalhes do erro:`, errorText)
        } catch (e) {
          console.error('Não foi possível ler o corpo da resposta')
        }
      }
    }
    
    console.error('❌ Nenhuma versão da API funcionou')
    
  } catch (error) {
    console.error('❌ Erro ao testar token:', error)
  }
}

// Função para testar busca de produtos
async function testProductsQuery(storefrontAccessToken: string, domain: string, apiVersion: string) {
  try {
    console.log(`🛍️ Testando busca de produtos na versão ${apiVersion}...`)
    
    const productsQuery = `
      query {
        products(first: 3) {
          edges {
            node {
              id
              title
              handle
              variants(first: 5) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query: productsQuery }),
    })

    if (!response.ok) {
      console.error('❌ Erro ao buscar produtos:', response.status, response.statusText)
      return
    }

    const data = await response.json()
    
    if (data.errors) {
      console.error('❌ Erros GraphQL ao buscar produtos:', data.errors)
      return
    }

    console.log('✅ Produtos encontrados:', data.data.products.edges.length)
    
    data.data.products.edges.forEach((product: any, index: number) => {
      console.log(`\n📦 Produto ${index + 1}:`)
      console.log(`- ID: ${product.node.id}`)
      console.log(`- Título: ${product.node.title}`)
      console.log(`- Handle: ${product.node.handle}`)
      console.log(`- Variantes: ${product.node.variants.edges.length}`)
      
      product.node.variants.edges.forEach((variant: any, vIndex: number) => {
        console.log(`  📝 Variante ${vIndex + 1}:`)
        console.log(`    - ID: ${variant.node.id}`)
        console.log(`    - Título: ${variant.node.title}`)
        console.log(`    - Disponível: ${variant.node.availableForSale}`)
        console.log(`    - Preço: ${variant.node.price.amount} ${variant.node.price.currencyCode}`)
      })
    })
    
  } catch (error) {
    console.error('❌ Erro ao testar busca de produtos:', error)
  }
}

export function BuyButton({ productName, productPrice, productImage }: SimpleBuyButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleBuyNow = async () => {
    setIsLoading(true)
    try {
      // Trigger InitiateCheckout event on pixels
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
  productImage,
  onAddToCart,
}: BuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Teste simples do token
  useEffect(() => {
    if (domain && storefrontAccessToken) {
      testStorefrontToken(storefrontAccessToken, domain)
    }
  }, [domain, storefrontAccessToken])

  const handleBuyNow = useCallback(async () => {
    setIsLoading(true)
    try {
      // Usar o cart URL diretamente já que os IDs estão corretos
      const cartUrl = `https://${domain}/cart/${productId}:1?channel=buy_button`
      console.log('🛒 Abrindo cart:', cartUrl)
      console.log('📦 Produto:', productName)
      console.log('💰 Preço:', productPrice)
      
      window.open(cartUrl, '_blank')
      onAddToCart?.(1)
    } catch (error) {
      console.error('Error in buy now:', error)
    } finally {
      setIsLoading(false)
    }
  }, [domain, productId, productName, productPrice, onAddToCart])

  return (
    <div className="w-full max-w-md mx-auto">
      <Button 
        onClick={handleBuyNow}
        disabled={isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : `Buy Now - $${productPrice}`}
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
  productImage,
  onAddToCart,
}: BuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleBuyNow = useCallback(async () => {
    setIsLoading(true)
    try {
      // Usar o cart URL diretamente já que os IDs estão corretos
      const cartUrl = `https://${domain}/cart/${productId}:1?channel=buy_button`
      console.log('🛒 [COMPACT] Abrindo cart:', cartUrl)
      console.log('📦 [COMPACT] Produto:', productName)
      console.log('💰 [COMPACT] Preço:', productPrice)
      
      window.open(cartUrl, '_blank')
      onAddToCart?.(1)
    } catch (error) {
      console.error('Error in compact buy now:', error)
    } finally {
      setIsLoading(false)
    }
  }, [domain, productId, productName, productPrice, onAddToCart])

  return (
    <Button 
      onClick={handleBuyNow}
      disabled={isLoading}
      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      {isLoading ? 'Processing...' : `Buy $${productPrice}`}
    </Button>
  )
} 