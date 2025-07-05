<template>
  <header class="header">
    <!-- Mobile Header -->
    <div class="mobile-header">
      <button class="menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      
      <div class="logo">
        <img src="/images/thunder_logo.png" alt="Oklahoma City Thunder" @click="showWarningPopup" style="cursor: pointer;" />
      </div>
      
      <div class="mobile-actions">
        <a href="/account" class="login-btn" aria-label="Login" @click.prevent="showWarningPopup('/account')">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
            <path d="M10 12.5C4.47715 12.5 0 16.9772 0 21.5V22.5C0 23.6046 0.895431 24.5 2 24.5H18C19.1046 24.5 20 23.6046 20 22.5V21.5C20 16.9772 15.5228 12.5 10 12.5Z" fill="currentColor"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <nav 
      class="mobile-nav-wrapper" 
      :class="{ 'mobMenuOpen': isMobileMenuOpen }"
      role="dialog" 
      tabindex="-1" 
      aria-modal="true" 
      aria-label="Navigation"
      v-show="isMobileMenuOpen"
      @click="closeMobileMenu"
    >
      <div class="mobile-nav" @click.stop>

        <!-- Navigation Menu -->
        <ul class="mobile-nav">
          <!-- NBA FINALS -->
          <li class="mobile-nav__item">
            <a class="mobile-nav__link" href="/collections/okc-thunder-playoffs" @click.prevent="showWarningPopup('/collections/okc-thunder-playoffs')">NBA FINALS</a>
          </li>

          <!-- SHOP COLLECTIONS -->
          <li class="mobile-nav__item menu-item-has-children">
            <a class="mobile-nav__link" href="/" @click.prevent="showWarningPopup('/')">SHOP COLLECTIONS</a>
            <button 
              class="custom_mobile_toggle-button" 
              @click="toggleSubmenu('shopCollections')"
              :aria-expanded="openSubmenus.shopCollections"
            >
              <span class="fas fa-caret-down" :class="{ 'rotated': openSubmenus.shopCollections }">▼</span>
            </button>
            
            <ul class="mobile-nav-sub" v-show="openSubmenus.shopCollections">
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/okc-thunder-playoffs" @click.prevent="showWarningPopup('/collections/okc-thunder-playoffs')">NBA FINALS GEAR | SHOP NOW</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/okc-thunder-roster-collection" @click.prevent="showWarningPopup('/collections/okc-thunder-roster-collection')">OKC THUNDER ROSTER COLLECTION</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/pages/mvp" @click.prevent="showWarningPopup('/pages/mvp')">2024-25 NBA MVP</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/new-arrivals" @click.prevent="showWarningPopup('/collections/new-arrivals')">NEW ARRIVALS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/native-american-heritage" @click.prevent="showWarningPopup('/collections/native-american-heritage')">NATIVE AMERICAN HERITAGE</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/nike" @click.prevent="showWarningPopup('/collections/nike')">NIKE</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/pro-standard" @click.prevent="showWarningPopup('/collections/pro-standard')">PRO STANDARD</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/rumble-merch" @click.prevent="showWarningPopup('/collections/rumble-merch')">RUMBLE COLLECTION</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/simple-modern" @click.prevent="showWarningPopup('/collections/simple-modern')">SIMPLE MODERN</a>
              </li>
            </ul>
          </li>

          <!-- PLAYERS -->
          <li class="mobile-nav__item menu-item-has-children">
            <a class="mobile-nav__link" href="#" @click.prevent="showWarningPopup('#')">PLAYERS</a>
            <button 
              class="custom_mobile_toggle-button" 
              @click="toggleSubmenu('players')"
              :aria-expanded="openSubmenus.players"
            >
              <span class="fas fa-caret-down" :class="{ 'rotated': openSubmenus.players }">▼</span>
            </button>
            
            <ul class="mobile-nav-sub" v-show="openSubmenus.players">
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/player_shai-gilgeous-alexander" @click.prevent="showWarningPopup('/collections/player_shai-gilgeous-alexander')">SHAI GILGEOUS-ALEXANDER</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/player_chet-holmgren" @click.prevent="showWarningPopup('/collections/player_chet-holmgren')">CHET HOLMGREN</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/player_jalen-williams" @click.prevent="showWarningPopup('/collections/player_jalen-williams')">JALEN WILLIAMS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/player_luguentz-dort" @click.prevent="showWarningPopup('/collections/player_luguentz-dort')">LUGUENTZ DORT</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/player_jaylin-williams" @click.prevent="showWarningPopup('/collections/player_jaylin-williams')">JAYLIN WILLIAMS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/player_cason-wallace" @click.prevent="showWarningPopup('/collections/player_cason-wallace')">CASON WALLACE</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/player_aaron-wiggins" @click.prevent="showWarningPopup('/collections/player_aaron-wiggins')">AARON WIGGINS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/isaiah-hartenstein" @click.prevent="showWarningPopup('/collections/isaiah-hartenstein')">ISAIAH HARTENSTEIN</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/alex-caruso" @click.prevent="showWarningPopup('/collections/alex-caruso')">ALEX CARUSO</a>
              </li>
            </ul>
          </li>

          <!-- JERSEYS -->
          <li class="mobile-nav__item menu-item-has-children">
            <a class="mobile-nav__link" href="/collections/jerseys" @click.prevent="showWarningPopup('/collections/jerseys')">JERSEYS</a>
            <button 
              class="custom_mobile_toggle-button" 
              @click="toggleSubmenu('jerseys')"
              :aria-expanded="openSubmenus.jerseys"
            >
              <span class="fas fa-caret-down" :class="{ 'rotated': openSubmenus.jerseys }">▼</span>
            </button>
            
            <ul class="mobile-nav-sub" v-show="openSubmenus.jerseys">
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/icon-jerseys" @click.prevent="showWarningPopup('/collections/icon-jerseys')">BLUE ICON JERSEYS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/statement-jerseys" @click.prevent="showWarningPopup('/collections/statement-jerseys')">STATEMENT JERSEYS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/association-jerseys" @click.prevent="showWarningPopup('/collections/association-jerseys')">WHITE ASSOCIATION JERSEYS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/custom-jerseys" @click.prevent="showWarningPopup('/collections/custom-jerseys')">CUSTOM JERSEYS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/youth-jerseys-1" @click.prevent="showWarningPopup('/collections/youth-jerseys-1')">YOUTH JERSEYS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/jerseys" @click.prevent="showWarningPopup('/collections/jerseys')">ALL STYLES</a>
              </li>
            </ul>
          </li>

          <!-- MENS -->
          <li class="mobile-nav__item menu-item-has-children">
            <a class="mobile-nav__link" href="/collections/men" @click.prevent="showWarningPopup('/collections/men')">MENS</a>
            <button 
              class="custom_mobile_toggle-button" 
              @click="toggleSubmenu('mens')"
              :aria-expanded="openSubmenus.mens"
            >
              <span class="fas fa-caret-down" :class="{ 'rotated': openSubmenus.mens }">▼</span>
            </button>
            
            <ul class="mobile-nav-sub" v-show="openSubmenus.mens">
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/okc-thunder-mens-nba-finals-merch" @click.prevent="showWarningPopup('/collections/okc-thunder-mens-nba-finals-merch')">NBA FINALS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/mens-shirts" @click.prevent="showWarningPopup('/collections/mens-shirts')">SHIRTS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/mens-outerwear" @click.prevent="showWarningPopup('/collections/mens-outerwear')">OUTERWEAR</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/mens-shorts" @click.prevent="showWarningPopup('/collections/mens-shorts')">BOTTOMS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/mens-okc-thunder-hats" @click.prevent="showWarningPopup('/collections/mens-okc-thunder-hats')">HATS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/men" @click.prevent="showWarningPopup('/collections/men')">ALL STYLES</a>
              </li>
            </ul>
          </li>

          <!-- WOMENS -->
          <li class="mobile-nav__item menu-item-has-children">
            <a class="mobile-nav__link" href="/collections/all-womens" @click.prevent="showWarningPopup('/collections/all-womens')">WOMENS</a>
            <button 
              class="custom_mobile_toggle-button" 
              @click="toggleSubmenu('womens')"
              :aria-expanded="openSubmenus.womens"
            >
              <span class="fas fa-caret-down" :class="{ 'rotated': openSubmenus.womens }">▼</span>
            </button>
            
            <ul class="mobile-nav-sub" v-show="openSubmenus.womens">
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/okc-thunder-womens-nba-finals-merch" @click.prevent="showWarningPopup('/collections/okc-thunder-womens-nba-finals-merch')">NBA FINALS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/womens-tops" @click.prevent="showWarningPopup('/collections/womens-tops')">SHIRTS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/womens-outerwear" @click.prevent="showWarningPopup('/collections/womens-outerwear')">OUTERWEAR</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/womens-hats-1" @click.prevent="showWarningPopup('/collections/womens-hats-1')">HATS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/womens-bottoms" @click.prevent="showWarningPopup('/collections/womens-bottoms')">BOTTOMS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/all-womens" @click.prevent="showWarningPopup('/collections/all-womens')">ALL STYLES</a>
              </li>
            </ul>
          </li>

          <!-- YOUTH -->
          <li class="mobile-nav__item menu-item-has-children">
            <a class="mobile-nav__link" href="/collections/youth" @click.prevent="showWarningPopup('/collections/youth')">YOUTH</a>
            <button 
              class="custom_mobile_toggle-button" 
              @click="toggleSubmenu('youth')"
              :aria-expanded="openSubmenus.youth"
            >
              <span class="fas fa-caret-down" :class="{ 'rotated': openSubmenus.youth }">▼</span>
            </button>
            
            <ul class="mobile-nav-sub" v-show="openSubmenus.youth">
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/okc-thunder-youth-nba-finals-merch" @click.prevent="showWarningPopup('/collections/okc-thunder-youth-nba-finals-merch')">NBA FINALS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/youth-jerseys-1" @click.prevent="showWarningPopup('/collections/youth-jerseys-1')">JERSEYS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/youth-shirts-1" @click.prevent="showWarningPopup('/collections/youth-shirts-1')">SHIRTS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/youth-outerwear" @click.prevent="showWarningPopup('/collections/youth-outerwear')">OUTERWEAR</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/youth-hats-1" @click.prevent="showWarningPopup('/collections/youth-hats-1')">HATS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/infant-toddler" @click.prevent="showWarningPopup('/collections/infant-toddler')">INFANT & TODDLER</a>
              </li>
            </ul>
          </li>

          <!-- HATS -->
          <li class="mobile-nav__item menu-item-has-children">
            <a class="mobile-nav__link" href="/collections/headwear" @click.prevent="showWarningPopup('/collections/headwear')">HATS</a>
            <button 
              class="custom_mobile_toggle-button" 
              @click="toggleSubmenu('hats')"
              :aria-expanded="openSubmenus.hats"
            >
              <span class="fas fa-caret-down" :class="{ 'rotated': openSubmenus.hats }">▼</span>
            </button>
            
            <ul class="mobile-nav-sub" v-show="openSubmenus.hats">
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/okc-thunder-nba-finals-hats" @click.prevent="showWarningPopup('/collections/okc-thunder-nba-finals-hats')">NBA FINALS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/snapback" @click.prevent="showWarningPopup('/collections/snapback')">SNAPBACK</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/adjustable" @click.prevent="showWarningPopup('/collections/adjustable')">ADJUSTABLE</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/fitted" @click.prevent="showWarningPopup('/collections/fitted')">FITTED</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/trucker-hats" @click.prevent="showWarningPopup('/collections/trucker-hats')">TRUCKER</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/cold-weather" @click.prevent="showWarningPopup('/collections/cold-weather')">KNIT</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/new-era-hats" @click.prevent="showWarningPopup('/collections/new-era-hats')">NEW ERA</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/womens-hats-1" @click.prevent="showWarningPopup('/collections/womens-hats-1')">WOMEN'S</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/youth-hats-1" @click.prevent="showWarningPopup('/collections/youth-hats-1')">YOUTH</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/headwear" @click.prevent="showWarningPopup('/collections/headwear')">ALL STYLES</a>
              </li>
            </ul>
          </li>

          <!-- ACCESSORIES -->
          <li class="mobile-nav__item menu-item-has-children">
            <a class="mobile-nav__link" href="/collections/accessories" @click.prevent="showWarningPopup('/collections/accessories')">ACCESSORIES</a>
            <button 
              class="custom_mobile_toggle-button" 
              @click="toggleSubmenu('accessories')"
              :aria-expanded="openSubmenus.accessories"
            >
              <span class="fas fa-caret-down" :class="{ 'rotated': openSubmenus.accessories }">▼</span>
            </button>
            
            <ul class="mobile-nav-sub" v-show="openSubmenus.accessories">
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/okc-thunder-nba-finals-collectibles" @click.prevent="showWarningPopup('/collections/okc-thunder-nba-finals-collectibles')">NBA FINALS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/basketballs" @click.prevent="showWarningPopup('/collections/basketballs')">BASKETBALLS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/beverage" @click.prevent="showWarningPopup('/collections/beverage')">BEVERAGE</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/plush" @click.prevent="showWarningPopup('/collections/plush')">PLUSH</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/backpack" @click.prevent="showWarningPopup('/collections/backpack')">BACKPACKS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/magnets-decals" @click.prevent="showWarningPopup('/collections/magnets-decals')">MAGNETS & DECALS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/socks" @click.prevent="showWarningPopup('/collections/socks')">SOCKS</a>
              </li>
              <li class="mobile-nav__item">
                <a class="mobile-nav__link" href="/collections/accessories" @click.prevent="showWarningPopup('/collections/accessories')">ALL STYLES</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Desktop Header -->
    <div class="desktop-header">
      <div class="logo">
        <img src="/images/thunder_logo.png" alt="Oklahoma City Thunder" @click="showWarningPopup" style="cursor: pointer;" />
      </div>
      <nav class="desktop-nav">
        <a href="#" @click.prevent="showWarningPopup('#')">Shop</a>
        <a href="#" @click.prevent="showWarningPopup('#')">Players</a>
        <a href="#" @click.prevent="showWarningPopup('#')">Jerseys</a>
        <button class="cart-btn desktop-cart-btn" @click="toggleCart" aria-label="Carrinho">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
          Carrinho
        </button>
        <a href="/account" class="login-link" @click.prevent="showWarningPopup('/account')">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
            <path d="M10 12.5C4.47715 12.5 0 16.9772 0 21.5V22.5C0 23.6046 0.895431 24.5 2 24.5H18C19.1046 24.5 20 23.6046 20 22.5V21.5C20 16.9772 15.5228 12.5 10 12.5Z" fill="currentColor"/>
          </svg>
          Login
        </a>
      </nav>
    </div>

    <!-- Warning Modal -->
    <div 
      class="warning-modal-overlay" 
      v-show="showModal" 
      @click="closeModal"
    >
      <div class="warning-modal" @click.stop>
        <div class="warning-header">
          <h2>⚠️ WARNING!</h2>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        
        <div class="warning-content">
          <p class="warning-text">
            IF YOU LEAVE NOW YOU WILL LOSE YOUR PROMOTION!
          </p>
          <p class="warning-subtext">
            Stay on this page to keep your exclusive discount active.
          </p>
        </div>
        
        <div class="warning-actions">
          <button class="stay-btn" @click="closeModal">
            STAY & KEEP PROMOTION
          </button>
          <button class="leave-btn" @click="proceedToLink">
            LEAVE ANYWAY
          </button>
        </div>
      </div>
    </div>

    <!-- Cart Modal -->
    <div 
      class="cart-modal-overlay" 
      v-show="isCartOpen" 
      @click="closeCart"
    >
      <div class="cart-modal" @click.stop>
        <div class="cart-header">
          <h2>🛒 Seu Carrinho</h2>
          <button class="close-btn" @click="closeCart">×</button>
        </div>
        
        <div class="cart-content">
          <div v-if="isEmpty" class="empty-cart">
            <p>Seu carrinho está vazio</p>
            <button class="continue-shopping-btn" @click="closeCart">
              Continuar Comprando
            </button>
          </div>
          
          <div v-else class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <div class="item-info">
                <h3>{{ item.title }}</h3>
                <p class="item-sku">SKU: {{ item.sku }}</p>
                <p v-if="item.customName" class="item-custom">Nome: {{ item.customName }}</p>
                <p v-if="item.customNumber" class="item-custom">Número: {{ item.customNumber }}</p>
                <p class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
              
              <div class="item-controls">
                <div class="quantity-controls">
                  <button @click="updateCartItemQuantity(item.id, item.quantity - 1)" class="qty-btn">-</button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button @click="updateCartItemQuantity(item.id, item.quantity + 1)" class="qty-btn">+</button>
                </div>
                <button @click="removeFromCart(item.id)" class="remove-btn">
                  🗑️ Remover
                </button>
              </div>
            </div>
            
            <div class="cart-footer">
              <div class="cart-total">
                <strong>Total: ${{ cartTotal.toFixed(2) }}</strong>
              </div>
              <div class="cart-actions">
                <button class="clear-cart-btn" @click="clearCart">
                  Limpar Carrinho
                </button>
                <button class="checkout-btn" @click="proceedToCheckout">
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useCart } from '@/composables/useCart'

