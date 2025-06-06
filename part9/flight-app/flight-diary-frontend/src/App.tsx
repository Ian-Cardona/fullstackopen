import { useEffect, useState } from 'react'
import DiaryEntries from './components/DiaryEntries'
import diaryServices from './services/diaryServices'
import type { DiaryEntry } from './types'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryServices.getAll()
      setDiaries(diaries)
    }
    fetchDiaries()
  }, [])

  return (
    <>
      <DiaryEntries title="Diary entries" diaryEntries={diaries} />
    </>
  )
}

export default App
