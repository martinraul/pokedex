const $list = document.querySelector("#list");
$list.style.cursor = "pointer";
const $nextButton = document.getElementById("next-button");
const $previousButton = document.getElementById("previous-button");
let offset = 0;
const $showPokemon = document.querySelector("#showPokemon");
let pokemonList = `https://pokeapi.co/api/v2/pokemon?offset=0&limit20`;

loadPokemontList(pokemonList);

function loadPokemontList(pokemonList) {
  fetch(pokemonList)
    .then((data) => data.json())
    .then((data) => {
      data.results.forEach((result) => {
        let li = document.createElement("li");
        li.innerHTML = `<li>${result.name}</li>`;
        $list.appendChild(li);
        console.log(result.url);
      });
    });
  $list.addEventListener("click", function (event) {
    let pokemon = event.target;
    console.log(pokemon);
    formatActiveElement(pokemon)
    loadSinglePokemon(pokemon);
  });
}

function loadSinglePokemon(pokemon) {
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

function createPokemonCard(pokemon) {
  $showPokemon.innerHTML = "";

  let nameSpan = document.createElement("h1");
  nameSpan.innerHTML = `${pokemon.name}`.toUpperCase();

  let typeSpan = document.createElement("p");
  typeSpan.innerHTML = `Type: ${pokemon.types[0].type.name}`;

  let heightSpan = document.createElement("p");
  heightSpan.innerHTML = `height:${pokemon.height}`;

  let weightSpan = document.createElement("p");
  weightSpan.innerHTML = `weight:${pokemon.weight}`;

  let picSpan = document.createElement("img");
  picSpan.src = Object.values(pokemon.sprites)[4];

  $showPokemon.appendChild(nameSpan);
  $showPokemon.appendChild(typeSpan);
  $showPokemon.appendChild(heightSpan);
  $showPokemon.appendChild(weightSpan);
  $showPokemon.appendChild(picSpan);
}

$nextButton.onclick = function () {
  console.log("+20");
  offset += 20;
  list.innerHTML = "";
  loadPokemontList(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
  );
};

$previousButton.onclick = function () {
  console.log("-20");
  offset -= 20;
  list.innerHTML = "";
  loadPokemontList(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
  );
};

function formatActiveElement(pokemon){
  var allLiElements = document.getElementsByTagName("li");
  for (i = 0; i < allLiElements.length; i++) {
    //it does work
    allLiElements[i].className = "";
  }
  pokemon.className = "active";
}