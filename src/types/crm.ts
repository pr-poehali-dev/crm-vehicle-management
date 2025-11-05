export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  name: string;
  category: string;
  year: number;
  engineNumber: string;
  chassis: string;
  bodyNumber: string;
  color: string;
  power: string;
  displacement: string;
  engineType: string;
  ecoClass: string;
  maxWeight: string;
}

export interface Client {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  passportSeries: string;
  passportNumber: string;
  licenseSeries: string;
  licenseNumber: string;
  licenseDate: string;
  phone: string;
}

export interface Employee {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  position: string;
}