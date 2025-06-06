import type { DiaryEntry } from '../types'

interface DiaryEntriesProps {
  title: string
  diaryEntries: DiaryEntry[]
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  return (
    <div>
      <h2>{props.title}</h2>
      {props.diaryEntries.map((value) => (
        <div key={value.id}>
          <h3>{value.date}</h3>
          <p>visibility: {value.visibility}</p>
          <p>weather: {value.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default DiaryEntries
