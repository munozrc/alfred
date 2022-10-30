import { useState } from 'react'

import styles from './styles.module.css'

function CommandLine ({ text = '' }) {
  return (
    <div className={styles.commandLine}>
      <strong className={styles.prompt}>Alfred&gt;</strong>
      <div className={styles.text}>
        <span className={styles.prevWhiteSpace}>{text}</span>
        <span className={styles.caret}/>
      </div>
    </div>
  )
}

export default function DataEntry ({ inputRef: inputElement }) {
  const [inputText, setInputText] = useState('')

  function handleSubmit (event) {
    event.preventDefault()
    console.log({ inputText })
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <CommandLine text={inputText.replaceAll(' ', '\u00a0')}/>
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
