import { useState, useMemo } from 'react'
import { checkWord } from '../services/gameService'

export const useGamePlay = () => {
    const [attempts, setAttempts] = useState([])
    const [currentAttempt, setCurrentAttempt] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const gameState = useMemo(() => {
        const lastAttempt = attempts[currentAttempt - 1]
        const isWon = lastAttempt?.every(letter => letter.solution === 'correct')
        const isOver = currentAttempt >= 6 || isWon

        return { isWon, isOver }
    }, [attempts, currentAttempt])

    const submitWord = async (sessionId, word) => {
        setLoading(true)
        setError('')

        try {
            const result = await checkWord(sessionId, word)
            setAttempts(prev => {
                const newAttempts = [...prev]
                newAttempts[currentAttempt] = result
                return newAttempts
            })
            setCurrentAttempt(prev => prev + 1)
            return true
        } catch (error) {
            setError(error.response?.status === 400 ? 'Palabra no encontrada' : 'Palabra no encontrada')
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        attempts,
        currentAttempt,
        loading,
        error,
        gameState,
        submitWord
    }
}