import axios from 'axios'
import { API_ENDPOINTS } from '../utils/constants'

export const getDifficulties = async () => {
    const response = await axios.get(API_ENDPOINTS.difficulties)
    return response.data
}

export const createGameSession = async (difficultyId) => {
    const response = await axios.get(`${API_ENDPOINTS.difficulties}/${difficultyId}`)
    return response.data
}

export const checkWord = async (sessionId, word) => {
    const response = await axios.post(API_ENDPOINTS.checkWord, {
        sessionId,
        word: word.toLowerCase()
    })
    return response.data
}