import { useRef, useState } from 'react'
import styles from './App.module.css'

export default function App () {
  const inputRef = useRef(null)
  const [currentText, setCurrentText] = useState('')

  return (
    <main onClick={() => inputRef.current.focus()}>
      <form className={styles.inputWrapper}>
        <strong className={styles.prompt}>Alfred&gt;</strong>
        <span className={styles.input}>
          {currentText}
        </span>
      </form>
      <input
        type="text"
        ref={inputRef}
        className={styles.inputElement}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        onChange={(event) => setCurrentText(event.target.value)}
      />
    </main>
  )
}
