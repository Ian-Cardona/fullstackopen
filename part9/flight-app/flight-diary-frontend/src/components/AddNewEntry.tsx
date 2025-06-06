import { useState, type SyntheticEvent } from 'react'
import type { NewDiaryEntry, Visibility, Weather } from '../types'

interface AddNewEntryProps {
  title: string
  handleAddNewEntry: (body: NewDiaryEntry) => Promise<void>
}

const AddNewEntry = (props: AddNewEntryProps) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility>('great')
  const [weather, setWeather] = useState<Weather>('sunny')
  const [comment, setComment] = useState('')
  const visibilityOptions: Visibility[] = ['great', 'good', 'ok', 'poor']
  const weatherOptions: Weather[] = [
    'sunny',
    'rainy',
    'cloudy',
    'stormy',
    'windy',
  ]

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
          <label>date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label>visibility</label>
          {visibilityOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={(e) =>
                  setVisibility(e.currentTarget.value as Visibility)
                }
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <label>weather</label>
          {weatherOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={(e) => setWeather(e.currentTarget.value as Weather)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <label>comment</label>
          <input
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  )
}

export default AddNewEntry
