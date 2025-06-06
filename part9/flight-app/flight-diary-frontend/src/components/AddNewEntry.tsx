import { useState, type FormEvent, type SyntheticEvent } from 'react'
import type { NewDiaryEntry } from '../types'

interface AddNewEntryProps {
  title: string
  handleAddNewEntry: (body: NewDiaryEntry) => Promise<void>
}

const AddNewEntry = (props: AddNewEntryProps) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const submitNewEntry = (event: SyntheticEvent) => {
    event.preventDefault()
    const newEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    }
    props.handleAddNewEntry(newEntry)
  }

  return (
    <>
      <h2>{props.title}</h2>
      <form onSubmit={submitNewEntry}>
        <div>
          date
          <input
            value={date}
            onChange={(e: FormEvent<HTMLInputElement>): void => {
              setDate(e.currentTarget.value)
            }}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={(e: FormEvent<HTMLInputElement>): void => {
              setVisibility(e.currentTarget.value)
            }}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={(e: FormEvent<HTMLInputElement>): void => {
              setWeather(e.currentTarget.value)
            }}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(e: FormEvent<HTMLInputElement>): void => {
              setComment(e.currentTarget.value)
            }}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  )
}

export default AddNewEntry
