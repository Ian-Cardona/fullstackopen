import type { CoursePart } from '../types'
import Part from './Part'

interface CoursePartsProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: CoursePartsProps) => {
  return (
    <>
      {courseParts.map((course, index) => (
        <Part key={index} coursePart={course} />
      ))}
    </>
  )
}

export default Content
