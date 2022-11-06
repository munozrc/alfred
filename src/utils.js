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

export function getFixedPosOfLetter (position) {
  const maxPosOfMatrix = 4
  const nextPos = position + 1
  return nextPos > maxPosOfMatrix ? 0 : nextPos
}
