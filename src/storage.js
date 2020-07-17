export function loadStoragePokemon(pokemon) {
  pokemon = JSON.parse(window.localStorage.getItem(pokemon));
  if (pokemon === null) {
    throw new Error("Pokemon not in storage.");
  }
  return pokemon;
}

export function savePokemonInStorage(pokemon) {
  try {
    localStorage.setItem(`${pokemon.name}`, JSON.stringify(pokemon));
  } catch (error) {
    localStorage.clear();
    localStorage.setItem(`${pokemon.name}`, JSON.stringify(pokemon));
  }
}
