const fs = require('fs')
const path = require('path')

// Leer el CSV
const csvPath = path.join(__dirname, '..', 'postalcat.csv')
const content = fs.readFileSync(csvPath, 'utf-8')
const lines = content.split('\n')

// Agrupar por código postal
const postalData = new Map()

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim()
  if (!line) continue
  
  const parts = line.split(';')
  if (parts.length < 6) continue
  
  const cp = parts[1]
  const poblacion = parts[3]
  
  if (!cp || !/^\d{5}$/.test(cp)) continue
  
  // Solo guardar la primera población para cada CP
  if (!postalData.has(cp) && poblacion) {
    postalData.set(cp, poblacion)
  }
}

// Generar el archivo TypeScript
let output = `// Auto-generated from postalcat.csv - DO NOT EDIT MANUALLY
// Generated on ${new Date().toISOString()}

export const POSTAL_CODE_NAMES: Record<string, string> = {
`

// Ordenar por código postal
const sortedEntries = Array.from(postalData.entries()).sort((a, b) => a[0].localeCompare(b[0]))

for (const [cp, poblacion] of sortedEntries) {
  // Escapar comillas simples
  const cleanPoblacion = poblacion.replace(/'/g, "\\'")
  output += `  '${cp}': '${cleanPoblacion}',\n`
}

output += `}
`

// Escribir el archivo
const outputPath = path.join(__dirname, '..', 'lib', 'postal-code-names.ts')
fs.writeFileSync(outputPath, output, 'utf-8')

console.log(`Generated ${postalData.size} postal codes to ${outputPath}`)
