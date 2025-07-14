export const API_BASE_URL = 'https://word-api-hmlg.vercel.app'

export const API_ENDPOINTS = {
  //Retorna una lista de dificultades.
  difficulties: `${API_BASE_URL}/api/difficulties`,
  // Nos retorna el resultado de la jugada.
  checkWord: `${API_BASE_URL}/api/checkWord`,
  //Retorna una sesion de juego. (si el id no existe 404)
  getDifficulty: (id) => `${API_BASE_URL}/api/difficulties/${id}`
}