import { PokemonClient } from 'pokenode-ts';

interface PokemonListProps {
  limit: number;
  offset: number;
}
const client = new PokemonClient();

const getPokemonList = async ({
  limit,
  offset,
}: PokemonListProps) => {
  try {
    const response = await client.listPokemons(offset, limit);
    return response;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

const getPokemonByName = async (name: string) => {
  try {
    const response = await client.getPokemonByName(name);
    return response;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
};
export { getPokemonList, getPokemonByName };
