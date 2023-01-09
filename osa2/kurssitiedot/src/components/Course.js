const Course = ({ course }) => (
    <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>
)

const Header = ({ course }) => (
    <div>
        <h2>{course.name}</h2>
    </div>
)

const Content = ({ course }) => (
    <div>
        {course.parts.map(parts => <Part key={parts.id} part={parts} />
        )}
    </div>
)

const Part = ({ part }) => (
    <div>
        <p>
            {part.name} {part.exercises}
        </p>
    </div>
)

const Total = ({ course }) => {
    const Summa = course.parts.reduce((sum, parts) => sum + parts.exercises, 0)
    return (
        <div>
            <b>total of {Summa} exercises</b>
        </div>
    )
}

export default Course