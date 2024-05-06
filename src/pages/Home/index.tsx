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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PokemonCard from '../../components/PokemonCard';
import { getPokemonList } from '../../services';

interface Result {
  name: string;
  url: string;
}

function PokemonView(): React.JSX.Element {
  const [pokemonList, setPokemonList] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await getPokemonList({ limit: 151, offset: 0 });

      setPokemonList(response.results);
      setLoading(false);
      return response;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.sectionDescription}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const renderPokemonCard = ({ item }: { item: Result }) => <PokemonCard pokemon={item} />;

  return (

    <FlatList
      data={pokemonList}
      renderItem={renderPokemonCard}
      keyExtractor={item => item.name}
      contentContainerStyle={styles.sectionContainer}
    />

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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
});

export default PokemonView;
