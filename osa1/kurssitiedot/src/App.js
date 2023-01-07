const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const sum = exercises1 + exercises2 + exercises3

  return (
    <div>
      <Header course={course} />
      <Content name1={part1} count1={exercises1}
        name2={part2} count2={exercises2}
        name3={part3} count3={exercises3} />
      <Total sum={sum} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.name1} count={props.count1} />
      <Part name={props.name2} count={props.count2} />
      <Part name={props.name3} count={props.count3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.count}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.sum}</p>
    </div>
  )
}

export default App