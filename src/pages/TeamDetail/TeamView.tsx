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
      <PokemonCard pokemon={{ name: item.name, url: `https://pokeapi.co/api/v2/pokemon/${item.name}` }} />
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveFromTeam(item.id)}>
        <Text style={styles.deleteText}>Remove</Text>
      </TouchableOpacity>
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
        ListEmptyComponent={<Text>No Pokémon in your team.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: 'lightblue',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 80,
    padding: 6,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TeamView;
