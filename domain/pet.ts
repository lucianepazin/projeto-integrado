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
