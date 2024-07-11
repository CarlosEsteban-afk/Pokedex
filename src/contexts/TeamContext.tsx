import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Pokemon {
  id: string;
  name: string;
}

interface TeamContextProps {
  team: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (id: string) => void;
}

export const TeamContext = createContext<TeamContextProps | undefined>(undefined);

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [pokemonCounts, setPokemonCounts] = useState<{ [id: string]: number }>({});

  const addPokemon = (pokemon: Pokemon) => {
    setTeam((prevTeam) => [...prevTeam, pokemon]);
    setPokemonCounts((prevCounts) => ({
      ...prevCounts,
      [pokemon.id]: (prevCounts[pokemon.id] || 0) + 1,
    }));
  };

  const removePokemon = (id: string) => {
    const pokemonIndex = team.findIndex((pokemon) => pokemon.id === id);
    if (pokemonIndex !== -1) {
      const updatedTeam = [...team];
      const pokemonToRemove = updatedTeam.splice(pokemonIndex, 1)[0];
      if (pokemonToRemove && pokemonCounts[pokemonToRemove.id] && pokemonCounts[pokemonToRemove.id] > 0) {
        setPokemonCounts((prevCounts) => ({
          ...prevCounts,
          [pokemonToRemove.id]: prevCounts[pokemonToRemove.id] - 1,
        }));
      }
      setTeam(updatedTeam);
    }
  };

  return (
    <TeamContext.Provider value={{ team, addPokemon, removePokemon }}>
      {children}
    </TeamContext.Provider>
  );
};
