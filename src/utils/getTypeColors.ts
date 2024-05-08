interface TypeColor {
    name: string;
    color: string;
  }
  
  interface TypeColorMap {
    [key: string]: TypeColor;
  }
const typeColor:TypeColorMap = {
  normal: {
    name: 'nrml',
    color: '#A8A77A',
  },
  fighting: {
    name: 'ftg',
    color: '#C22E28',
  },
  flying: {
    name: 'fly',
    color: '#A98FF3',
  },
  poison: {
    name: 'psn',
    color: '#A33EA1',
  },
  ground: {
    name: 'grnd',
    color:  '#E2BF65',
  },
  rock: {
    name: 'rck',
    color: '#B6A136',
  },
  bug: {
    name: 'bug',
    color:  '#A6B91A',
  },
  ghost: {
    name: 'ghst',
    color: '#735797',
  },
  steel: {
    name: 'stl',
    color: '#B7B7CE',
  },
  fire: {
    name: 'fire',
    color:  '#FA6C6C'
  },
  water: {
    name: 'wter',
    color: '#6390F0',
  },
  grass: {
    name: 'grss',
    color: '#48CFB2',
  },
  electric: {
    name: 'elctrc',
    color: '#F7D02C',
  },
  psychic: {
    name: 'psy',
    color: '#F95587',
  },
  ice: {
    name: 'ice',
    color: '#96D9D6',
  },
  dragon: {
    name: 'drgn',
    color: '#6F35FC',
  },
  dark: {
    name: 'drk',
    color: '#705746',
  },
  fairy: {
    name: 'fry',
    color: '#D685AD',
  },
};

export default typeColor;
