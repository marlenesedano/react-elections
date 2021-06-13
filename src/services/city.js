const urlCities = "http://localhost:3004/cities";

export function getCities() {
  let cities;

  fetch(urlCities)
    .then((r) => r.json())
    .then((reponse) => {
      cities = reponse;
    });
  console.log(cities);
  return cities;
}

export async function getCityVotes(cityId) {
  const response = await fetch(urlCities);
  const cities = await response.json();
  const city = cities.filter((city) => {
    return city.id === cityId;
  })[0];

  return city;
}

export async function getPorcentege() {}
