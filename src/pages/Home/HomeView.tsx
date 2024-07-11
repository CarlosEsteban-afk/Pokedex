import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/Navigation';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import AppStyles from '../../styles/AppStyles';

type HomeViewProps = NativeStackScreenProps<RootStackParamList, 'HomeView'>;

function HomeView({ navigation }: Readonly<HomeViewProps>): React.JSX.Element {

  const handleClick = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as "HomeView" | "PokemonListView" | "TeamView");
  }

  return (
    <View style={[styles.sectionContainer, { backgroundColor: AppStyles.color.primary }]}>
      <Text style={[styles.sectionTitle, { textAlign: 'center', fontSize: 32, color: AppStyles.color.textdark }]}>¡Bienvenido a tu Pokédex!</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: AppStyles.color.secondary }]} onPress={() => handleClick('PokemonListView')}>
        <Text style={[styles.buttonText, { color: AppStyles.color.textwhite }]}>Pokedex</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: AppStyles.color.secondary }]} onPress={() => handleClick('TeamView')}>
        <Text style={[styles.buttonText, { color: AppStyles.color.textwhite }]}>Equipo</Text>
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
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});

export default HomeView;
