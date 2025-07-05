<template>
  <div class="pagina-produto">
    <AnnouncementBar />
    <Header />
    
    <main class="main-content">
      <HeroSection />
      <ProductDetails />
      <ProductDescription />
      <SocialShare />
      <CareInstructions />
      <RelatedProducts />
      <FooterLinks />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/common/Header.vue'
import AnnouncementBar from './components/common/AnnouncementBar.vue'
import Footer from './components/common/Footer.vue'
import HeroSection from './components/pagProduto-sections/HeroSection.vue'
import ProductDetails from './components/pagProduto-sections/ProductDetails.vue'
import ProductDescription from './components/pagProduto-sections/ProductDescription.vue'
import SocialShare from './components/pagProduto-sections/SocialShare.vue'
import CareInstructions from './components/pagProduto-sections/CareInstructions.vue'
import RelatedProducts from './components/pagProduto-sections/RelatedProducts.vue'
import FooterLinks from './components/pagProduto-sections/FooterLinks.vue'
</script>

<style scoped>
.pagina-produto {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style> 