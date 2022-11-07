import { useContext, useEffect, useState } from 'react'
import { TerminalContext } from '../../contexts/TerminalContext'
import CommandLine from '../CommandLine'

import styles from './styles.module.css'

export default function StandardInput ({ inputRef: inputElement, handleProcessCommand }) {
  const { getPreviousCommand, getNextCommand } = useContext(TerminalContext)
  const [processCurrentLine, setProcessCurrentLine] = useState(false)
  const [inputText, setInputText] = useState('')
  const [posCaret, setPosCaret] = useState(0)

  async function handleSubmit (event) {
    event.preventDefault()

    if (processCurrentLine && inputText === '') return
    setProcessCurrentLine(true)
    await handleProcessCommand(inputText)
    setProcessCurrentLine(false)
    setInputText('')
  }

  function handleKeyDownEvent ({ key: eventKey }) {
    if (processCurrentLine) return
    if (eventKey === 'ArrowUp') setInputText(getPreviousCommand())
    else if (eventKey === 'ArrowDown') setInputText(getNextCommand())
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEvent)
    return () => document.removeEventListener('keydown', handleKeyDownEvent)
  })

  return (
    <form onSubmit={handleSubmit}>
      <CommandLine
        hide={processCurrentLine}
        text={inputText.replaceAll(' ', '\u00a0')}
        initPosCaret={posCaret}
      />
      <input
        type="text"
        ref={inputElement}
        className={styles.inputElement}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        onSelect={(event) => setPosCaret(event.target.selectionStart)}
      />
    </form>
  )
}
