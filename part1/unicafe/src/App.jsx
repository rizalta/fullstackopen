import { useState } from 'react';

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({ good, neutral, bad, total }) => {
  if (total == 0) {
    return (
      <p>No feedback given</p>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="average" value={(good - bad) / total} />
        <StatisticLine text="positive" value={good * 100.0 / total} />
      </tbody>
    </table>
  );
}

const Button = ({ text, state, setter, total, setTotal }) => {
  const handleClick = () => {
    setter(state + 1);
    setTotal(total +  1)
  }
  
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" state={good} setter={setGood} total={total} setTotal={setTotal} />
      <Button text="neutral" state={neutral} setter={setNeutral} total={total} setTotal={setTotal} />
      <Button text="bad" state={bad} setter={setBad} total={total} setTotal={setTotal} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
}

export default App;