const isMobileMenuOpen = ref(false)
const showModal = ref(false)
const pendingUrl = ref('')

// Usar o composable do carrinho
const {
  cartItems,
  cartItemCount,
  cartTotal,
  isEmpty,
  isCartOpen,
  toggleCart,
  closeCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart
} = useCart()

const openSubmenus = ref({
  shopCollections: false,
  players: false,
  jerseys: false,
  mens: false,
  womens: false,
  youth: false,
  hats: false,
  accessories: false
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscapeKey)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleEscapeKey)
    closeAllSubmenus()
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleEscapeKey)
  closeAllSubmenus()
}

const closeAllSubmenus = () => {
  Object.keys(openSubmenus.value).forEach(key => {
    openSubmenus.value[key] = false
  })
}

const toggleSubmenu = (submenuKey) => {
  openSubmenus.value[submenuKey] = !openSubmenus.value[submenuKey]
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    closeMobileMenu()
    if (showModal.value) {
      closeModal()
    }
    if (isCartOpen.value) {
      closeCart()
    }
  }
}

// Warning Modal Functions
const showWarningPopup = (url = '') => {
  pendingUrl.value = url
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  pendingUrl.value = ''
  document.body.style.overflow = ''
}

const proceedToLink = () => {
  if (pendingUrl.value && pendingUrl.value !== '#') {
    window.location.href = pendingUrl.value
  }
  closeModal()
}

