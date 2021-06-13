import "./styles.css";

export default function Select({ id, label, options = [], ...props }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...props} className="select">
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.content}
            </option>
          );
        })}
      </select>
    </>
  );
}
