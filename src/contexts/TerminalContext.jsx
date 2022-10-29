import { createContext, useState } from 'react'

export const TerminalContext = createContext(null)

export default function TerminalProvider ({ children }) {
  const [bufferedContent, setBufferedContent] = useState('')
  const [commandsHistory, setCommandsHistory] = useState([])
  const [historyPointer, setHistoryPointer] = useState(null)

  return (
    <TerminalContext.Provider
      value={{
        bufferedContent,
        setBufferedContent,
        commandsHistory,
        setCommandsHistory,
        historyPointer,
        setHistoryPointer
      }}
    >
      {children}
    </TerminalContext.Provider>
  )
}
