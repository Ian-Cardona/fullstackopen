const Input = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="input-field"
    />
  );
};

export default Input;
