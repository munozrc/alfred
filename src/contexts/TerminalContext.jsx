import { createContext, useEffect, useState } from 'react'

export const TerminalContext = createContext(null)

export default function TerminalProvider ({ children }) {
  const [bufferedContent, setBufferedContent] = useState('')
  const [commandsHistory, setCommandsHistory] = useState([])
  const [historyPointer, setHistoryPointer] = useState(null)

  useEffect(() => {
    setHistoryPointer(commandsHistory.length)
  }, [commandsHistory])

  const appendCommandToHistory = (command) => {
    if (!command) return
    setCommandsHistory(prev => prev.concat(command))
  }

  const getPreviousCommand = () => {
    if (commandsHistory.length === 0) return ''

    const prevHistoryPointer = historyPointer - 1
    const posIsInvalid = prevHistoryPointer >= 0

    if (posIsInvalid) {
      setHistoryPointer(() => prevHistoryPointer)
      return commandsHistory[prevHistoryPointer]
    }

    return commandsHistory[historyPointer]
  }

  const getNextCommand = () => {
    if (commandsHistory.length === 0) return ''

    const nextHistoryPointer = historyPointer + 1
    const posIsInvalid = nextHistoryPointer < commandsHistory.length

    if (posIsInvalid) {
      setHistoryPointer(() => nextHistoryPointer)
      return commandsHistory[nextHistoryPointer]
    }

    setHistoryPointer(() => commandsHistory.length)
    return ''
  }

  return (
    <TerminalContext.Provider
      value={{
        bufferedContent,
        setBufferedContent,
        appendCommandToHistory,
        getPreviousCommand,
        getNextCommand
      }}
    >
      {children}
    </TerminalContext.Provider>
  )
}
