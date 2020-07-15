export const $list = document.querySelector("#list");
export let pokemonList = `https://pokeapi.co/api/v2/pokemon?offset=0&limit20`;
const $nextButton = document.getElementById("next-button");
const $previousButton = document.getElementById("previous-button");
let offset = 0;
selectPokemon();

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
}

function selectPokemon() {
  $list.addEventListener("click", function (event) {
    let pokemon = event.target;
    formatActiveElement(pokemon);
    loadPokemon(pokemon);
  });

  function loadPokemon(pokemon) {
    try {
      pokemon = pokemon.textContent;
      loadStoragePokemon(pokemon);
      createPokemonCard(pokemon);
    } catch (error) {
      loadApiPokemon(pokemon);
      savePokemonInStorage(pokemon);
      return pokemon;
    }
  }
}

function loadApiPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((pokemon) => pokemon.json())
    .then((pokemon) => {
      savePokemonInStorage(pokemon);
      createPokemonCard(pokemon);
    })
    .catch((error) => {
      console.error(error);
      $showPokemon.innerHTML = "ERROR 404: POKEMON NOT FOUND";
    });
}

function loadStoragePokemon(pokemon) {
  pokemon = JSON.parse(window.localStorage.getItem(pokemon));
  if (pokemon === null) {
    throw new Error("Pokemon not in storage.");
  }
  return pokemon;
}

function savePokemonInStorage(pokemon) {
  try {
    localStorage.setItem(`${pokemon.name}`, JSON.stringify(pokemon));
  } catch (error) {
    localStorage.clear();
    localStorage.setItem(`${pokemon.name}`, JSON.stringify(pokemon));
  }
}

$nextButton.onclick = function () {
  offset += 20;
  list.innerHTML = "";
  pokemonList = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
  loadPokemontList(pokemonList);
};

$previousButton.onclick = function () {
  offset -= 20;
  list.innerHTML = "";
  pokemonList = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
  loadPokemontList(pokemonList);
};
