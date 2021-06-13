import "./styles.css";

export function Card({ name, percentage, votes, photo, elected }) {
  return (
    <div className="card">
      <div className="row">
        <span>{percentage}</span>
        <br />
        <span>{votes}</span>
      </div>
      <span>{name}</span>
      <br />
      <span className={elected ? "elected" : "not-elected"}>
        {elected === true ? "Eleito" : "Não eleito"}
      </span>
    </div>
  );
}
