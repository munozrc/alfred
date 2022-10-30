import { useState } from 'react'

import styles from './styles.module.css'

export default function StandardInput ({ inputRef: inputElement }) {
  const [inputText, setInputText] = useState('')
  const [processCurrentLine] = useState(false)

  function handleSubmit (event) {
    event.preventDefault()
    if (processCurrentLine) return
    console.log({ inputText })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={processCurrentLine ? styles.commandLineHidden : styles.commandLine}>
        <strong className={styles.prompt}>Alfred&gt;</strong>
        <div className={styles.text}>
          <span className={styles.prevWhiteSpace}>{inputText.replaceAll(' ', '\u00a0')}</span>
          <span className={styles.caret}/>
        </div>
      </div>
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
