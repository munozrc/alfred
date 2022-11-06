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

function getRule (matrix = [], pairLetter = '') {
  const m1 = pairLetter.charAt(0)
  const m2 = pairLetter.charAt(1)

  const posM1 = {}
  const posM2 = {}

  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      const letter = matrix[row * 5 + column]

      if (letter === 'I/J') {
        if (m1 === 'I' || m1 === 'J') {
          posM1.row = row
          posM1.column = column
        }

        if (m2 === 'I' || m2 === 'J') {
          posM2.row = row
          posM2.column = column
        }
      } else {
        if (letter === m1) {
          posM1.row = row
          posM1.column = column
        }

        if (letter === m2) {
          posM2.row = row
          posM2.column = column
        }
      }
    }
  }

  const matrixWide = (value) => value + 1 > 4 ? 0 : value + 1

  if (posM1.row === posM2.row) {
    return matrix[posM1.row * 5 + matrixWide(posM1.column)] + matrix[posM2.row * 5 + matrixWide(posM2.column)]
  } else if (posM1.column === posM2.column) {
    return matrix[matrixWide(posM1.row) * 5 + posM1.column] + matrix[matrixWide(posM2.row) * 5 + posM2.column]
  } else {
    const dialogal = posM2.column - posM1.column
    return matrix[posM1.row * 5 + (posM1.column + dialogal)] + matrix[posM2.row * 5 + (posM2.column - dialogal)]
  }
}

function playFairCipher (letters = [], keyArg = '') {
  if (keyArg === '') return (<div><strong>La palabra clave</strong></div>)

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I/J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const key = keyArg.toUpperCase().split('')
  const normalizeKey = key.map(char => char === 'I' || char === 'J' ? 'I/J' : char)
  const matrix = Array.from(new Set([...normalizeKey, ...alphabet]))

  const chucksLetters = []

  for (let pos = 0; pos < letters.length; pos += 2) {
    const currentLetter = letters[pos].toUpperCase()
    const nextLetter = letters[pos + 1] ?? 'X'
    chucksLetters.push(currentLetter + nextLetter.toUpperCase())
  }

  const result = []

  for (let i = 0; i < chucksLetters.length; i++) {
    const letter = getRule(Array.from(matrix), chucksLetters[i])
    result.push(letter)
  }

  return (
    <div>
      <strong>Cifrado usando PlayFair</strong>
      <p><strong>Clave: </strong>{keyArg}</p>
      <p><strong>Matriz con clave: </strong>{matrix.join(', ')}</p>
      <p><strong>Letras: </strong>{chucksLetters.join(', ')}</p>
      <p><strong>Resultado: </strong>{result.join(', ')}</p>
    </div>
  )
}

export default function crypto (allArgs = []) {
  const arrayLetters = allArgs[1]?.replaceAll(' ', '').split('')

  console.log({ allArgs })

  if (allArgs.includes('-dts')) return simpleTranspositionDecipher(arrayLetters)
  if (allArgs.includes('-ts')) return simpleTranspositionCipher(arrayLetters)
  if (allArgs.includes('-pf')) return playFairCipher(arrayLetters, allArgs[2].replace('key=', ''))

  return (
    <div>
      <strong>{'Uso: crypto [OPERACION] [VALOR]'}</strong>
      <p><strong>{'OPERACIONES DISPONIBLES'}</strong></p>
      <p><strong>{'-ts  '}</strong>Cifrado por transpolación simple</p>
      <p><strong>{'-dts '}</strong>Descifrado usando transpolación simple</p>
    </div>
  )
}
