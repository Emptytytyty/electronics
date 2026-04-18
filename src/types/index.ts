export interface IProduct {
  name: string,
  provider: string,
  category: string,
  price: number,
  count: number
}

export interface IEmployee {
  id: number,
  fio: string,
  position: string,
  contact_data: string,
  admission_date: Date,
  dismissal_date: Date | null,
}

export interface IProvider {
  name: string,
  address: string,
  phone: string,
  inn: number
}

export interface IClient {
  id: number,
  fio: string,
  contact_data: string,
}

export interface IOrder {
  id: number,
  client_id: number,
  employee_id: number,
  date: Date,
  total_price: number
}

export interface IOrderDetails {
  id: number,
  order_id: number,
  product_name: string,
  product_count: number,
  price: number
}

export interface IAccount {
  id: number;
  password: string;
  login: string;
  role: role;
  employee_id: number;
}

export type IUser = string;

export type tables = IProduct | IProvider | IClient | IOrder | IOrderDetails | IEmployee | IAccount

export type tableType = 'products' | 'providers' | 'clients' | 'employees' | 'orders' | 'orderDetails';

export type role = 'admin' | 'manager' | 'merch';