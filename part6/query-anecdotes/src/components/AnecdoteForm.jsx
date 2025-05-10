import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNew } from "../requests";
import { useNotificationDispatch } from "./CounterContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdotes) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdotes));
    },
    onError: (error) => {
      console.log("error", error);
      const message = error.response?.data?.error || error.message;
      dispatch({ type: "ERROR", message });

      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
    },
  });

  const getId = () => (100000 * Math.random()).toFixed(0);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newContent = { content: content, id: getId(), votes: 0 };
    newAnecdoteMutation.mutate(newContent);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
