interface City {
  code: number;
  name: string;
}

interface Unit {
  document: string;
  city: City;
  state: string;
  name: string;
  companyName: string;
}

interface Ngo {
  document: string;
  name: string;
}

interface Image {
  thumb: string;
  photo: string;
}

export interface Pet {
  mouraId: number;
  name: string;
  microchip: string;
  unit: Unit;
  ngo: Ngo;
  gender: string;
  size: string;
  cadpetzId: number;
  image: Image;
  birthDate: string;
  weight: number;
  specie: string;
  favorite: boolean;
}
