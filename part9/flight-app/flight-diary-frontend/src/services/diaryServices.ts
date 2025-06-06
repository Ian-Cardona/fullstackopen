import axios from 'axios'
import type { DiaryEntry } from '../types'

const baseUrl = 'http://localhost:3000/api'

const getAll = async (): Promise<DiaryEntry[]> => {
  try {
    const response = await axios.get<DiaryEntry[]>(`${baseUrl}/diaries`)
    return response.data
  } catch (e) {
    if (e instanceof Error) {
      throw e.message
    }
    throw e
  }
}

export default { getAll }
