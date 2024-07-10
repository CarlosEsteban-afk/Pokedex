import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/Navigation';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

type HomeViewProps = NativeStackScreenProps<RootStackParamList, 'HomeView'>;

function HomeView({ navigation }: Readonly<HomeViewProps>): React.JSX.Element {

  const handleClick = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  }

  return (
    <View style={{ ...styles.sectionContainer, backgroundColor: 'lightblue' }}>
      <Text style={[styles.sectionTitle, { textAlign: 'center', fontSize: 32 }]}>¡Bienvenido a tu Pokédex!</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleClick('PokemonListView')}>
        <Text style={styles.buttonText}>Pokedex</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleClick('TeamView')}>
        <Text style={styles.buttonText}>Equipo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default HomeView;
