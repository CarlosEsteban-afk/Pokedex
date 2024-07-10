export type RootStackParamList = {
  HomeView: undefined;
  PokemonListView: undefined;
  PokemonDetailView: {
    pokemon_name: string | undefined;
    uri: string | null | undefined;
    color: string | undefined;
  };
  TeamView: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
