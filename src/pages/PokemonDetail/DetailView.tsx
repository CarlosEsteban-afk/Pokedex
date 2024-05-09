import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/Navigation';
import { getPokemonByName } from '../../services';
import type { Pokemon } from 'pokenode-ts';
import pokemonTypeColors from '../../utils/getColorByType';

type PokemonListViewProps = NativeStackScreenProps<RootStackParamList, 'PokemonDetailView'>;

function PokemonDetailView({ route }: Readonly<PokemonListViewProps>): React.JSX.Element {
  const { pokemon_name } = route.params;

  const [loading, setLoading] = useState<boolean>();
  const [pkmn, setPkmn] = useState<Pokemon>();

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const _pkmn = await getPokemonByName(pokemon_name as string);
        setPkmn({ ..._pkmn });
        return _pkmn;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, [pokemon_name]);

  if (!pkmn) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const uri = pkmn?.sprites.front_default;
  const color = pokemonTypeColors[pkmn.types[0].type.name]
  return (
 
    <View style={{ ...styles.container, backgroundColor: 'lightblue' }}>

     <View style={{
      backgroundColor:'lightyellow',
        borderWidth:4,
        borderColor:color,
        borderRadius:120,
        margin:15,
     }}>
     {uri && <Image source={{ uri: uri }} style={{ width: 200, height: 200 , margin:15}} />}
     </View>
     <Text>#{pkmn?.id+' '+pkmn?.name}</Text>

    </View>

   

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

export default PokemonDetailView;
