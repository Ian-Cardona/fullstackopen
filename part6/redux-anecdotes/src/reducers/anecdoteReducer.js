import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);
// const giveRandomVotes = () => Math.floor(10 * Math.random());

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   state.push(action.payload);
    //   state.sort((a, b) => b.votes - a.votes);
    //   // return [...state, newAnecdote].sort((a, b) => b.votes - a.votes);
    // },
    updateAnecdote(state, action) {
      const updated = action.payload;
      return state
        .map((a) => (a.id === updated.id ? updated : a))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
      state.sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const { appendAnecdote, setAnecdotes, updateAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(anecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};
export default anecdoteSlice.reducer;

// const anecdoteReducer = (state = initialState, action) => {
//   console.log("state now", state);
//   console.log("action", action);

//   switch (action.type) {
//     case "CREATE_ANECDOTE":
//       return [...state, action.payload].sort((a, b) => b.votes - a.votes);
//     case "VOTE_ANECDOTE":
//       return state
//         .map((anecdote) =>
//           anecdote.id === action.payload.id
//             ? { ...anecdote, votes: anecdote.votes + 1 }
//             : anecdote
//         )
//         .sort((a, b) => b.votes - a.votes);
//     default:
//       return state;
//   }
// };

// export const createAnecdote = (content) => {
//   return {
//     type: "CREATE_ANECDOTE",
//     payload: asObject(content),
//   };
// };

// export const voteAnecdote = (id) => {
//   return {
//     type: "VOTE_ANECDOTE",
//     payload: {
//       id,
//     },
//   };
// };
