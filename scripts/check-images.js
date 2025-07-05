const fs = require('fs')
const path = require('path')

const publicDir = path.join(process.cwd(), 'public')
const requiredImages = [
  'caixa-3-perfumes-home.png',
  'caixa-5-perfumes-home.png', 
  'caixa-10-perfumes-home.png',
  'caixa-perfumes-no-estoque-2.png',
  'caixa-perfumes-no-estoque.png',
  'bleu-chanel.jpg',
  'good-girl-carolina.jpeg',
  'sauvage.png',
  'tom-ford-black.png',
  'temu-logo.png'
]

console.log('🔍 Verificando imagens na pasta public...\n')

let allImagesExist = true

requiredImages.forEach(image => {
  const imagePath = path.join(publicDir, image)
  const exists = fs.existsSync(imagePath)
  
  if (exists) {
    const stats = fs.statSync(imagePath)
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2)
    console.log(`✅ ${image} - ${sizeInMB}MB`)
  } else {
    console.log(`❌ ${image} - NÃO ENCONTRADA`)
    allImagesExist = false
  }
})

console.log('\n' + '='.repeat(50))

if (allImagesExist) {
  console.log('🎉 Todas as imagens estão presentes!')
} else {
  console.log('⚠️  Algumas imagens estão faltando!')
  process.exit(1)
}

console.log('\n📁 Conteúdo completo da pasta public:')
const files = fs.readdirSync(publicDir)
files.forEach(file => {
  const filePath = path.join(publicDir, file)
  const stats = fs.statSync(filePath)
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2)
  console.log(`   ${file} - ${sizeInMB}MB`)
}) 