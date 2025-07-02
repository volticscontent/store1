#!/usr/bin/env python3
"""
Script para fazer scraping das imagens do site do Oklahoma City Thunder
e salvar localmente para uso no projeto Vue.
"""

import requests
import os
from urllib.parse import urlparse, urljoin
import re
from pathlib import Path
import time

class ThunderImageScraper:
    def __init__(self, base_url="https://nbathundershop.com", output_dir="public/images"):
        self.base_url = base_url
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    
    def download_image(self, url, filename=None):
        """
        Baixa uma imagem da URL fornecida e salva no diretório de saída.
        
        Args:
            url (str): URL da imagem
            filename (str, optional): Nome do arquivo. Se None, usa o nome da URL.
        
        Returns:
            str: Caminho do arquivo salvo ou None se falhou
        """
        try:
            # Se a URL não for completa, fazer join com base_url
            if not url.startswith('http'):
                url = urljoin(self.base_url, url)
            
            # Determinar nome do arquivo
            if not filename:
                parsed_url = urlparse(url)
                filename = os.path.basename(parsed_url.path)
                
                # Se não há extensão, tentar extrair dos parâmetros
                if '.' not in filename:
                    filename += '.jpg'
            
            # Caminho completo do arquivo
            filepath = self.output_dir / filename
            
            # Verificar se já existe
            if filepath.exists():
                print(f"Arquivo já existe: {filepath}")
                return str(filepath)
            
            # Fazer download
            print(f"Baixando: {url}")
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            # Salvar arquivo
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            print(f"Salvo: {filepath}")
            return str(filepath)
            
        except Exception as e:
            print(f"Erro ao baixar {url}: {str(e)}")
            return None
    
    def scrape_product_images(self, product_urls):
        """
        Faz scraping das imagens de produtos específicos.
        
        Args:
            product_urls (list): Lista de URLs de produtos
        """
        downloaded_images = []
        
        for product_url in product_urls:
            try:
                print(f"\nProcessando produto: {product_url}")
                
                # Fazer request para a página do produto
                response = self.session.get(product_url, timeout=30)
                response.raise_for_status()
                
                # Encontrar todas as imagens do produto
                img_pattern = r'https://nbathundershop\.com/cdn/shop/files/[^"\']*\.(jpg|png|jpeg|webp)'
                img_urls = re.findall(img_pattern, response.text)
                
                # Remover duplicatas
                unique_urls = list(set([url[0] for url in img_urls]))
                
                for img_url in unique_urls:
                    downloaded_file = self.download_image(img_url)
                    if downloaded_file:
                        downloaded_images.append(downloaded_file)
                    
                    # Delay para não sobrecarregar o servidor
                    time.sleep(0.5)
                    
            except Exception as e:
                print(f"Erro ao processar produto {product_url}: {str(e)}")
        
        return downloaded_images
    
    def scrape_jersey_images(self):
        """
        Faz scraping específico das imagens de camisas do Thunder.
        """
        # URLs conhecidas das imagens de camisas
        jersey_images = [
            "https://nbathundershop.com/cdn/shop/files/custom_icon_front.png?v=1748979006",
            "https://nbathundershop.com/cdn/shop/files/custom_icon_back.png?v=1728590848",
            "https://nbathundershop.com/cdn/shop/files/custom_icon_front_600x.png?v=1748979006",
            "https://nbathundershop.com/cdn/shop/files/custom_icon_back_600x.png?v=1728590848",
            "https://nbathundershop.com/cdn/shop/files/custom_icon_front_70x70.png?v=1748979006",
            "https://nbathundershop.com/cdn/shop/files/custom_icon_back_70x70.png?v=1728590848",
            "https://nbathundershop.com/cdn/shop/files/OKCThunder_PrimaryIcon_blue.png?v=1744653941",
            # Nova imagem da camisa do Shai Gilgeous-Alexander
            "https://nbathundershop.com/cdn/shop/products/SGA_N_N_tee_back_1000x1000.jpg?v=1581034454"
        ]
        
        downloaded_images = []
        
        for i, img_url in enumerate(jersey_images):
            # Criar nome de arquivo mais descritivo
            if "front" in img_url:
                filename = f"jersey_front_{i+1}.png"
            elif "back" in img_url:
                filename = f"jersey_back_{i+1}.png"
            elif "PrimaryIcon" in img_url:
                filename = "thunder_logo.png"
            elif "SGA_N_N_tee_back" in img_url:
                filename = "sga_name_number_tee_back.jpg"
            else:
                filename = f"jersey_image_{i+1}.png"
            
            downloaded_file = self.download_image(img_url, filename)
            if downloaded_file:
                downloaded_images.append(downloaded_file)
            
            # Delay para não sobrecarregar o servidor
            time.sleep(0.5)
        
        return downloaded_images
    
    def create_image_manifest(self, downloaded_images):
        """
        Cria um arquivo JSON com as informações das imagens baixadas.
        """
        manifest = {
            "images": [],
            "download_date": time.strftime("%Y-%m-%d %H:%M:%S"),
            "total_images": len(downloaded_images)
        }
        
        for img_path in downloaded_images:
            img_name = os.path.basename(img_path)
            manifest["images"].append({
                "filename": img_name,
                "path": img_path,
                "url": f"/images/{img_name}"
            })
        
        # Salvar manifest
        manifest_path = self.output_dir / "manifest.json"
        import json
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)
        
        print(f"\nManifesto criado: {manifest_path}")
        return manifest

def main():
    """Função principal do script."""
    print("=== Thunder Image Scraper ===\n")
    
    # Inicializar scraper
    scraper = ThunderImageScraper()
    
    # Fazer scraping das imagens de camisas
    print("Baixando imagens de camisas...")
    jersey_images = scraper.scrape_jersey_images()
    
    # Criar manifest
    manifest = scraper.create_image_manifest(jersey_images)
    
    print(f"\n=== Scraping Concluído ===")
    print(f"Total de imagens baixadas: {len(jersey_images)}")
    print(f"Imagens salvas em: {scraper.output_dir}")
    
    # Mostrar lista de imagens baixadas
    if jersey_images:
        print("\nImagens baixadas:")
        for img in jersey_images:
            print(f"  - {os.path.basename(img)}")

if __name__ == "__main__":
    main() 