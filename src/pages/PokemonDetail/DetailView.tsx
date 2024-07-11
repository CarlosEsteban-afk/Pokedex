import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/Navigation';
import { getTest, getPokemonType } from '../../services';
import type { PokemonSpecies, PokemonType } from 'pokenode-ts';
import { TeamContext,  } from '../../contexts/TeamContext';
import pokemonTypeColors from '../../utils/getColorByType'; // Import your color utility
import AppStyles from '../../styles/AppStyles';

type PokemonDetailViewProps = NativeStackScreenProps<RootStackParamList, 'PokemonDetailView'>;

const PokemonDetailView = ({ route, navigation }: PokemonDetailViewProps): React.JSX.Element => {
  const { pokemon_name, uri, color, typeUri } = route.params;
  const { addPokemon } = useContext(TeamContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [pkmnSpecie, setPkmnSpecie] = useState<PokemonSpecies>();
  const [types, setTypes] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false); // State for showing toast message

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

  useEffect(() => {
    fetchPokemon();
    fetchTypes();
  }, [pokemon_name, typeUri]);

  const handleAddToTeam = () => {
    if (pkmnSpecie) {
      addPokemon({ id: pkmnSpecie.id.toString(), name: pkmnSpecie.name });
      setShowToast(true); // Show the toast message
      setTimeout(() => setShowToast(false), 2000); // Hide the toast after 2 seconds
    }
  };

  if (loading || !pkmnSpecie) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const spanishFlavorTexts = pkmnSpecie.flavor_text_entries.filter(entry => entry.language.name === 'es');

  return (
    <View style={[...styles.container, { backgroundColor: AppStyles.color.primary }]}>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: color }]}
        onPress={handleAddToTeam}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      {showToast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Added to team!</Text>
        </View>
      )}

      <View style={[styles.imageContainer, { borderColor: color }]}>
        {uri && <Image source={{ uri }} style={styles.image} />}
      </View>

      <Text style={styles.title}>
        #{pkmnSpecie?.id + ' ' + pkmnSpecie?.name.charAt(0).toUpperCase() + pkmnSpecie?.name.slice(1)}
        #{pkmnSpecie?.id + ' ' + pkmnSpecie?.name.charAt(0).toUpperCase() + pkmnSpecie?.name.slice(1)}
      </Text>
      <Text style={styles.types}>
        {types.map((type, index) => (
          <Text key={type} style={styles.boldText}>
            {type}
            {index < types.length - 1 ? ', ' : ''}
          </Text>
        ))}
      </Text>

      <ScrollView style={[styles.descriptionContainer, { borderColor: color }]}>

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
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  toast: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toastText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PokemonDetailView;
