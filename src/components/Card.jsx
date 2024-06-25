import React, { useEffect, useState } from 'react';

const Card = ({ pokemonId }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
        const data = await response.json();
        setPokemon(data);

        // Get region from the first game index version if available
        if (data.game_indices && data.game_indices.length > 0) {
          const versionUrl = data.game_indices[0].version.url;
          const versionResponse = await fetch(versionUrl);
          const versionData = await versionResponse.json();
          if (versionData.region) {
            const regionResponse = await fetch(versionData.region.url);
            const regionData = await regionResponse.json();
            setRegion(regionData.name);
          } else {
            setRegion('Unknown');
          }
        } else {
          setRegion('Unknown');
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Find attack and defense stats
  const attackStat = pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 'N/A';
  const defenseStat = pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 'N/A';

  return (
    <div className="max-w-xs p-6  bg-gradient-to-r from-rose-600 to-red-400 rounded-lg shadow-2xl hover:shadow-lg hover:bg-gradient-to-r hover:from-red-400 hover:to-rose-600 text-white ">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Attack</span>
          <span>{attackStat}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Defense</span>
          <span>{defenseStat}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Height</span>
          <span>{pokemon.height}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Weight</span>
          <span>{pokemon.weight}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Abilities</span>
          <span>{pokemon.abilities.map(ability => ability.ability.name).join(', ')}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Base Experience</span>
          <span>{pokemon.base_experience}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
