import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import PokemonCard from '../../components/PokemonCard';
import { getPokemonList } from '../../services';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/Navigation';

interface Result {
  name: string;
  url: string;
}
type PokemonListViewProps = NativeStackScreenProps<RootStackParamList, 'PokemonListView'>;

function PokemonListView({navigation}:Readonly<PokemonListViewProps>): React.JSX.Element {
  const [pokemonList, setPokemonList] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await getPokemonList({ limit: 1000, offset: 0 });
      setPokemonList(response.results);
      setLoading(false);
      return response;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <View style={styles.sectionDescription}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const renderPokemonCard = ({ item }: { item: Result }) => <PokemonCard pokemon={item} />;
  

  return (
    <View style={{backgroundColor:'lightblue'}}>
      <Text style={styles.title}>
        Pokedex
      </Text>
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonCard}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.sectionContainer}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 8,
  }
});

export default PokemonListView;
