import React, { useContext } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/Navigation';
import { TeamContext } from '../../contexts/TeamContext';
import PokemonCard from '../../components/PokemonCard';
import AppStyles from '../../styles/AppStyles';

type TeamViewProps = NativeStackScreenProps<RootStackParamList, 'TeamView'>;

const TeamView: React.FC<TeamViewProps> = ({ navigation }: TeamViewProps) => {
  const { team, removePokemon } = useContext(TeamContext);

  const renderPokemonCard = ({ item }: { item: { id: string; name: string } }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveFromTeam(item.id)}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
      <PokemonCard pokemon={{ name: item.name, url: `https://pokeapi.co/api/v2/pokemon/${item.name}` }} />
    </View>
  );

  const handleRemoveFromTeam = (id: string) => {
    removePokemon(id);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Mi Equipo Pokémon</Text>
      <FlatList
        data={team}
        renderItem={renderPokemonCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<Text>No hay pokémones en tu equipo.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: AppStyles.color.primary,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
    position: 'relative', // Ensure the delete button is positioned relative to the card container
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15, // Makes the button circular
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 1, // Ensures the button is above the card
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TeamView;
