export interface Company {
  name: String;
  email: String;
  vat: String;
  phone: String;
  country: String;
  website: String;
  image: String;
  addresses: Array<Address>;
  contact: Contact;
}
export interface APIResponse<T> {
  results: Array<T>;
}
export interface Address {
  street: String;
  streetName: String;
  buildingNumber: String;
  city: String;
  zipcode: String;
  country: String;
  county_code: String;
  latitude: String;
  longitude: String;
  company: Company;
}

export interface Contact {
  firstname: String;
  lastname: String;
  email: String;
  phone: String;
  birthday: String;
  gender: String;
  website: String;
  image: String;
}
export interface Marker {
  lat: String;
  long: string;
}
