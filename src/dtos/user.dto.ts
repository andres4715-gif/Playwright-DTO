import { BaseDTO } from './base.dto';

export class GeoDTO extends BaseDTO {
  lat: string;
  lng: string;

  constructor(lat: string = '', lng: string = '') {
    super();
    this.lat = lat;
    this.lng = lng;
  }
}

export class AddressDTO extends BaseDTO {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoDTO;

  constructor(
    street: string = '',
    suite: string = '',
    city: string = '',
    zipcode: string = '',
    geo: GeoDTO = new GeoDTO()
  ) {
    super();
    this.street = street;
    this.suite = suite;
    this.city = city;
    this.zipcode = zipcode;
    this.geo = geo;
  }
}

export class CompanyDTO extends BaseDTO {
  name: string;
  catchPhrase: string;
  bs: string;

  constructor(name: string = '', catchPhrase: string = '', bs: string = '') {
    super();
    this.name = name;
    this.catchPhrase = catchPhrase;
    this.bs = bs;
  }
}

export class UserDTO extends BaseDTO {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: AddressDTO;
  phone: string;
  website: string;
  company: CompanyDTO;

  constructor(
    name: string = '',
    username: string = '',
    email: string = '',
    address: AddressDTO = new AddressDTO(),
    phone: string = '',
    website: string = '',
    company: CompanyDTO = new CompanyDTO(),
    id?: number
  ) {
    super();
    this.name = name;
    this.username = username;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.company = company;
    this.id = id;
  }
}
