import sharp from 'sharp'
import { stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const images = [
  ['src/assets/foto_perfil.jpg', 'src/assets/foto_perfil.webp', 700],
  ['src/assets/projetos/apple.png', 'src/assets/projetos/apple.webp', 1200],
  ['src/assets/projetos/amazon.png', 'src/assets/projetos/amazon.webp', 900],
  ['src/assets/projetos/kritic.png', 'src/assets/projetos/kritic.webp', 1200],
  ['src/assets/projetos/lojaspa.png', 'src/assets/projetos/lojaspa.webp', 1000],
  ['src/assets/projetos/reactstock.jpg', 'src/assets/projetos/reactstock.webp', 1000],
  ['src/assets/pw1.png', 'src/assets/pw1.webp', 1200],
  ['src/assets/pw2.png', 'src/assets/pw2.webp', 1200],
  ['src/assets/pw3.png', 'src/assets/pw3.webp', 1200]
]
let originalTotal = 0
let optimizedTotal = 0
for (const [source, destination, width] of images) {
  const input = fileURLToPath(new URL('../' + source, import.meta.url))
  const output = fileURLToPath(new URL('../' + destination, import.meta.url))
  await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(output)
  const original = (await stat(input)).size
  const optimized = (await stat(output)).size
  originalTotal += original
  optimizedTotal += optimized
  console.log(destination + ': ' + Math.round(optimized / 1024) + ' KB')
}
console.log('Total: ' + (originalTotal / 1024 / 1024).toFixed(2) + ' MB → ' +
  (optimizedTotal / 1024 / 1024).toFixed(2) + ' MB (' + Math.round((1 - optimizedTotal / originalTotal) * 100) + '% smaller)')
