import '../styles/DifficultyModal.css'

const difficulties = ['Fácil', 'Media', 'Difícil']

export default function DifficultyModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null

  const handleSelect = (difficulty) => {
    onSelect(difficulty.toLowerCase())
    onClose()
  }

  return (
    <div 
      className="modal d-block modal-custom-overlay" 
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar dificultad</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          
          <div className="modal-body">
            <div className="d-grid gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  className="btn btn-custom-outline"
                  onClick={() => handleSelect(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}