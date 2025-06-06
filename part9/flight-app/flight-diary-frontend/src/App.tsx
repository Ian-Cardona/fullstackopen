import { useEffect, useState } from 'react'
import DiaryEntries from './components/DiaryEntries'
import diaryServices from './services/diaryServices'
import type { DiaryEntry, NewDiaryEntry } from './types'
import AddNewEntry from './components/AddNewEntry'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  const handleAddNewEntry = async (body: NewDiaryEntry) => {
    await diaryServices.addNew(body)
    await fetchDiaries()
  }

  const fetchDiaries = async () => {
    const diaries = await diaryServices.getAll()
    setDiaries(diaries)
  }

  useEffect(() => {
    fetchDiaries()
  }, [])

  return (
    <>
      <AddNewEntry
        title="Add new entry"
        handleAddNewEntry={handleAddNewEntry}
      />
      <DiaryEntries title="Diary entries" diaryEntries={diaries} />
    </>
  )
}

export default App
