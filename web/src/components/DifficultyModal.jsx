import { useEffect } from 'react'
import { useGame } from '../hook/useGame'
import '../styles/DifficultyModal.css'

export default function DifficultyModal({ isOpen, onClose, onSelect }) {
  const { difficulties, loading, error, fetchDifficulties } = useGame()

  useEffect(() => {
    if (isOpen) {
      fetchDifficulties()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal d-block modal-custom-overlay" onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title">Select difficulty</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {loading && (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Charging...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="d-grid gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.id}
                    className="btn btn-custom-outline"
                    onClick={() => onSelect(difficulty)}
                  >
                    {difficulty.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}