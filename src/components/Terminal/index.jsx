import { useContext, useRef } from 'react'
import { TerminalContext } from '../../contexts/TerminalContext'
import CommandLine from '../CommandLine'
import StandardInput from '../StandardInput'

import styles from './styles.module.css'

export default function Terminal () {
  const { bufferedContent, setBufferedContent } = useContext(TerminalContext)
  const inputElement = useRef(null)

  function processCommand (text) {
    console.log({ command: text })
    setBufferedContent(() => (
      <>
        {bufferedContent}
        <CommandLine text={text} hideCaret />
        <span>Comando no encontrado {text}</span>
      </>
    ))
  }

  return (
    <main
      className={styles.wrapper}
      onClick={() => inputElement.current.focus()}
    >
      {bufferedContent}
      <StandardInput
        inputRef={inputElement}
        handleProcessCommand={processCommand}
      />
    </main>
  )
}
