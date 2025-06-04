import type { CoursePart } from '../types'

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </p>
          <p>{coursePart.description}</p>
        </>
      )

    case 'group':
      return (
        <>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </p>
          <p>Group Projects: {coursePart.groupProjectCount}</p>
        </>
      )

    case 'background':
      return (
        <>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </p>
          <p>{coursePart.description}</p>
          <p>submit to: {coursePart.backgroundMaterial}</p>
        </>
      )

    case 'special':
      return (
        <>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </p>
          <p>{coursePart.description}</p>
          <p>
            Required skills: {coursePart.requirements.join(', ')}
          </p>
        </>
      )

    default: {
      const _exhaustiveCheck: never = coursePart
      return _exhaustiveCheck
    }
  }
}

export default Part 