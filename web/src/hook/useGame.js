import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGameSession, getDifficulties } from '../services/gameService'

export const useGame = () => {
    const [loading, setLoading] = useState(false)
    const [difficulties, setDifficulties] = useState([])
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const fetchDifficulties = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getDifficulties()
            setDifficulties(data)
        } catch (err) {
            setError('Error al cargar dificultades')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const startGame = async (difficulty) => {
        if (!difficulty) return false

        setLoading(true)
        try {
            const gameSession = await createGameSession(difficulty.id)
            navigate('/game', { state: { gameSession } })
            return true
        } catch (error) {
            console.error('Error creating session:', error)
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        startGame,
        fetchDifficulties,
        loading,
        difficulties,
        error
    }
}