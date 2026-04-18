import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import type {
  IClient,
  IEmployee,
  IOrder,
  IOrderDetails,
  IProduct,
  IProvider,
} from "../../types";
import {
  addClientApi,
  addEmployeeApi,
  addOrderApi,
  addOrderDetailsApi,
  addProductApi,
  addProviderApi,
  deleteClientApi,
  deleteEmployeeApi,
  deleteOrderApi,
  deleteOrderDetailsApi,
  deleteProductApi,
  deleteProviderApi,
  getClientsApi,
  getEmployeesApi,
  getOrderDetailsApi,
  getOrdersApi,
  getProductsApi,
  getProvidersApi,
} from "../../api/api";

export type TMainDataState = {
  orders: IOrder[];
  employees: IEmployee[];
  clients: IClient[];
  orderDetails: IOrderDetails[];
  providers: IProvider[];
  products: IProduct[];
  dataError: null | string;
  dataRequest: boolean;
};

const initialState: TMainDataState = {
  orders: [],
  orderDetails: [],
  clients: [],
  employees: [],
  products: [],
  providers: [],
  dataError: null,
  dataRequest: false,
};

export const getOrdersAction = createAsyncThunk("orders/get", getOrdersApi);
export const deleteOrderAction = createAsyncThunk("orders/delete", deleteOrderApi);
export const addOrderAction = createAsyncThunk("orders/add", addOrderApi);

export const getClientsAction = createAsyncThunk("clients/get", getClientsApi);
export const deleteClientAction = createAsyncThunk("clients/delete", deleteClientApi);
export const addClientAction = createAsyncThunk("clients/add", addClientApi);

export const getProvidersAction = createAsyncThunk(
  "providers/get",
  getProvidersApi
);
export const deleteProviderAction = createAsyncThunk(
  "providers/delete",
  deleteProviderApi
);
export const addProviderAction = createAsyncThunk(
  "providers/add",
  addProviderApi
);

export const getProductsAction = createAsyncThunk(
  "products/get",
  getProductsApi
);
export const deleteProductAction = createAsyncThunk(
  "products/delete",
  deleteProductApi
);
export const addProductAction = createAsyncThunk(
  "products/add",
  addProductApi
);

export const getEmployeesAction = createAsyncThunk(
  "employees/get",
  getEmployeesApi
);
export const deleteEmployeeAction = createAsyncThunk(
  "employees/delete",
  deleteEmployeeApi
);
export const addEmployeeAction = createAsyncThunk(
  "employees/add",
  addEmployeeApi
);

export const getOrderDetailsAction = createAsyncThunk(
  "order-details/get",
  getOrderDetailsApi
);
export const deleteOrderDetailsAction = createAsyncThunk(
  "order-details/delete",
  deleteOrderDetailsApi
);
export const addOrderDetailsAction = createAsyncThunk(
  "order-details/add",
  addOrderDetailsApi
);

export const MainDataSlice = createSlice({
  name: "main-data",
  initialState,
  reducers: {
    clearStore: (state: TMainDataState) => {
      state.orders = [];
      state.orderDetails = [];
      state.clients = [];
      state.employees = [];
      state.products = [];
      state.providers = [];
      state.dataError = null;
      state.dataRequest = false;
      return state;
    },
    clearDataError: (state: TMainDataState) => ({ ...state, dataError: null }),
  },
  selectors: {
    getOrdersSelector: (state: TMainDataState) => state.orders,
    getClientsSelector: (state: TMainDataState) => state.clients,
    getProvidersSelector: (state: TMainDataState) => state.providers,
    getProductsSelector: (state: TMainDataState) => state.products,
    getEmployeesSelector: (state: TMainDataState) => state.employees,
    getOrderDetailsSelector: (state: TMainDataState) => state.orderDetails,
    getDataRequest: (state: TMainDataState) => state.dataRequest,
    getDataError: (state: TMainDataState) => state.dataError,
  },
  extraReducers: (builder) => {
    builder
      // Клиенты
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") && action.type.startsWith("clients"),
        (state, action: {payload: IClient[]}) => {
        state.clients = action.payload;
        state.dataRequest = false;
      }
      )
      // Поставщики
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") && action.type.startsWith("providers"),
        (state, action: {payload: IProvider[]}) => {
        state.providers = action.payload;
        state.dataRequest = false;
      }
      )
      // Товары
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") && action.type.startsWith("products"),
        (state, action: {payload: IProduct[]}) => {
        state.products = action.payload;
        state.dataRequest = false;
      }
      )
      // Сотрудники
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") && action.type.startsWith("employees"),
        (state, action: {payload: IEmployee[]}) => {
        state.employees = action.payload;
        state.dataRequest = false;
      }
      )
      // Заказы
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") && action.type.startsWith("orders"),
        (state, action: {payload: IOrder[]}) => {
        state.orders = action.payload;
        state.dataRequest = false;
      }
      )
      // Детали заказов
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") && action.type.startsWith("order-details"),
        (state, action: {payload: IOrderDetails[]}) => {
        state.orderDetails = action.payload;
        state.dataRequest = false;
      }
      )
      // Pending
      .addMatcher(
        (action) => action.type.endsWith("/pending") && /(clients|providers|products|employees|orders|order-details|accounts)/.test(action.type),
        (state) => {
          state.dataRequest = true;
          state.dataError = null;
        }
      )
      // Rejected
      .addMatcher(
        (action) => action.type.endsWith("/rejected") && /(clients|providers|products|employees|orders|order-details|accounts)/.test(action.type),
        (state, action: { error: { message: string } }) => {
          state.dataRequest = false;
          state.dataError = action.error.message;
        }
      );
  },
});

export const {
  getOrdersSelector,
  getDataRequest,
  getDataError,
  getClientsSelector,
  getProvidersSelector,
  getProductsSelector,
  getEmployeesSelector,
  getOrderDetailsSelector,
} = MainDataSlice.selectors;
export const { clearStore, clearDataError } = MainDataSlice.actions;
