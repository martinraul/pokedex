export const $list = document.querySelector("#list");
export let pokemonList = `https://pokeapi.co/api/v2/pokemon?offset=0&limit20`;
const $nextButton = document.getElementById("next-button");
const $previousButton = document.getElementById("previous-button");

import { createList } from "./ui.js";
import { formatActiveElement } from "./ui.js";
import { createPokemonCard } from "./ui.js";

export function loadPokemontList() {
  fetch(pokemonList)
    .then((pokemonList) => pokemonList.json())
    .then((pokemonList) => {
      pokemonList.results.forEach((result) => {
        createList(result);
      });
    });
  $list.addEventListener("click", function (event) {
    let pokemon = event.target;
    console.log(pokemon);
    formatActiveElement(pokemon);
    loadSinglePokemon(pokemon);
  });
}

export function loadSinglePokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.textContent}`)
    .then((pokemon) => pokemon.json())
    .then((pokemon) => {
      createPokemonCard(pokemon);
    })
    .catch((error) => {
      console.error(error);
      $showPokemon.innerHTML = "ERROR 404: POKEMON NOT FOUND";
    });
}

let offset = 0;

$nextButton.onclick = function () {
  offset += 20;
  console.log(offset);
  list.innerHTML = "";
  pokemonList = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
  loadPokemontList(pokemonList);
};

$previousButton.onclick = function () {
  offset -= 20;
  console.log(offset);
  list.innerHTML = "";
  pokemonList = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
  loadPokemontList(pokemonList);
};
