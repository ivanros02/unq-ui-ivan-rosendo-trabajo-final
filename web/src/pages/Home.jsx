import { useState } from 'react'
import DifficultyModal from '../components/DifficultyModal'
import '../styles/Home.css'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDifficultySelect = (difficulty) => {
    console.log(`Dificultad seleccionada: ${difficulty}`)
  }

  return (
    <>
      <main className="vh-100 d-flex flex-column justify-content-center align-items-center p-4">
        <img src="/logo.png" alt="Logo" className="home__logo mb-4" />
        
        <div className="text-center mb-4">
          <h1 className="display-3 fw-bold mb-2 home__title">WORDLE UNQ</h1>
          <p className="text-muted fs-5">Adivina la palabra en 6 intentos</p>
        </div>
        
        <div className="d-flex flex-column gap-3 home__buttons">
          <button className="btn btn-lg btn-custom-primary">Jugar</button>
          <button className="btn btn-lg btn-custom-secondary" onClick={() => setIsModalOpen(true)}>
            Configuración
          </button>
        </div>
      </main>

      <DifficultyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleDifficultySelect}
      />
    </>
  )
}