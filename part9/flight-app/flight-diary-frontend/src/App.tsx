import { useEffect, useState } from 'react'
import DiaryEntries from './components/DiaryEntries'
import diaryServices from './services/diaryServices'
import type { DiaryEntry, NewDiaryEntry } from './types'
import AddNewEntry from './components/AddNewEntry'
import Notification from './components/Notification'
import { AxiosError } from 'axios'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const handleAddNewEntry = async (body: NewDiaryEntry) => {
    try {
      await diaryServices.addNew(body)
      await fetchDiaries()
    } catch (e) {
      console.log(e)
      if (e instanceof AxiosError) {
        setErrorMessage(e.response?.data)
      } else if (e instanceof Error) {
        setErrorMessage(e.message)
      }
    }
  }

  const fetchDiaries = async () => {
    try {
      const diaries = await diaryServices.getAll()
      setDiaries(diaries)
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorMessage(e.response?.data)
      } else if (e instanceof Error) {
        setErrorMessage(e.message)
      }
    }
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
      <Notification errorMessage={errorMessage} />
      <DiaryEntries title="Diary entries" diaryEntries={diaries} />
    </>
  )
}

export default App
