interface TypeColor {
  name: string;
  color: string;
}

interface TypeColorMap {
  [key: string]: TypeColor;
}
const typeColor: TypeColorMap = {
  Normal: {
    name: 'nrml',
    color: '#A8A77A',
  },
  Lucha: {
    name: 'ftg',
    color: '#C22E28',
  },
  Volador: {
    name: 'fly',
    color: '#A98FF3',
  },
  Veneno: {
    name: 'psn',
    color: '#A33EA1',
  },
  Tierra: {
    name: 'grnd',
    color: '#E2BF65',
  },
  Roca: {
    name: 'rck',
    color: '#B6A136',
  },
  Bicho: {
    name: 'bug',
    color: '#A6B91A',
  },
  Fantasma: {
    name: 'ghst',
    color: '#735797',
  },
  Acero: {
    name: 'stl',
    color: '#B7B7CE',
  },
  Fuego: {
    name: 'fire',
    color: '#FA6C6C',
  },
  Agua: {
    name: 'wter',
    color: '#6390F0',
  },
  Planta: {
    name: 'grss',
    color: '#48CFB2',
  },
  Eléctrico: {
    name: 'elctrc',
    color: '#F7D02C',
  },
  Psíquico: {
    name: 'psy',
    color: '#F95587',
  },
  Hielo: {
    name: 'ice',
    color: '#96D9D6',
  },
  Dragón: {
    name: 'drgn',
    color: '#6F35FC',
  },
  Siniestro: {
    name: 'drk',
    color: '#705746',
  },
  Hada: {
    name: 'fry',
    color: '#D685AD',
  },
};

export default typeColor;
