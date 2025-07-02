<template>
  <section class="product-description">
    <div class="description-container">
      <!-- Abas de Navegação -->
      <div class="tabs-navigation">
        <button 
          :class="['tab-button', { active: activeTab === 'description' }]"
          @click="activeTab = 'description'"
        >
          Product Description
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'size-chart' }]"
          @click="activeTab = 'size-chart'"
        >
          Size Chart
        </button>
      </div>

      <!-- Conteúdo das Abas -->
      <div class="tab-content">
        <!-- Aba Product Description -->
        <div v-if="activeTab === 'description'" class="description-content">
          <!-- Nota de Produção -->
          <div class="production-note">
            <p><strong>*NOTE: Production of this jersey will take 2-6 business days regardless of shipping option chosen. This item cannot be shipped outside of the US and Canada. All sales are final for personalized items. No returns will be accepted.*</strong></p>
          </div>

          <!-- Seções de Descrição -->
          <div class="description-section">
            <h3>A Complete Gameday Changer</h3>
            <p>The Nike 2024-25 Icon Edition Swingman Jersey lets you rep your team while helping keep you cool and comfortable through every move. Check out our <a href="#" class="link">Youth jersey collection</a> for more jerseys of your favorite players!</p>
          </div>

          <div class="description-section">
            <h3>Lightweight Comfort</h3>
            <p>Double-knit mesh is lightweight yet durable and is designed to help keep you cool.</p>
          </div>

          <div class="description-section">
            <h3>Stay Dry</h3>
            <p>Dri-FIT Technology wicks sweat away from your skin to help you stay dry and comfortable.</p>
          </div>

          <!-- Mais Detalhes -->
          <div class="description-section">
            <h3>More Details</h3>
            <ul class="details-list">
              <li>Officially licensed by the NBA</li>
              <li>Brand: Nike</li>
              <li>Standard fit for a relaxed and easy feel</li>
              <li>Heat-applied twill name and number</li>
              <li>100% Recycled polyester</li>
            </ul>
          </div>

          <!-- Cuidados -->
          <div class="description-section">
            <h3>Care</h3>
            <ul class="care-list">
              <li>Machine wash inside out in cold water with like colors</li>
              <li>Air dry or tumble dry on low heat</li>
              <li>Do not use softeners, bleach, or dryer sheets</li>
              <li>If needed, iron on a cool setting to avoid damaging logos or designs</li>
            </ul>
          </div>
        </div>

        <!-- Aba Size Chart -->
        <div v-if="activeTab === 'size-chart'" class="size-chart-content">
          <div class="size-chart-wrapper">
            <h3 class="chart-title">
              <strong>Men's Nike Jerseys</strong>
            </h3>

            <div class="table-container">
              <table class="size-table">
                <thead>
                  <tr>
                    <th class="size-header-empty"></th>
                    <th class="size-header" colspan="2">S / 40</th>
                    <th class="size-header" colspan="2">M / 44</th>
                    <th class="size-header">L / 48</th>
                    <th class="size-header" colspan="2">XL / 52</th>
                    <th class="size-header" colspan="2">2XL / 56</th>
                    <th class="size-header" colspan="2">3XL / 58</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th class="measurement-label">Chest</th>
                    <td class="measurement-value" colspan="2">35 - 37 1/2</td>
                    <td class="measurement-value" colspan="2">37 1/2 - 41</td>
                    <td class="measurement-value">41 - 44</td>
                    <td class="measurement-value" colspan="2">44 - 48 1/2</td>
                    <td class="measurement-value" colspan="2">48 1/2 - 53 1/2</td>
                    <td class="measurement-value" colspan="2">53 1/2 - 58</td>
                  </tr>
                  <tr>
                    <th class="measurement-label">Length (Swingman)</th>
                    <td class="measurement-value" colspan="2">27.7</td>
                    <td class="measurement-value" colspan="2">28.1</td>
                    <td class="measurement-value">28.9</td>
                    <td class="measurement-value" colspan="2">29.6</td>
                    <td class="measurement-value" colspan="2">30.4</td>
                    <td class="measurement-value" colspan="2">31.2</td>
                  </tr>
                  <tr>
                    <th class="measurement-label">Length (Authentic)</th>
                    <td class="measurement-value" colspan="2">29.2</td>
                    <td class="measurement-value" colspan="2">30.6</td>
                    <td class="measurement-value">31.3</td>
                    <td class="measurement-value" colspan="2">32.1</td>
                    <td class="measurement-value" colspan="2">32.9</td>
                    <td class="measurement-value" colspan="2">33.3</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="size-disclaimer">
              <em>For reference only. Fit may vary depending on materials and manufacturer.</em>
            </p>

            <div class="size-guide-tips">
              <h4>💡 Measurement Tips:</h4>
              <ul>
                <li><strong>Chest:</strong> Measure around the widest part of the chest</li>
                <li><strong>Length:</strong> From shoulder to shirt hem</li>
                <li><strong>Swingman:</strong> Replica version for fans</li>
                <li><strong>Authentic:</strong> Identical version to players</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('description')
