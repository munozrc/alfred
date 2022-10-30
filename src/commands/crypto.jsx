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

export default function crypto (allArgs) {
  const letters = allArgs[allArgs.length - 1]
  const arrayLetter = letters.replaceAll(' ', '').split('')
  console.log({ arrayLetter })
  return simpleTranspositionCipher(arrayLetter)
}
