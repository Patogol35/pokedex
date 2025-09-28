import { useEffect, useState } from "react";
import axios from "axios";

export default function usePokemonDetail(name) {
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name) fetchPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  async function fetchPokemon() {
    setLoading(true);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(res.data);

      const speciesRes = await axios.get(res.data.species.url);
      const evoRes = await axios.get(speciesRes.data.evolution_chain.url);

      const chain = [];
      let current = evoRes.data.chain;
      while (current) {
        chain.push(current.species.name);
        current = current.evolves_to[0];
      }

      const detailedChain = await Promise.all(
        chain.map(async (pokeName) => {
          const pokeData = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokeName}`
          );
          return {
            name: pokeName,
            img: pokeData.data.sprites.front_default,
          };
        })
      );
      setEvolutionChain(detailedChain);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return { pokemon, evolutionChain, loading };
}
