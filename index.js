// ID du Pokémon actuel (commence à 1)
let currentPokemon = 1;

// Sélection des éléments du DOM une seule fois
const loading = document.querySelector('.loading');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonId = document.getElementById('pokemonId');
const pokemonName = document.getElementById('pokemonName');
const pokemonTypes = document.getElementById('pokemonTypes');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

// Fonction pour récupérer les données du Pokémon depuis l'API
async function getPokemon() {
  loading.style.display = 'block'; // Affiche le message de chargement

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du Pokémon');
    }

    const data = await response.json(); // Convertit la réponse en JSON
    return data;
  } catch (error) {
    alert("Impossible de charger le Pokémon. Vérifie ta connexion ou l'ID.");
    console.error(error);
  } finally {
    loading.style.display = 'none'; // Cache le message de chargement
  }
}

// Fonction pour afficher les données du Pokémon dans le HTML
function renderPokemon(pokemon) {
  if (!pokemon) return;

  // Affiche l'image du Pokémon
  const sprite = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  pokemonImage.src = sprite;
  pokemonImage.alt = pokemon.name;

  // Affiche l'ID et le nom (avec majuscule)
  pokemonId.textContent = `#${pokemon.id}`;
  pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  // Affiche les types
  pokemonTypes.innerHTML = ''; // Vide les anciens types
  pokemon.types.forEach(typeInfo => {
    const typeElement = document.createElement('span');
    typeElement.textContent = typeInfo.type.name;
    typeElement.classList.add('type-badge', typeInfo.type.name); // Pour le style
    pokemonTypes.appendChild(typeElement);
  });
}


async function goPrev() {
  if (currentPokemon > 1) {
    currentPokemon--;
    const pokemon = await getPokemon();
    renderPokemon(pokemon);
  }
}


async function goNext() {
  if (currentPokemon < 893) {
    currentPokemon++;
    const pokemon = await getPokemon();
    renderPokemon(pokemon);
  }
}


prevButton.addEventListener('click', goPrev);
nextButton.addEventListener('click', goNext);


getPokemon().then(renderPokemon);
