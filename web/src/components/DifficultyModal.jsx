import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/DifficultyModal.css'
import { API_ENDPOINTS } from '../utils/constants'

export default function DifficultyModal({ isOpen, onClose, onSelect }) {
  const [difficulties, setDifficulties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isOpen) {
      fetchDifficulties()
    }
  }, [isOpen])

  const fetchDifficulties = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(API_ENDPOINTS.difficulties)
      setDifficulties(response.data)
    } catch (err) {
      setError('Error al cargar dificultades')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (difficulty) => {
    onSelect(difficulty)
    onClose()
  }

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
                    onClick={() => handleSelect(difficulty)}
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