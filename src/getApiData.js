export const $list = document.querySelector("#list");
import { $showPokemon, createList, formatActiveElement, createPokemonCard } from "./ui.js";
import { loadStoragePokemon, savePokemonInStorage } from "./storage.js";
let pokemonList = `https://pokeapi.co/api/v2/pokemon?offset=0&limit20`;
let offset = 0;

export function loadPokemontList() {
  fetch(pokemonList)
    .then((pokemonList) => pokemonList.json())
    .then((pokemonList) => {
      pokemonList.results.forEach((result) => {
        createList(result);
      });
    });
}

export function selectPokemon() {
  $list.addEventListener("click", function (event) {
    let pokemon = event.target;
    formatActiveElement(pokemon);
    loadPokemon(pokemon);
  });
}

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

export function retrieveNextPageList() {
  offset += 20;
  $list.innerHTML = "";
  pokemonList = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
}

export function retrievePrevPageList() {
  offset -= 20;
  $list.innerHTML = "";
  pokemonList = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
}
