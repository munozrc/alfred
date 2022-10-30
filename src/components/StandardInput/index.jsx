import { useState } from 'react'
import CommandLine from '../CommandLine'

import styles from './styles.module.css'

export default function StandardInput ({ inputRef: inputElement, handleProcessCommand }) {
  const [inputText, setInputText] = useState('')
  const [processCurrentLine, setProcessCurrentLine] = useState(false)

  async function handleSubmit (event) {
    event.preventDefault()

    if (processCurrentLine && inputText === '') return
    setProcessCurrentLine(true)
    await handleProcessCommand(inputText)
    setProcessCurrentLine(false)
    setInputText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <CommandLine hide={processCurrentLine} text={inputText.replaceAll(' ', '\u00a0')}/>
      <input
        type="text"
        ref={inputElement}
        className={styles.inputElement}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </form>
  )
}
