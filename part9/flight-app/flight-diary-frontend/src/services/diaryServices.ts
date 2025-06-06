import axios from 'axios'
import type { DiaryEntry, NewDiaryEntry } from '../types'

const baseUrl = 'http://localhost:3000/api'

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(`${baseUrl}/diaries`)
  return response.data
}

const addNew = async (body: NewDiaryEntry): Promise<NewDiaryEntry> => {
  const response = await axios.post<NewDiaryEntry>(`${baseUrl}/diaries`, body)
  return response.data
}

export default { getAll, addNew }
