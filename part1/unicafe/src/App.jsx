import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(good + neutral + bad);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const addGood = () => () => {
    let value = good + 1;
    console.log("added before good", good);
    setGood(value);
    addAll();
  };
  const addNeutral = () => () => {
    let value = neutral + 1;
    console.log("added before neutral", neutral);
    setNeutral(value);
    addAll();
  };
  const addBad = () => () => {
    let value = bad + 1;
    console.log("added before bad", bad);
    setBad(value);
    addAll();
  };

  const addAll = () => {
    console.log("added before all", all);
    let value = all + 1;
    setAll(value);
    handleMoreStatiscs();
  };

  const handleMoreStatiscs = () => {
    addAverage();
    addPositive();
  };

  const addAverage = () => {
    let value = (good - bad) / all;
    setAverage(value);
  };

  const addPositive = () => {
    let value = (good / all) * 100;
    setPositive(value);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={addGood()}>good</button>
      <button onClick={addNeutral()}>neutral</button>
      <button onClick={addBad()}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  );
};

export default App;
