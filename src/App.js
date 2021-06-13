import { useEffect, useState } from "react";
import Header from "./components/Header";
import Select from "./components/Select";
import "./App.css";
import { getCityVotes } from "./services/city";
import { getCandidates } from "./services/election";
import { Card } from "./components/Card";

function App() {
  const urlCities = "http://localhost:3004/cities";
  const [cities, setCities] = useState([]);
  const [cityVotes, setCityVotes] = useState({});
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch(urlCities)
      .then((r) => r.json())
      .then((response) => {
        const result = response.map((city) => {
          return {
            value: city.id,
            content: city.name,
          };
        });

        setCities(result);
        updateCity(result[0].value);
      });
  }, []);

  async function updateCity(value) {
    const result = await getCityVotes(value);
    setCityVotes(result);

    const candidates = await getCandidates(value);
    setCandidates(candidates);
  }

  async function handleChangeCity(e) {
    updateCity(e.target.value);
  }

  return (
    <div className="App">
      <Header />
      <Select
        id="city"
        label="Escolha o município: "
        options={cities}
        onChange={handleChangeCity}
      />
      <div>
        <h3>{`Eleição em ${cityVotes.name}`}</h3>
        <div>
          <span>
            <strong>Total de Eleitores:</strong> {cityVotes.votingPopulation}{" "}
          </span>
          <span>
            <strong>Abstenção:</strong> {cityVotes.absence}{" "}
          </span>
          <span>
            <strong>Comparecimento:</strong> {cityVotes.presence}
          </span>
        </div>
        <span>
          <strong>{candidates.length}</strong> candidatos
        </span>
      </div>
      <div className="card-container">
        {candidates.map((candidate) => {
          return (
            <div key={candidate.id}>
              <Card
                name={candidate.name}
                percentage={candidate.percentage.toFixed(2) + " %"}
                votes={candidate.votes.toLocaleString("pt-BR")}
                elected={candidate.elected}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
