import { getMatrizOfLettersWithKey, getPairOfLetters, getTextPlayFair } from '../utils'

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

function playFairCipher (letters = [], keyArg = '') {
  if (keyArg === '') return (<div><strong>La palabra clave</strong></div>)

  const matrizOfLetters = getMatrizOfLettersWithKey(keyArg)
  const pairOfLetters = getPairOfLetters(letters)

  const getNextPosLetter = (pos) => {
    const maxPosOfMatrix = 4
    const nextPos = pos + 1
    return nextPos > maxPosOfMatrix ? 0 : nextPos
  }

  const result = getTextPlayFair(pairOfLetters, matrizOfLetters, getNextPosLetter)

  return (
    <div>
      <strong>Cifrado usando PlayFair</strong>
      <p><strong>Clave: </strong>{keyArg}</p>
      <p><strong>Matriz con clave: </strong>{matrizOfLetters.join(', ')}</p>
      <p><strong>Letras: </strong>{pairOfLetters.join(', ')}</p>
      <p><strong>Resultado: </strong>{result.join('')}</p>
    </div>
  )
}

function playFairDecipher (letters = [], keyArg = '') { // crypto -dpf HBTIDBHKMO key=DIAMOND
  if (keyArg === '') return (<div><strong>La palabra clave</strong></div>)

  const matrizOfLetters = getMatrizOfLettersWithKey(keyArg)
  const pairOfLetters = getPairOfLetters(letters)

  const getBeforePosLetter = (pos) => {
    const minPosOfMatrix = 0
    const beforePos = pos - 1
    return beforePos < minPosOfMatrix ? 4 : beforePos
  }

  const result = getTextPlayFair(pairOfLetters, matrizOfLetters, getBeforePosLetter)

  return (
    <div>
      <strong>Decifrado usando PlayFair</strong>
      <p><strong>Clave: </strong>{keyArg}</p>
      <p><strong>Matriz con clave: </strong>{matrizOfLetters.join(', ')}</p>
      <p><strong>Letras: </strong>{pairOfLetters.join(', ')}</p>
      <p><strong>Resultado: </strong>{result.join('')}</p>
    </div>
  )
}

export default function crypto (allArgs = []) {
  const arrayLetters = allArgs[1]?.replaceAll(' ', '').split('')

  if (allArgs.includes('-dts')) return simpleTranspositionDecipher(arrayLetters)
  if (allArgs.includes('-ts')) return simpleTranspositionCipher(arrayLetters)
  if (allArgs.includes('-pf')) return playFairCipher(arrayLetters, allArgs[2].replace('key=', ''))
  if (allArgs.includes('-dpf')) return playFairDecipher(arrayLetters, allArgs[2].replace('key=', ''))

  return (
    <div>
      <strong>{'Uso: crypto [OPERACION] [VALOR]'}</strong>
      <p><strong>{'OPERACIONES DISPONIBLES'}</strong></p>
      <p><strong>{'-ts  '}</strong>Cifrado por transpolación simple</p>
      <p><strong>{'-dts '}</strong>Descifrado usando transpolación simple</p>
    </div>
  )
}
