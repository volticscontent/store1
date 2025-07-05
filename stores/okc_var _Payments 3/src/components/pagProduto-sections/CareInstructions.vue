<template>
  <section class="care-instructions">
    <div class="care-container">
      <!-- Seção More Details -->
      <div class="details-section">
        <h3 class="section-title">More Details</h3>
        <ul class="details-list">
          <li>Officially licensed by the NBA</li>
          <li>Brand: Nike</li>
          <li>Standard fit for a relaxed and easy feel</li>
          <li>Heat-applied twill name and number</li>
          <li>100% Recycled polyester</li>
        </ul>
      </div>

      <!-- Seção Care -->
      <div class="care-section">
        <h3 class="section-title">Care</h3>
        <ul class="care-list">
          <li>Machine wash inside out in cold water with like colors</li>
          <li>Air dry or tumble dry on low heat</li>
          <li>Do not use softeners, bleach, or dryer sheets</li>
          <li>If needed, iron on a cool setting to avoid damaging logos or designs</li>
        </ul>
      </div>

      <!-- Nota Importante -->
      <div class="important-note">
        <h3 class="note-title">Please Note:</h3>
        <p class="note-text">
          Please make sure that the <strong>NAME and NUMBER are correct</strong> before the order is submitted. 
          <strong>ABSOLUTELY NO changes can be made to the order after it is submitted.</strong>
        </p>

        <div class="policy-section">
          <p class="policy-intro">
            • The Thunder Shop reserves the right to <strong>cancel any custom order</strong> at its discretion, should the submission contain the following:
          </p>
          
          <ul class="policy-list">
            <li>Profanity and/or text that implies profane language</li>
            <li>Inappropriate slang or slogans</li>
            <li>Insulting or discriminatory content</li>
            <li>Content created to incite violence</li>
            <li>Any other trademarked words or phrases</li>
            <li>Content that we do not accept as a reflection of our brand</li>
          </ul>
          
          <p class="policy-footer">
            • This is a <strong>league-mandated policy.</strong>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente de instruções de cuidados e detalhes do produto
</script>

<style scoped>
.care-instructions {
  background-color: #ffffff;
  padding: 30px 20px;
  border-top: 1px solid #e5e7eb;
}

.care-container {
  max-width: 500px;
  margin: 0 auto;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
}

/* Seção More Details */
.details-section {
  margin-bottom: 30px;
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.details-list li {
  font-size: 14px;
  color: #4b5563;
  padding: 4px 0;
  padding-left: 16px;
  position: relative;
  line-height: 1.5;
}

.details-list li::before {
  content: "•";
  color: #1e3a8a;
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* Seção Care */
.care-section {
  margin-bottom: 30px;
}

.care-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.care-list li {
  font-size: 14px;
  color: #4b5563;
  padding: 4px 0;
  padding-left: 16px;
  position: relative;
  line-height: 1.5;
}

.care-list li::before {
  content: "•";
  color: #1e3a8a;
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* Nota Importante */
.important-note {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.note-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.note-text {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 16px;
  font-size: 14px;
}

.policy-section {
  margin-top: 16px;
}

.policy-intro {
  color: #4b5563;
  margin-bottom: 12px;
  line-height: 1.5;
  font-size: 14px;
}

.policy-list {
  list-style: none;
  padding: 0;
  margin: 12px 0;
  padding-left: 20px;
}

.policy-list li {
  position: relative;
  margin-bottom: 6px;
  color: #4b5563;
  line-height: 1.4;
  font-size: 14px;
}

.policy-list li::before {
  content: '◦';
  position: absolute;
  left: -15px;
  color: #6b7280;
}

.policy-footer {
  color: #4b5563;
  margin-top: 12px;
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 14px;
}

/* Responsividade */
@media (min-width: 768px) {
  .care-instructions {
    padding: 40px 32px;
  }
  
  .care-container {
    max-width: 600px;
  }
  
  .section-title {
    font-size: 18px;
  }
  
  .details-list li,
  .care-list li,
  .note-text,
  .policy-intro,
  .policy-list li,
  .policy-footer {
    font-size: 15px;
  }
  
  .important-note {
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .care-container {
    max-width: 800px;
  }
  
  .section-title {
    font-size: 20px;
  }
  
  .details-list li,
  .care-list li,
  .note-text,
  .policy-intro,
  .policy-list li,
  .policy-footer {
    font-size: 16px;
  }
}
</style> 