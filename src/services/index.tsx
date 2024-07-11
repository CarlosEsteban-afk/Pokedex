import axios from 'axios';
import { PokemonClient, Type } from 'pokenode-ts';

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

const getTest = async (name: string) => {
  try {
    const response = await client.getPokemonSpeciesByName(name);
    return response;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
}
const getPokemonType = async (uri: string) => {
  try {
    
    const typeNumber = uri.match(/\/(\d+)\//);
    const parsedTypeNumber = typeNumber ? parseInt(typeNumber[1]) : 0;
    
    const response = await client.getTypeById(parsedTypeNumber);
    return response;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
}

export { getPokemonList, getPokemonByName, getTest, getPokemonType };
