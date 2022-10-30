import { useState } from 'react'

import styles from './styles.module.css'

function CommandLine ({ currentText = '' }) {
  return (
    <div className={styles.inputWrapper}>
      <strong className={styles.prompt}>Alfred&gt;</strong>
      <span className={styles.input}>
        {currentText.replaceAll(' ', '\u00a0')}
      </span>
      <span className={styles.caret}/>
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
    <form onSubmit={handleSubmit}>
      <CommandLine currentText={inputText}/>
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
