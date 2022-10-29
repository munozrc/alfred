import { useRef, useState } from 'react'
import styles from './App.module.css'

export default function App () {
  const inputRef = useRef(null)
  const [currentText, setCurrentText] = useState('')
  const [commandsHistory, setCommandHistory] = useState([])

  function handleSubmit (event) {
    event.preventDefault()

    if (currentText === '') return
    setCommandHistory(prev => prev.concat(currentText.trim()))
    setCurrentText('')
    console.log(`Input >> ${currentText}`)
  }

  return (
    <main onClick={() => inputRef.current.focus()}>
      <div>
        {commandsHistory.map((command, index) => (
          <div className={styles.inputWrapper} key={`command-${index}`}>
            <strong className={styles.prompt}>&gt;</strong>
            <span className={styles.input}>
              {command}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.inputWrapper}>
        <strong className={styles.prompt}>Alfred&gt;</strong>
        <span className={styles.input}>
          {currentText.replaceAll(' ', '\u00a0')}
        </span>
        <span className={styles.caret}/>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          className={styles.inputElement}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          value={currentText}
          onChange={(event) => setCurrentText(event.target.value)}
        />
      </form>
    </main>
  )
}
