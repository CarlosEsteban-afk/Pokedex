  import React, { useEffect, useState } from 'react';
  import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
  import { getPokemonFormByName } from '../services';
  import pokemonTypeColors from '../utils/getColorByType';
  import PokemonForm from '../types/pokemon';
  import TypeBadge from './TypeBadge';
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
    const [idPkmn, setIdPkmn] = useState<number>();
    const [namePkmn, setNamePkmn] = useState<string>();

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
    const setPokemonData = (pkmn: PokemonForm) => {

      setTypes(pkmn.types.map((type) => type.type.name));
      setColor(pokemonTypeColors[pkmn.types[0].type.name]);
      setUri(pkmn.sprites.front_default ?? '');
      setIdPkmn(pkmn.id);
      setNamePkmn(pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1));

    }

    if (loading) {
      return (
        <View style={[styles.card, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={{ ...styles.card, borderColor: color }}>

        {uri && <Image source={{ uri: uri }} style={styles.image} resizeMode='cover' />}


        <View style={styles.cardInfo}>

          <View style={styles.nameContainer}>

            <Text style={styles.pkmnName} adjustsFontSizeToFit numberOfLines={1}>#{idPkmn + ' ' + namePkmn}</Text>

          </View>

          <View style={{ ...styles.typeContainer }} >

            {types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}



          </View>

        </View>


      </View>
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

  export default PokemonCard;