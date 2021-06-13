const urlElection = "http://localhost:3004/election";
const urlCandidates = "http://localhost:3004/candidates";

export async function getCandidates(cityId) {
  const responseCandidates = await fetch(urlCandidates);
  const candidates = await responseCandidates.json();

  const response = await fetch(urlElection);
  const elections = await response.json();

  const filteredElections = elections.filter((election) => {
    return cityId === election.cityId;
  });

  filteredElections.sort((elections1, elections2) => {
    if (elections1.votes > elections2.votes) {
      return -1;
    }
    if (elections1.votes < elections2.votes) {
      return 1;
    }
    return 0;
  });

  const presences = filteredElections.reduce((sum, candidate) => {
    return sum + candidate.votes;
  }, 0);

  return filteredElections.map((election, index) => {
    const candidateInfo = candidates.filter((candidate) => {
      return candidate.id === election.candidateId;
    })[0];

    return {
      ...election,
      elected: index === 0,
      name: candidateInfo.name,
      percentage: (election.votes / presences) * 100,
    };
  });
}
