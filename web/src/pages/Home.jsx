import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_ENDPOINTS } from '../utils/constants'
import DifficultyModal from '../components/DifficultyModal'
import '../styles/Home.css'

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDifficulty, setSelectedDifficulty] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleDifficultySelect = (difficulty) => {
        setSelectedDifficulty(difficulty)
    }

    const handlePlay = async () => {
        if (!selectedDifficulty) {
            setIsModalOpen(true)
            return
        }

        setLoading(true)
        try {
            const response = await axios.get(`${API_ENDPOINTS.difficulties}/${selectedDifficulty.id}`)
            // espero la sesion del juego y envio los datos a /game
            navigate('/game', { state: { gameSession: response.data } })
        } catch (error) {
            console.error('Error creating session:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <main className="vh-100 d-flex flex-column justify-content-center align-items-center p-4">
                <img src="/logo.png" alt="Logo" className="home__logo mb-4" />

                <div className="text-center mb-4">
                    <h1 className="display-3 fw-bold mb-2 home__title">WORDLE UNQ</h1>
                    <p className="text-muted fs-5">Guess the word in 6 attempts</p>
                </div>

                {selectedDifficulty && (
                    <p className="text-muted mb-3">Selected difficulty: {selectedDifficulty.name}</p>
                )}

                <div className="d-flex flex-column gap-3 home__buttons">
                    <button
                        className="btn btn-lg btn-custom-primary"
                        onClick={handlePlay}
                        disabled={loading}
                    >
                        {loading ? 'Creating session...' : 'Play'}
                    </button>
                    <button className="btn btn-lg btn-custom-secondary" onClick={() => setIsModalOpen(true)}>
                        {selectedDifficulty ? 'Change difficulty' : 'Select difficulty'}
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