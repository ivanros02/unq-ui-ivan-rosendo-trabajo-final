export default function GameStatus({ error, gameState, currentAttempt }) {
    return (
        <>
            {error && (
                <div className="alert alert-danger text-center">{error}</div>
            )}

            {gameState.isWon && (
                <div className="alert alert-success text-center">
                    <h4>¡You won!</h4>
                </div>
            )}

            {currentAttempt >= 6 && !gameState.isWon && (
                <div className="alert alert-danger text-center">
                    <h4>You lost</h4>
                </div>
            )}
        </>
    )
}