
import { loadPokemontList,selectPokemon } from "./api.js"; 

async function initialize(){
await loadPokemontList();
selectPokemon();
}

initialize()
