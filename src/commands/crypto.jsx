function simpleTranspositionCipher (letters = []) {
  let even = ''
  let odd = ''

  letters.forEach((letter, index) => {
    if (index % 2 === 0) even += letter
    else odd += letter
  })

  return (
    <div>
      <strong>Cifrado por transpolación simple</strong>
      <p><strong>Total de letras: </strong>{letters.length}</p>
      <p><strong>Resultado: </strong>{even + odd}</p>
    </div>
  )
}

function simpleTranspositionDecipher (letters = []) {
  const mediumLength = (letters.length / 2) + 1
  const oddLetters = letters.slice(0, mediumLength).join('')
  const evenLetters = letters.slice(mediumLength, letters.length).join('')

  let result = ''

  for (let pos = 0; pos < mediumLength; pos++) {
    const oddLetter = oddLetters[pos] || ''
    const evenLetter = evenLetters[pos] || ''
    result += (oddLetter + evenLetter)
  }

  return (
    <div>
      <strong>Descifrado usando transpolación simple</strong>
      <p><strong>Total de letras: </strong>{letters.length}</p>
      <p><strong>Resultado: </strong>{result}</p>
    </div>
  )
}

export default function crypto (allArgs = []) {
  const letters = allArgs[allArgs.length - 1]
  const arrayLetter = letters?.replaceAll(' ', '').split('')

  if (allArgs.includes('-dts')) return simpleTranspositionDecipher(arrayLetter)
  if (allArgs.includes('-ts')) return simpleTranspositionCipher(arrayLetter)

  return (
    <div>
      <strong>{'Uso: crypto [OPERACION] [VALOR]'}</strong>
      <p><strong>{'OPERACIONES DISPONIBLES'}</strong></p>
      <p><strong>{'-ts  '}</strong>Cifrado por transpolación simple</p>
      <p><strong>{'-dts '}</strong>Descifrado usando transpolación simple</p>
    </div>
  )
}
