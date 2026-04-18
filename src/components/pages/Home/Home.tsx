import { TabsPanel } from "../../TabsPanel/TabsPanel";

import {
  addClientAction,
  addEmployeeAction,
  addOrderAction,
  addOrderDetailsAction,
  addProductAction,
  addProviderAction,
  deleteClientAction,
  deleteEmployeeAction,
  deleteOrderAction,
  deleteOrderDetailsAction,
  deleteProductAction,
  deleteProviderAction,
  getClientsAction,
  getClientsSelector,
  getEmployeesAction,
  getEmployeesSelector,
  getOrderDetailsAction,
  getOrderDetailsSelector,
  getOrdersAction,
  getOrdersSelector,
  getProductsAction,
  getProductsSelector,
  getProvidersAction,
  getProvidersSelector,
} from "../../../services/slices/MainDataSlice";

export const Home = () => {
  const tabs = [
    {
      getAction: getClientsAction,
      deleteAction: deleteClientAction,
      addAction: addClientAction,
      filters: ["id", "fio", "contact_data"],
      tabName: "Клиенты",
      selector: getClientsSelector,
    },
    {
      getAction: getProvidersAction,
      deleteAction: deleteProviderAction,
      addAction: addProviderAction,
      filters: ["name", "inn", "address", "phone"],
      tabName: "Поставщики",
      selector: getProvidersSelector,
    },
    {
      getAction: getProductsAction,
      deleteAction: deleteProductAction,
      addAction: addProductAction,
      filters: ["name", "count", "price", "provider", "category"],
      tabName: "Товары",
      selector: getProductsSelector,
    },
    {
      getAction: getEmployeesAction,
      deleteAction: deleteEmployeeAction,
      addAction: addEmployeeAction,
      filters: ["id", "position", "fio", "contact_data", 'admission_date', 'dismissal_date'],
      tabName: "Сотрудники",
      selector: getEmployeesSelector,
    },
    {
      getAction: getOrdersAction,
      deleteAction: deleteOrderAction,
      addAction: addOrderAction,
      filters: ["id", "employee_id", "client_id", "total_price", 'date'],
      tabName: "Заказы",
      selector: getOrdersSelector,
    },
    {
      getAction: getOrderDetailsAction,
      deleteAction: deleteOrderDetailsAction,
      addAction: addOrderDetailsAction,
      filters: ["id", "order_id", "product_name", "count", "price"],
      tabName: "Детали Заказов",
      selector: getOrderDetailsSelector,
    },
  ];

  return (
    <>
      <TabsPanel tabs={tabs}></TabsPanel>
    </>
  );
};
