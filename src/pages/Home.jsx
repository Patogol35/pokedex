import React, { useEffect, useState } from 'react'
import { getPokemons, getPokemonByName } from '../api/pokeapi'
import PokemonCard from '../components/PokemonCard'
import Pagination from '../components/Pagination'
import Search from '../components/Search'

export default function Home() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const limit = 20
  const totalPokemons = 151 // Primera generación
  const totalPages = Math.ceil(totalPokemons / limit)

  useEffect(() => {
    fetchPokemons()
  }, [page])

  async function fetchPokemons() {
    setLoading(true)
    try {
      const data = await getPokemons(limit, (page - 1) * limit)
      const detailed = await Promise.all(
        data.results.map(async (p) => await getPokemonByName(p.name))
      )
      setPokemons(detailed)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  async function handleSearch(name) {
    setLoading(true)
    try {
      const result = await getPokemonByName(name)
      setPokemons([result])
    } catch (error) {
      alert('Pokémon no encontrado')
    }
    setLoading(false)
  }

  return (
    <div>
      <Search onSearch={handleSearch} />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          {pokemons.map(p => (
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
  )
}
