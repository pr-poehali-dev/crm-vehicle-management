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

export interface EmployeePermissions {
  vehicles_add?: boolean;
  vehicles_edit?: boolean;
  vehicles_delete?: boolean;
  vehicles_hide?: boolean;
  clients_add?: boolean;
  clients_edit?: boolean;
  clients_delete?: boolean;
  clients_hide?: boolean;
  employees_add?: boolean;
  employees_edit?: boolean;
  employees_delete?: boolean;
  employees_hide?: boolean;
}

export interface Employee {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  position: string;
  username?: string;
  password?: string;
  permissions?: EmployeePermissions;
}