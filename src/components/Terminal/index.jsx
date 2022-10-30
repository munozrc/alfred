import { useRef } from 'react'
import StandardInput from '../StandardInput'

import styles from './styles.module.css'

export default function Terminal () {
  const inputElement = useRef(null)
  return (
    <main
      className={styles.wrapper}
      onClick={() => inputElement.current.focus()}
    >
      <StandardInput inputRef={inputElement}/>
    </main>
  )
}
