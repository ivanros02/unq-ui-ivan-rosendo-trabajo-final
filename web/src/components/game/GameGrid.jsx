// me ayuda a retornar el color de la celda según el estado
const getCellClass = (status) => {
    const baseClass = 'd-flex align-items-center justify-content-center border border-2 fw-bold text-uppercase'
    
    switch (status) {
        case 'correct': return `${baseClass} bg-success text-white`
        case 'elsewhere': return `${baseClass} bg-warning text-dark`
        case 'absent': return `${baseClass} bg-secondary text-white`
        default: return `${baseClass} bg-light`
    }
}

// solo representa una celda del juego
const GameCell = ({ letter, status }) => (
    <div
        className={getCellClass(status)}
        style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
    >
        {letter}
    </div>
)

// representa una fila del juego, que contiene varias celdas
const GameRow = ({ attempt, wordLength }) => (
    <div className="d-flex gap-2 mb-2">
        {Array.from({ length: wordLength }, (_, j) => {
            const letter = attempt?.[j]?.letter || ''
            const status = attempt?.[j]?.solution || ''
            
            return (
                <GameCell key={j} letter={letter} status={status} />
            )
        })}
    </div>
)

export default function GameGrid({ attempts, wordLength }) {
    return (
        <div className="d-flex justify-content-center mb-4">
            <div>
                {Array.from({ length: 6 }, (_, i) => (
                    <GameRow 
                        key={i} 
                        attempt={attempts[i]} 
                        wordLength={wordLength} 
                    />
                ))}
            </div>
        </div>
    )
}