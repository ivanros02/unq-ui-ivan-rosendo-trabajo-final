import { useState } from 'react'

export default function GameInput({ onSubmit, wordLength, loading }) {
    const [word, setWord] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (word.length === wordLength) {
            onSubmit(word)
            setWord('')
        }
    }

    const handleChange = (e) => {
        setWord(e.target.value.toUpperCase())
    }

    // solo perimito submit si la longitud de la palabra es correcta
    const isDisabled = loading || word.length !== wordLength

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control text-center text-uppercase"
                            value={word}
                            onChange={handleChange}
                            maxLength={wordLength}
                            placeholder={`${wordLength} letters`}
                            disabled={loading}
                        />
                        <button 
                            className="btn btn-primary" 
                            type="submit"
                            disabled={isDisabled}
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}