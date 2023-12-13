////////// ////////// Country Info ////////// //////////
////////// /////// By: Tobias Hurtig //////// //////////

const containerDiv = document.querySelector("#container");
const countryForm = document.querySelector("form");
let lang = "lang";
let countryName = "name";

////////// ////////// Users choice ////////// //////////

countryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const userSelect = document.querySelector("select").value;
  const userInput = document.querySelector("input").value;

  if (userSelect == "name") {
    countryName = userSelect;
  } else if (userSelect == "lang") {
    lang = userSelect;
  }

  fetchcountryInfo(userSelect, userInput)
    .then(displayCountryInfo)
    .catch(displayError);

  countryForm.reset();
});

////////// ////////// fetch info from url ////////// //////////

async function fetchcountryInfo(langOrCountry, countryChoice) {
  const countryUrl = `https://restcountries.com/v3.1/${langOrCountry}/${countryChoice}?fields=name,subregion,capital,population,flags`;

  containerDiv.innerHTML = "";

  const response = await fetch(countryUrl);
  if (response.ok) {
    const data = await response.json();

    return data;
  } else if (response.status === 404) {
    throw 404;
  }
}

////////// ////////// display country info ////////// //////////

function displayCountryInfo(countryObj) {
  countryObj.sort(comparePopulation);

  for (let countries of countryObj) {
    const countryDiv = document.createElement("div");
    countryDiv.className = "divColor";
    containerDiv.append(countryDiv);
    const h2El = document.createElement("h2");
    h2El.innerText = countries.name.common;
    countryDiv.append(h2El);
    const h3Subregion = document.createElement("h3");
    h3Subregion.innerText = "Subregion: " + countries.subregion;
    countryDiv.append(h3Subregion);
    const h3Capital = document.createElement("h3");
    h3Capital.innerText = "Capital: " + countries.capital;
    countryDiv.append(h3Capital);
    const h3Population = document.createElement("h3");
    h3Population.innerText = "Population: " + countries.population;
    countryDiv.append(h3Population);
    const imgFlag = document.createElement("img");
    imgFlag.src = countries.flags.png;
    countryDiv.append(imgFlag);
  }
}
////////// ///// sorting countries by population ///// //////////

function comparePopulation(country1, country2) {
  return country2.population - country1.population;
}
//////////// /////////// Error function /////////// ////////////

function displayError(error) {
  const h1 = document.createElement("h1");
  const countryDiv = document.createElement("div");
  countryDiv.className = "divError";
  containerDiv.append(countryDiv);
  console.log(error);
  if (error === 404) {
    h1.innerText = "There is no country or language with that name, try again";
  } else {
    h1.innerText = "Something went wrong, try again later";
  }
  countryDiv.append(h1);
}
