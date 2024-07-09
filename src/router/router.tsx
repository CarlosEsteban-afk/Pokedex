
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/Navigation';
import HomeView from '../pages/Home/HomeView';
import PokemonListView from '../pages/PokemonList/PokemonList';
import PokemonDetailView from '../pages/PokemonDetail/DetailView';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="HomeView" component={HomeView} options={{ title: 'PokeApp' }} />
            <RootStack.Screen name="PokemonListView" component={PokemonListView} options={{ title: 'Pokedex' }} />
            <RootStack.Screen name="PokemonDetailView" component={PokemonDetailView} options={{ title: 'Pokemon' }} />
        </RootStack.Navigator>
    )
}

export default Router;