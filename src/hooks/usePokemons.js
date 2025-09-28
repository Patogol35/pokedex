// src/hooks/usePokemons.js
import { useEffect, useState } from "react";
import { getPokemons, getPokemonByName } from "../api/pokeapi";

export default function usePokemons(limit = 20, totalPokemons = 151) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(totalPokemons / limit);

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchPokemons() {
    setLoading(true);
    try {
      const data = await getPokemons(limit, (page - 1) * limit);
      const detailed = await Promise.all(
        data.results.map(async (p) => await getPokemonByName(p.name))
      );
      setPokemons(detailed);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  async function handleSearch(name) {
    setLoading(true);
    try {
      const result = await getPokemonByName(name);
      setPokemons([result]);
    } catch (error) {
      alert("Pokémon no encontrado");
    }
    setLoading(false);
  }

  return {
    pokemons,
    loading,
    page,
    setPage,
    totalPages,
    handleSearch,
  };
    }
