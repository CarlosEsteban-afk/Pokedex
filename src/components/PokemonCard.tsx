import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Touchable, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { getPokemonByName } from '../services';
import pokemonTypeColors from '../utils/getColorByType';
import TypeBadge from './TypeBadge';
import type { Pokemon } from 'pokenode-ts';
import { useNavigation } from '@react-navigation/native';
interface PokemonResources {
  name: string;
  url: string;
}

type PokemonCardProps = {
  pokemon: PokemonResources;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [loading, setLoading] = useState<boolean>();
  const [pkmn, setPkmn] = useState<Pokemon>();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const _pkmn = await getPokemonByName(pokemon.name);
        setPkmn({ ..._pkmn });
        return _pkmn;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, [pokemon.name]);

  const uri = pkmn?.sprites?.front_default;
  const color = pokemonTypeColors[pkmn?.types[0].type.name as string];
  const handlePress = () => {
    //sprites?.other?.['official-artwork']?.front_default;

    const sprite = pkmn?.sprites?.other?.['official-artwork'].front_default;
    const typeUri = pkmn?.types.map((type) => type.type.url);
    navigation.navigate('PokemonDetailView', { pokemon_name: pkmn?.name, uri: sprite, color: color, typeUri: typeUri});
  }
  if (loading) {
    return (
      <View style={[styles.card, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (

    <TouchableOpacity onPress={handlePress}>
      <View style={{ ...styles.card, borderColor: color }} >
        {uri && <Image source={{ uri: uri }} style={styles.image} resizeMode='cover' />}
        <View style={styles.cardInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.pkmnName} adjustsFontSizeToFit numberOfLines={1}>#{pkmn?.id + ' ' + pkmn?.name.charAt(0).toUpperCase() + pkmn?.name.slice(1)}</Text>
          </View>
          <View style={{ ...styles.typeContainer }} >
            {pkmn?.types.map((type) => (
              <TypeBadge key={type.type.name} type={type.type.name} />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderWidth: 5,
    backgroundColor: 'lightyellow',
  },
  image: {
    width: 120,
    height: 120,
  },
  typeName: {
    paddingHorizontal: 9,
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 3,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'black',

    textShadowRadius: 10,
  },
  pkmnName: {
    marginTop: 10,
    fontSize: 20,

  },
  nameContainer: {
    paddingHorizontal: 1,
  },

  loadingContainer: {
    height: 150,
    justifyContent: 'center',
  },
  typeContainer: {
    flexDirection: 'row'
  },
  cardInfo: {
    width: 160,
    height: 110,
    borderWidth: 0,
    flexDirection: 'column'
  }
});

export default React.memo(PokemonCard);