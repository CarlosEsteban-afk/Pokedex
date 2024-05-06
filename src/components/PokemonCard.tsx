import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { getPokemonFormByName } from '../services';
import pokemonTypeColors from '../utils/getColorByType';
import PokemonForm from '../types/pokemon';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [uri, setUri] = useState<string>();
  const [color, setColor] = useState<string>();
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const pkmn = await getPokemonFormByName(pokemon.name);
      setPokemonData(pkmn);
      setLoading(false);
      return pkmn;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPokemon();
  }, []);
  const setPokemonData = (pkmn:PokemonForm) => {
    setTypes(pkmn.types.map((type) => type.type.name));
    setColor(pokemonTypeColors[pkmn.types[0].type.name]);
    setUri(pkmn.sprites.front_default ?? '');
  }

  if (loading) {
    return (
      <View style={[styles.card, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={{ ...styles.card, backgroundColor: color }}>
      {uri && <Image source={{ uri: uri }} style={styles.image} />}
      <Text style={styles.name}>{pokemon.name}</Text>
      {types.map((type) => (
        <Text key={type} style={styles.name}>
          {type}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 120,
    height: 120,
  },
  name: {
    marginTop: 10,
  },
  loadingContainer: {
    height: 150,
    justifyContent: 'center',
  },
});

export default PokemonCard;