// Cart Functions
const proceedToCheckout = () => {
  alert('Redirecionando para o checkout...')
  // Aqui você pode implementar a lógica de checkout
}

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Mobile Header */
.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #fff;
}

.menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hamburger-line {
  width: 24px;
  height: 3px;
  background-color: rgb(66, 139, 202);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.logo img {
  height: 40px;
  width: auto;
}

.mobile-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-btn,
.cart-btn,
.login-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: rgb(66, 139, 202);
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  position: relative;
}

.search-btn:hover,
.cart-btn:hover,
.login-btn:hover {
  background-color: #f3f4f6;
  transform: scale(1.05);
}

.cart-count {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #dc2626;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
}

.login-text {
  font-size: 11px;
  font-weight: 600;
  color: #1e3a8a;
}

/* Mobile Menu Overlay */
.mobile-nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-nav-wrapper.mobMenuOpen {
  opacity: 1;
  visibility: visible;
}

.mobile-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 85%;
  max-width: 400px;
  height: 100vh;
  background-color: #fff;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.mobile-nav-wrapper.mobMenuOpen .mobile-nav {
  transform: translateX(0);
}

/* Close Button */
.mobile-nav__item:first-child {
  border-bottom: 1px solid #e5e7eb;
}

.mobile-nav-icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f9fa;
}

