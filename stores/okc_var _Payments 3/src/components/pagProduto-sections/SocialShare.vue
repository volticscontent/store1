<template>
  <section class="social-share">
    <div class="share-container">
      <div class="share-header">
        <h2>Share:</h2>
      </div>
      
      <ul class="product-page-social-icons">
        <li>
          <a 
            :href="facebookShareUrl" 
            aria-label="Share on Facebook"
            class="facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </li>
        
        <li>
          <a 
            :href="twitterShareUrl" 
            aria-label="Share on Twitter"
            title="Share on Twitter"
            target="_blank"
            rel="noopener noreferrer"
            class="twitter"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
        </li>
        
        <li>
          <a 
            :href="pinterestShareUrl" 
            aria-label="Share on Pinterest"
            title="Pin This Product"
            target="_blank"
            rel="noopener noreferrer"
            class="pinterest"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-12.014C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

// URL do produto para compartilhamento
const productUrl = 'https://nbathundershop.com/products/okctyz0012-youth-nike-oklahoma-city-thunder-personalized-icon-swingman-jersey'
const productTitle = 'SHAI GILGEOUS-ALEXANDER Oklahoma City Thunder Autographed Fanatics Authentic Nike 2025 NBA Finals Patch Blue Icon Authentic Jersey'
const productImage = 'https://nbathundershop.com/cdn/shop/files/custom_icon_back_1024x1024.png?v=1728590848'

// URLs de compartilhamento
const facebookShareUrl = computed(() => {
  return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(productUrl)}`
})

const twitterShareUrl = computed(() => {
  return `https://twitter.com/home?status=${encodeURIComponent(productUrl)} via @`
})

const pinterestShareUrl = computed(() => {
  return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}&media=${encodeURIComponent(productImage)}`
})
</script>

<style scoped>
.social-share {
  padding: 5px 20px 40px;
  text-align: center;
  background-color: #ffffff;
}

.share-container {
  max-width: 500px;
  margin: 0 auto;
}

.share-header {
  margin-bottom: 20px;
}

.share-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #767676;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-page-social-icons {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.product-page-social-icons li {
  display: inline-block;
}

.product-page-social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.3s ease;
  text-decoration: none;
}

.product-page-social-icons a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Cores específicas para cada rede social */
.facebook {
  background-color: #1877f2;
  color: white;
}

.facebook:hover {
  background-color: #166fe5;
}

.twitter {
  background-color: #1da1f2;
  color: white;
}

.twitter:hover {
  background-color: #0d8bd9;
}

.pinterest {
  background-color: #e60023;
  color: white;
}

.pinterest:hover {
  background-color: #d50000;
}

/* Responsividade */
@media (min-width: 768px) {
  .social-share {
    padding: 75px 32px 60px;
  }
  
  .share-header h2 {
    font-size: 20px;
  }
  
  .product-page-social-icons {
    gap: 30px;
  }
  
  .product-page-social-icons a {
    width: 60px;
    height: 60px;
  }
}

@media (min-width: 1024px) {
  .share-container {
    max-width: 600px;
  }
  
  .share-header h2 {
    font-size: 22px;
  }
}
</style> 