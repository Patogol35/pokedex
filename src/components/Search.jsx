import React, { useState } from 'react'

export default function Search({ onSearch }) {
  const [term, setTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (term.trim() === '') return
    onSearch(term)
    setTerm('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          width: '200px',
          marginRight: '0.5rem'
        }}
      />
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          background: '#ff1c1c',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Buscar
      </button>
    </form>
  )
}
