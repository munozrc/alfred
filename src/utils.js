const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '(I/J)', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export function normalizeCommandArgs (args) {
  const argsAsText = args.join(' ')
  const textWithQuotes = argsAsText.split('"')[1] || argsAsText.split("'")[1]
  const containsQuotes = typeof textWithQuotes !== 'undefined'

  if (containsQuotes) {
    const removePattern = textWithQuotes.charAt(0) !== '"' ? `"${textWithQuotes}"` : `'${textWithQuotes}'`
    const removeTextWithQuote = argsAsText.replaceAll(removePattern, '')
    const arrayArgs = removeTextWithQuote.split(' ').filter(arg => arg !== '')
    return [...arrayArgs, textWithQuotes]
  }

  return args
}

export function getMatrizOfLettersWithKey (keyArg = '') {
  const key = keyArg.toUpperCase().split('')
  const normalizeKey = key.map(letter => letter === 'I' || letter === 'J' ? '(I/J)' : letter)
  const array = Array.from(new Set([...normalizeKey, ...alphabet]))
  return array
}

export function getPairOfLetters (letters = '') {
  const array = []
  for (let pos = 0; pos < letters.length; pos += 2) {
    const currentLetter = letters[pos].toUpperCase()
    const nextLetter = letters[pos + 1] ?? 'X'
    array.push(currentLetter + nextLetter.toUpperCase())
  }
  return array
}

export function getTextPlayFair (pairOfLetters = [], matrizOfLetters = [], getPosOfLetter = () => {}) {
  const result = []

  for (let i = 0; i < pairOfLetters.length; i++) {
    const firstLetter = pairOfLetters[i].charAt(0)
    const secondLetter = pairOfLetters[i].charAt(1)

    let posFirstLetter = {}
    let posSecondLetter = {}
    let posFirstEncryptedLetter = {}
    let posSecondEncryptedLetter = {}

    for (let row = 0; row < 5; row++) {
      for (let column = 0; column < 5; column++) {
        const letter = matrizOfLetters[row * 5 + column]
        const isCompoundLetter = letter === '(I/J)'

        if (isCompoundLetter && (firstLetter === 'I' || firstLetter === 'J')) {
          posFirstLetter = { row, column }
          continue
        }

        if (isCompoundLetter && (secondLetter === 'I' || secondLetter === 'J')) {
          posSecondLetter = { row, column }
          continue
        }

        if (letter === firstLetter) posFirstLetter = { row, column }
        if (letter === secondLetter) posSecondLetter = { row, column }
      }
    }

    posFirstEncryptedLetter = { row: posFirstLetter.row, column: posFirstLetter.column }
    posSecondEncryptedLetter = { row: posSecondLetter.row, column: posSecondLetter.column }

    if (posFirstLetter.row === posSecondLetter.row) {
      posFirstEncryptedLetter.column = getPosOfLetter(posFirstLetter.column)
      posSecondEncryptedLetter.column = getPosOfLetter(posSecondLetter.column)
    } else if (posFirstLetter.column === posSecondLetter.column) {
      posFirstEncryptedLetter.row = getPosOfLetter(posFirstLetter.row)
      posSecondEncryptedLetter.row = getPosOfLetter(posSecondLetter.row)
    } else {
      const calcOppositePos = posSecondLetter.column - posFirstLetter.column
      posFirstEncryptedLetter.column = posFirstLetter.column + calcOppositePos
      posSecondEncryptedLetter.column = posSecondLetter.column - calcOppositePos
    }

    const firstEncryptedLetter = matrizOfLetters[posFirstEncryptedLetter.row * 5 + posFirstEncryptedLetter.column]
    const secondEncryptedLetter = matrizOfLetters[posSecondEncryptedLetter.row * 5 + posSecondEncryptedLetter.column]

    result.push(firstEncryptedLetter + secondEncryptedLetter)
  }

  return result
}
