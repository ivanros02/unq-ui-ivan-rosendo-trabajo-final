import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useGamePlay } from '../hook/useGamePlay'
import GameGrid from '../components/game/GameGrid'
import GameInput from '../components/game/GameInput'
import GameStatus from '../components/game/GameStatus'

export default function Game() {
    const location = useLocation()
    const navigate = useNavigate()
    const { gameSession } = location.state || {}

    const {
        attempts,
        currentAttempt,
        loading,
        error,
        gameState,
        submitWord
    } = useGamePlay()

    useEffect(() => {
        if (!gameSession) {
            navigate('/', { replace: true })
        }
    }, [gameSession, navigate])

    const handleWordSubmit = (word) => {
        submitWord(gameSession.sessionId, word)
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
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}