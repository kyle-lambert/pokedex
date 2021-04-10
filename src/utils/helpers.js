const buildTypes = (types) => {
  if (!types || !Array.isArray(types)) return [];
  return types.map((t) => t.type.name);
};

const buildStats = (stats) => {
  if (!stats || !Array.isArray(stats)) return [];
  return stats.map((s) => {
    return {
      score: s.base_stat,
      name: s.stat.name,
    };
  });
};

const buildAbilities = (abilities) => {
  if (!abilities || !Array.isArray(abilities)) return [];
  return abilities.map((a) => a.ability.name);
};

export const buildPokemonJSON = (pokemon) => {
  const obj = {
    name: pokemon.name,
    id: pokemon.id,
    height: pokemon.height,
    weight: pokemon.weight,
    moves: Array.isArray(pokemon.moves) ? pokemon.moves.length : 0,
    abilities: buildAbilities(pokemon.abilities),
    stats: buildStats(pokemon.stats),
    types: buildTypes(pokemon.types),
    defaultImage: pokemon.sprites?.front_default || null,
    image: `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`,
  };

  return obj;
};
