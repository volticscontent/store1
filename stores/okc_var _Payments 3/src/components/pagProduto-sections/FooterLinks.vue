<template>
  <section class="footer-links">
    <div class="footer-container">
      <!-- Quick Links Section -->
      <div class="links-section">
        <div class="section-header" @click="toggleSection('quickLinks')">
          <h3 class="section-title">Quick Links</h3>
          <svg 
            class="toggle-icon" 
            :class="{ 'rotated': openSections.quickLinks }"
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none"
          >
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="section-content" :class="{ 'open': openSections.quickLinks }">
          <ul class="links-list">
            <li><a href="#" class="footer-link">Search</a></li>
            <li><a href="#" class="footer-link">Privacy Policy</a></li>
            <li><a href="#" class="footer-link">Refund Policy</a></li>
            <li><a href="#" class="footer-link">Terms of Service</a></li>
            <li><a href="#" class="footer-link">Shipping Policy</a></li>
            <li><a href="#" class="footer-link">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <!-- Information Section -->
      <div class="links-section">
        <div class="section-header" @click="toggleSection('information')">
          <h3 class="section-title">Information</h3>
          <svg 
            class="toggle-icon" 
            :class="{ 'rotated': openSections.information }"
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none"
          >
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="section-content" :class="{ 'open': openSections.information }">
          <ul class="links-list">
            <li><a href="#" class="footer-link">About Us</a></li>
            <li><a href="#" class="footer-link">Size Guide</a></li>
            <li><a href="#" class="footer-link">FAQ</a></li>
            <li><a href="#" class="footer-link">Store Locations</a></li>
            <li><a href="#" class="footer-link">Career Opportunities</a></li>
            <li><a href="#" class="footer-link">Wholesale</a></li>
          </ul>
        </div>
      </div>
          <div class="shield-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 12l2 2 4-4" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="security-text">
            <p class="security-title">All Purchases</p>
            <p class="security-subtitle">Are Secure</p>
          </div>

      <!-- Copyright Section -->
      <div class="copyright-section">
        <div class="copyright-content">
          <p class="copyright-text">
            ©2025 Legends Global Merchandise All Rights Reserved. No portion of this site may be reproduced or duplicated without the express permission of Legends Global Merchandise.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const openSections = ref({
  quickLinks: false,
  information: false
})

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section]
}

// Auto-open sections on desktop
onMounted(() => {
  if (window.innerWidth >= 768) {
    openSections.value.quickLinks = true
    openSections.value.information = true
  }
})
</script>

<style scoped>
.footer-links {
  background-color: #f8f9fa;
  padding: 40px 20px;
  border-top: 1px solid #e5e7eb;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.links-section {
  margin-bottom: 30px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 15px 0;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e3a8a;
  margin: 0;
}

.toggle-icon {
  color: #1e3a8a;
  transition: transform 0.3s ease;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.section-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.section-content.open {
  max-height: 300px;
}

.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-list li {
  margin-bottom: 12px;
}

.footer-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #1e3a8a;
}

.social-section {
  margin-bottom: 30px;
  text-align: center;
}

.social-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 15px;
}

.follow-text {
  color: #6b7280;
  margin-bottom: 15px;
  font-size: 14px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-link.twitter {
  background-color: #1da1f2;
  color: white;
}

.social-link.facebook {
  background-color: #1877f2;
  color: white;
}

.social-link.instagram {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  color: white;
}

.social-link:hover {
  transform: scale(1.1);
}

.security-section {
  margin-bottom: 30px;
  text-align: center;
}

.security-badge {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.security-text {
  text-align: left;
}

.security-title {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 0 0 4px 0;
}

.security-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.copyright-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  background-color: #f8f9fa;
}

.copyright-content {
  text-align: center;
  padding: 15px 20px;
}

.copyright-text {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
  max-width: 800px;
  margin: 0 auto;
}

/* Responsividade para Copyright */
@media (max-width: 768px) {
  .copyright-section {
    margin-top: 25px;
    padding-top: 15px;
  }
  
  .copyright-content {
    padding: 12px 15px;
    margin-bottom: 20px;
  }
  
  .copyright-text {
    font-size: 11px;
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .copyright-text {
    font-size: 10px;
    line-height: 1.4;
    margin-bottom: 20px;
  }
}

/* Desktop styles */
@media (min-width: 768px) {
  .footer-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
    align-items: start;
  }
  
  .links-section {
    border-bottom: none;
    margin-bottom: 0;
  }
  
  .section-header {
    cursor: default;
    padding: 0 0 15px 0;
  }
  
  .toggle-icon {
    display: none;
  }
  
  .section-content {
    max-height: none;
  }
  
  .social-section {
    margin-bottom: 0;
  }
  
  .copyright-section {
    grid-column: 1 / -1;
    margin-top: 30px;
  }
  
  .security-section {
    grid-column: 1 / -1;
    margin-bottom: 0;
  }
}
</style> 