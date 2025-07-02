import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { API_ENDPOINTS } from '../utils/constants'
import GameGrid from '../components/game/GameGrid'
import GameInput from '../components/game/GameInput'
import GameStatus from '../components/game/GameStatus'

export default function Game() {
    const location = useLocation()
    const navigate = useNavigate()
    const { gameSession } = location.state || {}
    
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
    
    useEffect(() => {
        if (!gameSession) {
            navigate('/', { replace: true })
        }
    }, [gameSession, navigate])

    const handleWordSubmit = async (word) => {
        setLoading(true)
        setError('')
        
        try {
            const response = await axios.post(API_ENDPOINTS.checkWord, {
                sessionId: gameSession.sessionId,
                word: word.toLowerCase()
            })
            
            setAttempts(prev => {
                const newAttempts = [...prev]
                newAttempts[currentAttempt] = response.data
                return newAttempts
            })
            setCurrentAttempt(prev => prev + 1)
            
        } catch (error) {
            setError(error.response?.status === 400 ? 'Palabra no encontrada' : 'Palabra no encontrada')
        } finally {
            setLoading(false)
        }
    }

    if (!gameSession) {
        return <div>Redirigiendo...</div>
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="text-center mb-4">
                        <h2>Wordle - Difficulty : {gameSession.difficulty.name}</h2>
                        <p className="text-muted">Attempt {currentAttempt + 1} of 6</p>
                    </div>

                    <GameGrid 
                        attempts={attempts} 
                        wordLength={gameSession.wordLenght} 
                    />

                    {!gameState.isOver && (
                        <GameInput
                            onSubmit={handleWordSubmit}
                            wordLength={gameSession.wordLenght}
                            loading={loading}
                        />
                    )}

                    <GameStatus 
                        error={error}
                        gameState={gameState}
                        currentAttempt={currentAttempt}
                    />

                    <div className="text-center">
                        <button 
                            className="btn btn-outline-secondary" 
                            onClick={() => navigate('/')}
                        >
                            Back to home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}