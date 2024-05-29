import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/Navigation';
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

type HomeViewProps = NativeStackScreenProps<RootStackParamList, 'HomeView'>;

function HomeView({ navigation }: Readonly<HomeViewProps>): React.JSX.Element {

  const handleClick = () => {
    navigation.navigate('PokemonListView');
  }
  return (
    <View style={{ ...styles.sectionContainer, backgroundColor: 'lightblue' }}>
      <Text style={[styles.sectionTitle, { textAlign: 'center', fontSize: 32 }]}>Welcome to the Pokedex!</Text>
      <Button title="Go to Pokedex" onPress={handleClick} />
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
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },


});

export default HomeView;
