// Fetch basic Pokémon data + species info
async function getPokemonData(id) {
  const p = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!p.ok) throw new Error(`Pokémon ${id} not found`);
  const pokemon = await p.json();

  const s = await fetch(pokemon.species.url);
  if (!s.ok) throw new Error(`Species for ${pokemon.name} not found`);
  const species = await s.json();

  const entry = species.flavor_text_entries.find(
    (e) => e.language.name === "en"
  ) || { flavor_text: "No description." };

  return {
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((t) => t.type.name),
    flavorText: entry.flavor_text.replace(/\s+/g, " ").trim(),
    habitat: species.habitat ? species.habitat.name : "unknown",
    isLegendary: species.is_legendary,
  };
}

// Pick a random 1–151 ID, fetch & display
async function assignmentTask() {
  const id = Math.floor(Math.random() * 151) + 1;
  try {
    const data = await getPokemonData(id);
    document.getElementById("output").textContent = JSON.stringify(
      data,
      null,
      2
    );
  } catch (err) {
    document.getElementById("output").textContent = "Error: " + err.message;
  }
}

// Run once page loads
window.addEventListener("load", assignmentTask);
