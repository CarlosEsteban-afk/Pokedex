import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/Navigation';
import { getTest, getPokemonType } from '../../services';
import type { PokemonSpecies, PokemonType } from 'pokenode-ts';

type PokemonDetailViewProps = NativeStackScreenProps<RootStackParamList, 'PokemonDetailView'>;

const PokemonDetailView = ({ route }: Readonly<PokemonDetailViewProps>): React.JSX.Element => {
  const { pokemon_name, uri, color, typeUri } = route.params;

  const [loading, setLoading] = useState<boolean>(true);
  const [pkmnSpecie, setPkmnSpecie] = useState<PokemonSpecies>();
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const _pkmnSpecie = await getTest(pokemon_name as string);
        setPkmnSpecie(_pkmnSpecie);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTypes = async () => {
      if (!typeUri) return;
      try {

        const fetchedTypes = await Promise.all(typeUri.map(uri => getPokemonType(uri)));
        const spanishTypeNames = fetchedTypes.map(type =>
          type.names.find(name => name.language.name === 'es')?.name as string          

        );
        setTypes(spanishTypeNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
    fetchTypes();
  }, [pokemon_name, typeUri]);

  if (loading || !pkmnSpecie) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const spanishFlavorTexts = pkmnSpecie.flavor_text_entries.filter(entry => entry.language.name === 'es');

  return (
    <View style={[styles.container, { backgroundColor: 'lightblue' }]}>
      <View style={[styles.imageContainer, { borderColor: color }]}>
        {uri && <Image source={{ uri }} style={styles.image} />}
      </View>

      <Text style={styles.title}>
        #{pkmnSpecie.id} {pkmnSpecie.name}
      </Text>

      <ScrollView style={[styles.descriptionContainer, { borderColor: color }]}>
        <Text style={styles.types}>
          {types.map((type, index) => (
            <Text key={type} style={styles.boldText}>
              {type}
              {index < types.length - 1 ? ', ' : ''}
            </Text>
          ))}
        </Text>

        <Text style={styles.description}>
          {spanishFlavorTexts[2]?.flavor_text.replace(/[\n\f]/g, ' ')}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: 'lightyellow',
    borderWidth: 4,
    borderRadius: 120,
    margin: 15,
  },
  image: {
    width: 200,
    height: 200,
    margin: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  descriptionContainer: {
    marginVertical: 30,
    padding: 15,
    backgroundColor: 'lightyellow',
    width: 350,
    borderRadius: 12,
    borderWidth: 4,
  },
  types: {
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
  },
});

export default PokemonDetailView;
