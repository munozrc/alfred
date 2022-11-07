import styles from './styles.module.css'

export default function CommandLine ({ hide = false, text = '', hideCaret = false, initPosCaret = 0 }) {
  return (
    <div className={hide ? styles.commandLineHidden : styles.commandLine}>
      <strong className={styles.prompt}>{hideCaret ? '>>' : 'Alfred>'}</strong>
      <div className={styles.text}>
        <span className={styles.prevWhiteSpace}>{text.substring(0, initPosCaret)}</span>
        <span className={hideCaret ? styles.caretHidden : styles.caret}/>
        <span className={styles.prevWhiteSpace}>{text.substring(initPosCaret, text.length)}</span>
      </div>
    </div>
  )
}
