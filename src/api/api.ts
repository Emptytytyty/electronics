import type {
  IClient,
  IEmployee,
  IOrder,
  IOrderDetails,
  IProduct,
  IProvider,
  IUser,
} from "../types";

const baseUrl = import.meta.env.VITE_API_URL;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err.error));

type TServerResponse<T> = {
  success: boolean;
  error?: string;
} & T;

export const setCookie = (name: string, value: string) =>
  cookieStore.set({
    name,
    value,
    expires: new Date().getTime() + 60 * 60 * 1000,
    sameSite: "strict",
  });

export const getCookie = (name: string) =>
  cookieStore.get(name).then((res) => res?.value);

export const deleteCookie = (name: string) => cookieStore.delete(name);

type TIdentifier = {
  identifier: string;
};

export type TLoginData = {
  login: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  token: string;
  user: IUser;
}>;

export const loginApi = async (data: TLoginData) =>
  fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) {
        setCookie("token", data.token);
        return data.user;
      }
      return Promise.reject(data.error);
    });

type TLogoutResponse = TServerResponse<{}>;

export const logoutApi = async (user: IUser) =>
  fetch(`${baseUrl}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify({user})
  })
    .then((res) => checkResponse<TLogoutResponse>(res))
    .then((data) => {
      if (data?.success) {
        return;
      }
      return Promise.reject(data.error);
    });

type TClientsFilters = {
  id: number;
  fio: string;
  contact_data: string;
};

type TClientsResponse = TServerResponse<{
  clients: IClient[];
}>;

export const getClientsApi = async (filters: Partial<TClientsFilters>) =>
  fetch(`${baseUrl}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(filters),
  })
    .then((res) => checkResponse<TClientsResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.clients;
      }
      return Promise.reject(data.error);
    });

export const deleteClientApi = async (identifier: TIdentifier) =>
  fetch(`${baseUrl}/clients`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(identifier),
  })
    .then((res) => checkResponse<TClientsResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.clients;
      }
      return Promise.reject(data.error);
    });

export const addClientApi = async (row: Partial<TClientsFilters>) =>
  fetch(`${baseUrl}/clients`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(row),
  })
    .then((res) => checkResponse<TClientsResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.clients;
      }
      return Promise.reject(data.error);
    });

type TProvidersFilters = {
  inn: string;
  address: string;
  phone: string;
  name: string;
};

type TProvidersResponse = TServerResponse<{
  providers: IProvider[];
}>;

export const getProvidersApi = async (filters: Partial<TProvidersFilters>) =>
  fetch(`${baseUrl}/providers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(filters),
  })
    .then((res) => checkResponse<TProvidersResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.providers;
      }
      return Promise.reject(data.error);
    });

export const deleteProviderApi = async (identifier: TIdentifier) =>
  fetch(`${baseUrl}/providers`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(identifier),
  })
    .then((res) => checkResponse<TProvidersResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.providers;
      }
      return Promise.reject(data.error);
    });

export const addProviderApi = async (row: Partial<TProvidersFilters>) =>
  fetch(`${baseUrl}/providers`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(row),
  })
    .then((res) => checkResponse<TProvidersResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.providers;
      }
      return Promise.reject(data.error);
    });

type TProductsFilters = {
  price: number;
  count: number;
  provider: string;
  category: string;
  name: string;
};

type TProductsResponse = TServerResponse<{
  products: IProduct[];
}>;

export const getProductsApi = async (filters: Partial<TProductsFilters>) =>
  fetch(`${baseUrl}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(filters),
  })
    .then((res) => checkResponse<TProductsResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.products;
      }
      return Promise.reject(data.error);
    });

export const deleteProductApi = async (identifier: TIdentifier) =>
  fetch(`${baseUrl}/products`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(identifier),
  })
    .then((res) => checkResponse<TProductsResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.products;
      }
      return Promise.reject(data.error);
    });

export const addProductApi = async (row: Partial<TProductsFilters>) =>
  fetch(`${baseUrl}/products`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(row),
  })
    .then((res) => checkResponse<TProductsResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.products;
      }
      return Promise.reject(data.error);
    });

type TEmployeesFilters = {
  id: number;
  fio: string;
  contact_data: string;
  position: string;
};

type TEmployeesResponse = TServerResponse<{
  employees: IEmployee[];
}>;

export const getEmployeesApi = async (filters: Partial<TEmployeesFilters>) =>
  fetch(`${baseUrl}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(filters),
  })
    .then((res) => checkResponse<TEmployeesResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.employees;
      }
      return Promise.reject(data.error);
    });

export const deleteEmployeeApi = async (identifier: TIdentifier) =>
  fetch(`${baseUrl}/employees`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(identifier),
  })
    .then((res) => checkResponse<TEmployeesResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.employees;
      }
      return Promise.reject(data.error);
    });

export const addEmployeeApi = async (row: Partial<TEmployeesFilters>) =>
  fetch(`${baseUrl}/employees`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(row),
  })
    .then((res) => checkResponse<TEmployeesResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.employees;
      }
      return Promise.reject(data.error);
    });

type TOrdersFilters = {
  total_price: number;
  id: number;
  employee_id: number;
  client_id: string;
};

type TOrdersResponse = TServerResponse<{
  orders: IOrder[];
}>;

export const getOrdersApi = async (filters: Partial<TOrdersFilters>) =>
  fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(filters),
  })
    .then((res) => checkResponse<TOrdersResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.orders;
      }
      return Promise.reject(data.error);
    });

export const deleteOrderApi = async (identifier: TIdentifier) =>
  fetch(`${baseUrl}/orders`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(identifier),
  })
    .then((res) => checkResponse<TOrdersResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.orders;
      }
      return Promise.reject(data.error);
    });

export const addOrderApi = async (row: Partial<TOrdersFilters>) =>
  fetch(`${baseUrl}/orders`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(row),
  })
    .then((res) => checkResponse<TOrdersResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.orders;
      }
      return Promise.reject(data.error);
    });

type TOrderDetailsFilters = {
  price: number;
  id: number;
  product_name: string;
  order_id: number;
  category: string;
};

type TOrderDetailsResponse = TServerResponse<{
  orderDetails: IOrderDetails[];
}>;

export const getOrderDetailsApi = async (
  filters: Partial<TOrderDetailsFilters>
) =>
  fetch(`${baseUrl}/order-details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(filters),
  })
    .then((res) => checkResponse<TOrderDetailsResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.orderDetails;
      }
      return Promise.reject(data.error);
    });

export const deleteOrderDetailsApi = async (identifier: TIdentifier) =>
  fetch(`${baseUrl}/order-details`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(identifier),
  })
    .then((res) => checkResponse<TOrderDetailsResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.orderDetails;
      }
      return Promise.reject(data.error);
    });

export const addOrderDetailsApi = async (row: Partial<TOrderDetailsFilters>) =>
  fetch(`${baseUrl}/order-details`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getCookie("token"),
    } as HeadersInit,
    body: JSON.stringify(row),
  })
    .then((res) => checkResponse<TOrderDetailsResponse>(res))
    .then((data) => {
      if (data?.success) {
        return data.orderDetails;
      }
      return Promise.reject(data.error);
    });
