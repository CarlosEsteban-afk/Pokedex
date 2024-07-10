import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/Navigation';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

type TeamViewProps = NativeStackScreenProps<RootStackParamList, 'TeamView'>;

const team = [
  { id: '1', name: 'Pikachu' },
  { id: '2', name: 'Charizard' },
  { id: '3', name: 'Bulbasaur' },
  { id: '4', name: 'Squirtle' },
  { id: '5', name: 'Eevee' },
  { id: '6', name: 'Snorlax' },
];

function TeamView({ navigation }: Readonly<TeamViewProps>): React.JSX.Element {

  const renderItem = ({ item }: { item: { id: string, name: string } }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Mi Equipo Pokémon</Text>
      <FlatList
        data={team}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
  },
});

export default TeamView;
