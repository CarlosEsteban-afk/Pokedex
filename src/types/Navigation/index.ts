
export type RootStackParamList = {
  HomeView: undefined;
  PokemonListView: undefined;
  PokemonDetailView: {pokemon_name: string | undefined};
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
