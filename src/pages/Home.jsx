import React from "react";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import usePokemons from "../hooks/usePokemons";

export default function Home() {
  const { pokemons, loading, page, setPage, totalPages, handleSearch } =
    usePokemons(20, 151);

  return (
    <div>
      <Search onSearch={handleSearch} />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {pokemons.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}
