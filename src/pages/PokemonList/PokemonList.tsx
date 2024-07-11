import React, { useEffect, useState, useCallback } from 'react';
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
import AppStyles from '../../styles/AppStyles';

interface Result {
  name: string;
  url: string;
}
type PokemonListViewProps = NativeStackScreenProps<RootStackParamList, 'PokemonListView'>;

function PokemonListView({ navigation }: Readonly<PokemonListViewProps>): React.JSX.Element {
  const [pokemonList, setPokemonList] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const limit = 20

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await getPokemonList({ limit, offset: (page - 1) * limit });
      if (response.results.length > 0) {
        setPokemonList(prevList => [...prevList, ...response.results]);
        setPage(prevPage => prevPage + 1);
      }else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  }

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchPokemon();
    }
  }, [loading, hasMore]);

  useEffect(() => {
    fetchPokemon();
  }, []);

 const renderFooter = () => {
    if (loading) {
      return (
        <View style={styles.sectionDescription}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return null;
  };
  const renderPokemonCard = ({ item }: { item: Result }) => <PokemonCard pokemon={item} />;


  return (
    <View style={{ backgroundColor: AppStyles.color.primary }}>
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonCard}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.sectionContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        removeClippedSubviews
        ListFooterComponent={renderFooter}
        initialNumToRender={10} 
        // showsVerticalScrollIndicator={false}
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
