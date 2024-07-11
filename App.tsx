import React, { useEffect, useState } from 'react';

import type { PropsWithChildren } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  Button
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './src/types/Navigation';
import HomeView from './src/pages/Home/HomeView';
import PokemonListView from './src/pages/PokemonList/PokemonList';
import PokemonDetailView from './src/pages/PokemonDetail/DetailView';
import TeamView from './src/pages/TeamDetail/TeamView';
import { TeamProvider } from './src/contexts/TeamContext';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'lightblue',
  };

  return (
    <TeamProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <RootStack.Navigator>
          <RootStack.Screen name="HomeView" component={HomeView} options={{ title: 'PokeApp' }} />
          <RootStack.Screen name="PokemonListView" component={PokemonListView} options={{ title: 'Pokedex' }} />
          <RootStack.Screen name="PokemonDetailView" component={PokemonDetailView} options={{ title: 'Pokemon' }} />
          <RootStack.Screen name="TeamView" component={TeamView} options={{ title: 'Team' }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </TeamProvider>
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

export default App;
