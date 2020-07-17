
import { loadPokemontList,selectPokemon } from "./getApiData.js"; 

async function initialize(){
await loadPokemontList();
selectPokemon();
}

initialize()