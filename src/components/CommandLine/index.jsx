import styles from './styles.module.css'

export default function CommandLine ({ hide = false, text = '', hideCaret = false }) {
  return (
    <div className={hide ? styles.commandLineHidden : styles.commandLine}>
      <strong className={styles.prompt}>{hideCaret ? '>>' : 'Alfred>'}</strong>
      <div className={styles.text}>
        <span className={styles.prevWhiteSpace}>{text}</span>
        <span className={hideCaret ? styles.caretHidden : styles.caret}/>
      </div>
    </div>
  )
}
