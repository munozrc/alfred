import { useContext, useRef } from 'react'
import { TerminalContext } from '../../contexts/TerminalContext'
import CommandLine from '../CommandLine'
import StandardInput from '../StandardInput'

import commands from '../../commands'

import styles from './styles.module.css'

export default function Terminal () {
  const { bufferedContent, setBufferedContent } = useContext(TerminalContext)
  const inputElement = useRef(null)

  async function processCommand (text) {
    console.log({ command: text })

    const [command, commandArguments] = text.trim().split(' ')
    let output = null

    if (command === 'clear') {
      setBufferedContent(() => null)
      return
    }

    setBufferedContent((prev) => (
      <>
        {prev}
        <CommandLine text={command} hideCaret />
      </>
    ))

    const executor = commands[command] || commands.notfound
    output = await executor(commandArguments)

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