</script>

<style scoped>
.product-description {
  background-color: #ffffff;
  padding: 0 20px 40px;
}

.description-container {
  max-width: 500px;
  margin: 0 auto;
}

/* Navegação das Abas */
.tabs-navigation {
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 30px;
}

.tab-button {
  flex: 1;
  padding: 15px 20px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab-button.active {
  border-bottom-color: orangered;
  font-weight: 600;
}

.tab-button:hover {
  color: #1e3a8a;
}

/* Conteúdo das Abas */
.tab-content {
  min-height: 400px;
}

.description-content {
  line-height: 1.6;
  color: #333;
}

.production-note {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 25px;
}

.production-note p {
  margin: 0;
  font-size: 13px;
  color: #856404;
}

.description-section {
  margin-bottom: 25px;
}

.description-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 10px;
}

.description-section p {
  font-size: 14px;
  margin-bottom: 10px;
}

.link {
  color: #1e3a8a;
  text-decoration: underline;
}

.link:hover {
  color: #1e40af;
}

.details-list,
.care-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.details-list li,
.care-list li {
  font-size: 14px;
  padding: 5px 0;
  padding-left: 20px;
  position: relative;
}

.details-list li::before,
.care-list li::before {
  content: "•";
  color: #1e3a8a;
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* Size Chart */
.size-chart-content {
  padding: 20px 0;
}

.size-chart-wrapper {
  max-width: 100%;
}

.chart-title {
  text-align: center;
  margin-bottom: 20px;
  color: #1e3a8a;
  font-size: 18px;
}

.table-container {
  overflow-x: auto;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.size-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  font-size: 14px;
  min-width: 600px;
}

.size-table th,
.size-table td {
  padding: 12px 8px;
  text-align: center;
  border: 1px solid #d1d5db;
}

.size-header-empty {
  background-color: #9ca3af;
  color: #fff;
  font-weight: 600;
}

.size-header {
  background-color: #1e3a8a;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
}

.measurement-label {
  background-color: #9ca3af;
  color: #fff;
  font-weight: 600;
  text-align: center;
  font-size: 13px;
}

.measurement-value {
  background-color: #f9fafb;
  color: #374151;
  font-weight: 500;
}

.measurement-value:hover {
  background-color: #e5e7eb;
}

.size-disclaimer {
  text-align: center;
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 20px;
  font-style: italic;
}

.size-guide-tips {
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
}

.size-guide-tips h4 {
  color: #1e3a8a;
  margin-bottom: 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.size-guide-tips ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.size-guide-tips li {
  margin-bottom: 8px;
  font-size: 13px;
  color: #374151;
  padding-left: 16px;
  position: relative;
}

.size-guide-tips li::before {
  content: "•";
  color: #1e3a8a;
  position: absolute;
  left: 0;
  font-weight: bold;
}

.size-guide-tips strong {
  color: #1e3a8a;
}

.size-chart-placeholder h3 {
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
}

.size-chart-placeholder p {
  color: #999;
  font-size: 14px;
}

/* Responsive para Size Chart */
@media (max-width: 768px) {
  .size-table {
    font-size: 12px;
    min-width: 500px;
  }
  
  .size-table th,
  .size-table td {
    padding: 8px 4px;
  }
  
  .size-header,
  .measurement-label {
    font-size: 11px;
  }
  
  .size-guide-tips {
    padding: 12px;
  }
  
  .size-guide-tips h4 {
    font-size: 13px;
  }
  
  .size-guide-tips li {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .size-table {
    font-size: 11px;
    min-width: 450px;
  }
  
  .size-table th,
  .size-table td {
    padding: 6px 3px;
  }
}

/* Responsividade */
@media (min-width: 768px) {
  .product-description {
    padding: 0 32px 60px;
  }
  
  .description-container {
    max-width: 600px;
  }
  
  .tab-button {
    font-size: 16px;
    padding: 18px 25px;
  }
  
  .description-section h3 {
    font-size: 18px;
  }
  
  .description-section p,
  .details-list li,
  .care-list li {
    font-size: 15px;
  }
}

@media (min-width: 1024px) {
  .description-container {
    max-width: 800px;
  }
  
  .description-section h3 {
    font-size: 20px;
  }
  
  .description-section p,
  .details-list li,
  .care-list li {
    font-size: 16px;
  }
}
</style> 