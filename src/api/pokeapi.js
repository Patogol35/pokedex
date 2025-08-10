import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2'

export async function getPokemons(limit = 20, offset = 0) {
  const res = await axios.get(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`)
  return res.data
}

export async function getPokemonByName(name) {
  const res = await axios.get(`${API_URL}/pokemon/${name.toLowerCase()}`)
  return res.data
}
