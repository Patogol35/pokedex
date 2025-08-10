import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function PokemonDetail() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [evolutionChain, setEvolutionChain] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPokemon()
  }, [name])

  async function fetchPokemon() {
    setLoading(true)
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      setPokemon(res.data)

      // Obtener URL de especie
      const speciesRes = await axios.get(res.data.species.url)
      const evoRes = await axios.get(speciesRes.data.evolution_chain.url)
      const chain = []
      let current = evoRes.data.chain

      // Recorremos cadena de evolución
      while (current) {
        chain.push(current.species.name)
        current = current.evolves_to[0]
      }

      // Obtenemos sprites de cada Pokémon de la cadena
      const detailedChain = await Promise.all(
        chain.map(async (pokeName) => {
          const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
          return {
            name: pokeName,
            img: pokeData.data.sprites.front_default
          }
        })
      )
      setEvolutionChain(detailedChain)

    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  if (loading || !pokemon) return <p>Cargando...</p>

  return (
    <div>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>⬅ Volver</Link>
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          style={{ width: '150px', height: '150px' }}
        />
        <div>
          <h1 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h1>
          <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
          <div>
            <strong>Stats:</strong>
            <ul>
              {pokemon.stats.map(s => (
                <li key={s.stat.name}>
                  {s.stat.name}: {s.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Cadena de evolución visual */}
      <h2>Cadena de evolución</h2>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {evolutionChain.map((p, idx) => (
          <React.Fragment key={p.name}>
            <div style={{ textAlign: 'center' }}>
              <img src={p.img} alt={p.name} style={{ width: '100px', height: '100px' }} />
              <p style={{ textTransform: 'capitalize' }}>{p.name}</p>
            </div>
            {idx < evolutionChain.length - 1 && <span style={{ fontSize: '2rem' }}>➡</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
