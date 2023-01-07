const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </div>
  )
}

const Part = ({ part }) => {

  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

const Total = ({ course }) => {
  const Summa = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return (
    <div>
      <p>Number of exercises {Summa}</p>
    </div>
  )
}

export default App