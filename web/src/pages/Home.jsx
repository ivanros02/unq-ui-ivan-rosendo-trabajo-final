import { useState } from 'react'
import { useGame } from '../hook/useGame'
import DifficultyModal from '../components/DifficultyModal'
import '../styles/Home.css'

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDifficulty, setSelectedDifficulty] = useState(null)
    const { startGame, loading } = useGame()

    const handlePlay = async () => {
        const success = await startGame(selectedDifficulty)
        if (!success && !selectedDifficulty) {
            setIsModalOpen(true)
        }
    }

    const handleDifficultySelect = async (difficulty) => {
        setSelectedDifficulty(difficulty)
        setIsModalOpen(false)
        await startGame(difficulty)
    }

    return (
        <div className="home-container">
            <main className="vh-100 d-flex flex-column justify-content-center align-items-center p-4 position-relative">
                <img src="/logo.png" alt="Logo" className="home__logo mb-4" />

                <div className="text-center">
                    <h1 className="display-3 fw-bold mb-2 home__title">WORDLE UNQ</h1>
                    <p className="fs-5">Guess the word in 6 attempts</p>
                </div>

                {selectedDifficulty && (
                    <div className="mb-3">
                        <span className="rounded-pill">
                            Difficulty: {selectedDifficulty.name}
                        </span>
                    </div>
                )}

                <div className="d-flex flex-column gap-3 home__buttons">
                    <button
                        className="btn btn-lg btn-custom-primary position-relative"
                        onClick={handlePlay}
                        disabled={loading}
                    >
                        {loading && (
                            <span className="spinner-border spinner-border-sm me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </span>
                        )}
                        {loading ? 'Creating session...' : 'Play'}
                    </button>
                </div>
            </main>

            <DifficultyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleDifficultySelect}
            />
        </div>
    )
}