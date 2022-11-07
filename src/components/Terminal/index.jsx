import { useContext, useRef } from 'react'
import { TerminalContext } from '../../contexts/TerminalContext'
import CommandLine from '../CommandLine'
import StandardInput from '../StandardInput'

import { normalizeCommandArgs } from '../../utils'
import commands from '../../commands'

import styles from './styles.module.css'

export default function Terminal () {
  const { bufferedContent, setBufferedContent, appendCommandToHistory } = useContext(TerminalContext)
  const inputElement = useRef(null)

  async function processCommand (text) {
    const [command, ...commandArguments] = text.trim().split(' ')
    let output = null

    if (command === 'clear') {
      setBufferedContent(() => null)
      return
    }

    appendCommandToHistory(text)
    setBufferedContent((prev) => (
      <>
        {prev}
        <CommandLine text={text} hideCaret />
      </>
    ))

    const executor = commands[command] || commands.notfound
    const args = normalizeCommandArgs(commandArguments)
    output = await executor(args)

    setBufferedContent((prev) => (
      <>
        {prev}
        {output}
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
