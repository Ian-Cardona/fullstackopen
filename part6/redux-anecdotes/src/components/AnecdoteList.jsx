import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    const filter = state.filter.trim().toLowerCase();

    if (filter === "all") {
      return state.anecdotes;
    }

    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  });

  // const anecdotes = useSelector((state) => state.anecdotes);

  const vote = (id) => {
    const anecdoteId = anecdotes.find((a) => (a.id === id ? a : null));
    console.log(anecdoteId);
    dispatch(voteAnecdote(id));
    dispatch(showNotification(`you voted "${anecdoteId.content}"`));
    console.log("APP vote", id);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
