import requests
import os
from urllib.parse import urljoin
import json

class ProductImageScraper:
    def __init__(self, base_url="https://nba-thunder.store", output_dir="public/products"):
        self.base_url = base_url
        self.output_dir = output_dir
        self.products_data = []
        
        # Criar diretório se não existir
        os.makedirs(output_dir, exist_ok=True)
    
    def download_image(self, image_path, filename):
        """Download uma imagem da URL e salva localmente"""
        try:
            # Construir URL completa
            if image_path.startswith('/'):
                url = urljoin(self.base_url, image_path)
            else:
                url = image_path
            
            print(f"Baixando: {url}")
            
            response = requests.get(url, stream=True)
            response.raise_for_status()
            
            # Salvar imagem
            filepath = os.path.join(self.output_dir, filename)
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            print(f"✅ Salvo: {filepath}")
            return f"/products/{filename}"
            
        except Exception as e:
            print(f"❌ Erro ao baixar {image_path}: {e}")
            return None
    
    def scrape_products(self):
        """Extrai dados dos produtos do HTML fornecido"""
        products = [
            {
                "id": 1,
                "name": "Thunder 2025 Champions Jersey",
                "subtitle": "Official Championship Collection",
                "image_path": "/images/jersey front 1.png",
                "filename": "jersey front 1.png",
                "original_price": "$149.99",
                "final_price": "$49.99",
                "discount": "40%",
                "category": "Accessories"
            },
        ]
        
        print("🚀 Iniciando scraping dos produtos...")
        
        for product in products:
            print(f"\n📦 Processando: {product['name']}")
            
            # Download da imagem
            local_path = self.download_image(
                product['image_path'], 
                product['filename']
            )
            
            if local_path:
                product['local_image'] = local_path
                self.products_data.append(product)
        
        # Salvar dados dos produtos em JSON
        self.save_products_data()
        
        print(f"\n✅ Scraping concluído! {len(self.products_data)} produtos processados.")
        return self.products_data
    
    def save_products_data(self):
        """Salva os dados dos produtos em arquivo JSON"""
        json_path = "src/data/products.json"
        os.makedirs(os.path.dirname(json_path), exist_ok=True)
        
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(self.products_data, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Dados salvos em: {json_path}")

def main():
    scraper = ProductImageScraper()
    products = scraper.scrape_products()
    
    print("\n📊 Resumo dos produtos:")
    for product in products:
        print(f"- {product['name']}: {product['final_price']} ({product['discount']} off)")

if __name__ == "__main__":
    main() 