.mobile-close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #1e3a8a;
  font-weight: bold;
  padding: 5px;
}

.close-text {
  color: #1e3a8a;
  font-weight: 600;
  font-size: 14px;
}

/* Search Form */
.mobile-nav-search-form {
  padding: 20px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e5e7eb;
}

.search-field {
  position: relative;
}

.search-query {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-query:focus {
  border-color: #1e3a8a;
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

.search-field label {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
  transition: all 0.3s ease;
  font-size: 16px;
}

.search-query:focus + label,
.search-query:not(:placeholder-shown) + label {
  top: -8px;
  left: 12px;
  font-size: 12px;
  color: #1e3a8a;
  background-color: #fff;
  padding: 0 4px;
}

/* Navigation Items */
.mobile-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-nav__item {
  border-bottom: 1px solid #e5e7eb;
}

.mobile-nav__link {
  display: block;
  padding: 16px 20px;
  color: #1f2937;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.mobile-nav__link:hover {
  background-color: #f3f4f6;
  color: #1e3a8a;
}

/* Menu Items with Children */
.menu-item-has-children {
  position: relative;
}

.menu-item-has-children > .mobile-nav__link {
  padding-right: 60px;
}

.custom_mobile_toggle-button {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 50px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e3a8a;
  font-size: 12px;
  transition: all 0.3s ease;
}

.custom_mobile_toggle-button:hover {
  background-color: #f3f4f6;
}

.fas.fa-caret-down {
  transition: transform 0.3s ease;
}

.fas.fa-caret-down.rotated {
  transform: rotate(180deg);
}

/* Submenu */
.mobile-nav-sub {
  background-color: #f8f9fa;
  border-top: 1px solid #e5e7eb;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.mobile-nav-sub .mobile-nav__item {
  border-bottom: 1px solid #e5e7eb;
}

.mobile-nav-sub .mobile-nav__item:last-child {
  border-bottom: none;
}

.mobile-nav-sub .mobile-nav__link {
  padding: 14px 40px;
  font-size: 13px;
  color: #4b5563;
  font-weight: 500;
}

.mobile-nav-sub .mobile-nav__link:hover {
  background-color: #e5e7eb;
  color: #1e3a8a;
}

/* Desktop Header */
.desktop-header {
  display: none;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

.desktop-nav a {
  color: #1e3a8a;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 6px;
}

.desktop-nav a:hover {
  background-color: #f3f4f6;
  transform: translateY(-1px);
}

.desktop-nav .login-link {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white !important;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(30, 58, 138, 0.2);
}

.desktop-nav .login-link:hover {
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
}

.desktop-cart-btn {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white !important;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(30, 58, 138, 0.2);
}

.desktop-cart-btn:hover {
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
}

.desktop-cart-btn .cart-count {
  background: #dc2626;
}

/* Media queries para controlar visibilidade */
@media (min-width: 768px) {
  .mobile-header {
    display: none;
  }
  
  .desktop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 40px;
    background-color: #fff;
  }
  
  .mobile-nav-wrapper {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .desktop-header {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .mobile-header {
    padding: 12px 15px;
  }
  
  .logo img {
    height: 35px;
  }
  
  .mobile-nav {
    width: 90%;
  }
  
  .mobile-nav__link {
    padding: 14px 16px;
    font-size: 13px;
  }
  
  .mobile-nav-sub .mobile-nav__link {
    padding: 12px 32px;
    font-size: 12px;
  }
}

/* Animation for submenu opening */
@media (max-width: 767px) {
  .mobile-nav-sub[style*="display: block"],
  .mobile-nav-sub:not([style*="display: none"]) {
    max-height: 500px;
  }
}

/* Warning Modal Styles */
.warning-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;
}

.warning-modal {
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease;
  border: 3px solid #fbbf24;
  overflow: hidden;
}

.warning-header {
  background: linear-gradient(135deg, #24d0fb 0%, #0b97f5 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #dc2626;
}

.warning-header h2 {
  color: #fd5623;
  font-size: 24px;
  font-weight: 900;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: #ffffff;
  cursor: pointer;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: rgba(31, 41, 55, 0.1);
  transform: scale(1.1);
}

.warning-content {
  padding: 30px 25px;
  text-align: center;
}

.warning-text {
  color: black;
  font-size: 22px;
  font-weight: 900;
  margin: 0 0 15px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  animation: shake 0.5s ease-in-out infinite alternate;
}

.warning-subtext {
  color: black;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  opacity: 0.9;
}

.warning-actions {
  padding: 20px 25px 30px;
  display: flex;
  gap: 15px;
  flex-direction: column;
}

.stay-btn {
  background: linear-gradient(135deg, #168ea3 0%, #157080 100%);
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 20px rgba(22, 163, 74, 0.4);
  transition: all 0.3s ease;
  animation: glow 2s ease-in-out infinite alternate;
}

.stay-btn:hover {
  background: linear-gradient(135deg, #15803d 0%, #166534 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(22, 163, 74, 0.6);
}

.leave-btn {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.leave-btn:hover {
  background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
  opacity: 1;
  transform: translateY(-1px);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(-50px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(2px);
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 8px 20px rgba(22, 163, 74, 0.4);
  }
  100% {
    box-shadow: 0 8px 30px rgba(22, 163, 74, 0.8);
  }
}

/* Mobile Modal Adjustments */
@media (max-width: 480px) {
  .warning-modal {
    width: 95%;
    margin: 20px;
  }
  
  .warning-header h2 {
    font-size: 20px;
  }
  
  .warning-text {
    font-size: 18px;
  }
  
  .warning-subtext {
    font-size: 14px;
  }
  
  .stay-btn {
    padding: 12px 20px;
    font-size: 14px;
  }
  
  .leave-btn {
    padding: 10px 20px;
    font-size: 12px;
  }
}

/* Cart Modal Styles */
.cart-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;
}

.cart-modal {
  background: white;
  border-radius: 20px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cart-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.cart-header h2 {
  font-size: 24px;
  font-weight: 900;
  margin: 0;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-cart {
  text-align: center;
  padding: 40px 20px;
}

.empty-cart p {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 20px;
}

.continue-shopping-btn {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-shopping-btn:hover {
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  transform: translateY(-2px);
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #f9fafb;
}

.item-info h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1f2937;
}

.item-sku {
  font-size: 12px;
  color: #6b7280;
  margin: 4px 0;
}

.item-custom {
  font-size: 12px;
  color: #1e3a8a;
  margin: 2px 0;
  font-weight: 500;
}

.item-price {
  font-size: 16px;
  font-weight: 700;
  color: #059669;
  margin: 8px 0 0 0;
}

.item-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 4px;
}

.qty-btn {
  background: #1e3a8a;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background: #1e40af;
  transform: scale(1.1);
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.remove-btn {
  background: #dc2626;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #b91c1c;
  transform: scale(1.05);
}

.cart-footer {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
}

.cart-total {
  text-align: center;
  font-size: 20px;
  color: #1f2937;
  margin-bottom: 20px;
}

.cart-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.clear-cart-btn {
  background: #6b7280;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-cart-btn:hover {
  background: #4b5563;
  transform: translateY(-1px);
}

.checkout-btn {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  background: linear-gradient(135deg, #047857 0%, #059669 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
}

/* Mobile Cart Adjustments */
@media (max-width: 480px) {
  .cart-modal {
    width: 95%;
    max-height: 85vh;
  }
  
  .cart-item {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .item-controls {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  
  .cart-actions {
    flex-direction: column;
  }
  
  .clear-cart-btn,
  .checkout-btn {
    width: 100%;
  }
}
</style> 