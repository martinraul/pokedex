import { $list } from "./getApiData.js";
const $showPokemon = document.querySelector("#showPokemon");

export function formatActiveElement(pokemon) {
  var allLiElements = document.getElementsByTagName("li");
  let i;
  for (i = 0; i < allLiElements.length; i++) {
    allLiElements[i].className = "";
  }
  pokemon.className = "active";
}

export function createList(result) {
  let li = document.createElement("li");
  li.innerHTML = `${result.name}`;
  $list.appendChild(li);
  $list.style.cursor = "pointer";
}

export function createPokemonCard(pokemon) {
  $showPokemon.innerHTML = "";

  let nameSpan = document.createElement("h1");
  nameSpan.innerHTML = `${pokemon.name}`.toUpperCase();

  let typeSpan = document.createElement("p");
  typeSpan.innerHTML = `Type: ${pokemon.types[0].type.name.toUpperCase()}`;

  let heightSpan = document.createElement("p");
  heightSpan.innerHTML = `Height: ${pokemon.height}`;

  let weightSpan = document.createElement("p");
  weightSpan.innerHTML = `Weight: ${pokemon.weight}`;

  let picSpan = document.createElement("img");
  picSpan.src = Object.values(pokemon.sprites)[4];

  $showPokemon.appendChild(nameSpan);
  $showPokemon.appendChild(typeSpan);
  $showPokemon.appendChild(heightSpan);
  $showPokemon.appendChild(weightSpan);
  $showPokemon.appendChild(picSpan);
}

