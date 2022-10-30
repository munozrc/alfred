import { useRef } from 'react'
import DataEntry from '../DataEntry'

import styles from './styles.module.css'

export default function Terminal () {
  const inputElement = useRef(null)
  return (
    <main
      className={styles.wrapper}
      onClick={() => inputElement.current.focus()}
    >
      <DataEntry inputRef={inputElement}/>
    </main>
  )
}
