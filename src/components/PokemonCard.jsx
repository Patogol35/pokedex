import React from 'react'
import { Link } from 'react-router-dom'

export default function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="card" style={{
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: '120px', height: '120px' }}
      />
      <h3 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h3>
    </Link>
  )
}
