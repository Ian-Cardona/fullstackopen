import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Anecdote = ({ anecdoteText, votesCount }) => (
  <>
    <div>{anecdoteText}</div>
    <div>has {votesCount} votes</div>
  </>
);

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(8).fill(0));

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const getRandomInt = (max) => {
    let value;
    do {
      value = Math.floor(Math.random() * max);
    } while (value === selected);
    return value;
  };

  const getRandomAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length));
  };

  const voteAnecdote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  const mostVotedIndex = votes.indexOf(Math.max(...votes));

  return (
    <>
      <Header text="Anecdote of the day" />
      <Anecdote
        anecdoteText={anecdotes[selected]}
        votesCount={votes[selected]}
      />
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={getRandomAnecdote}>next anecdote</button>
      <Header text="Anecdote with most votes" />
      <Anecdote
        anecdoteText={anecdotes[mostVotedIndex]}
        votesCount={votes[mostVotedIndex]}
      />
    </>
  );
};

export default App;
