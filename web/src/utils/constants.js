export const API_BASE_URL = 'https://word-api-hmlg.vercel.app'

export const API_ENDPOINTS = {
  difficulties: `${API_BASE_URL}/api/difficulties`,
  checkWord: `${API_BASE_URL}/api/checkWord`,
  getDifficulty: (id) => `${API_BASE_URL}/api/difficulties/${id}`
}