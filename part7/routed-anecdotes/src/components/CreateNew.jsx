import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("url");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = (e) => {
    e.preventDefault(); // Prevent default form reset
    content.requiredItems.onReset();
    author.requiredItems.onReset();
    info.requiredItems.onReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...content.requiredItems} />
          <button type="button" onClick={content.reset}>
            clear
          </button>
        </div>
        <div>
          author
          <input {...author.requiredItems} />
          <button type="button" onClick={author.reset}>
            clear
          </button>
        </div>
        <div>
          url for more info
          <input {...info.requiredItems} />
          <button type="button" onClick={info.reset}>
            clear
          </button>
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
