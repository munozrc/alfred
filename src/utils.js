export function normalizeCommandArgs (args) {
  const argsAsText = args.join(' ')
  const textWithQuotes = argsAsText.split('"')[1] || argsAsText.split("'")[1]
  const containsQuotes = typeof textWithQuotes !== 'undefined'

  if (containsQuotes) {
    const removePattern = textWithQuotes.charAt(0) === '"' ? `"${textWithQuotes}"` : `'${textWithQuotes}'`
    const removeTextWithQuote = argsAsText.replace(removePattern, '')
    const arrayArgs = removeTextWithQuote.split(' ').filter(arg => arg !== '')
    return [...arrayArgs, textWithQuotes]
  }

  return args
}
