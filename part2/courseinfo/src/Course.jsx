const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <strong>total of {sum} exercises</strong>
  )
}
  

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>


const Content = ({ parts }) => 
  <>
    {parts && parts.map((part, index) => (
      <Part part={part} key={index}/>
    ))}     
  </>

const Course = ({ course }) => {
	const { name, parts } = course;
	return (
		<div>
			<Header course={name} />
			<Content parts={parts} />
			<Total parts={parts} />
		</div>
	);
}

export default Course;