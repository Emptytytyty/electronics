import dotenv from "dotenv";
import { log } from "console";

dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}

export const getData = async ({
  filters = {},
  con,
  tableName,
  needFields = [],
}) => {
  try {
    let query = `SELECT ${
      needFields.length ? needFields.join(", ") : "*"
    } FROM ${tableName}`;

    const notEmptyFilters = Object.entries(filters).filter(
      ([key, value]) => !!value
    );

    const notEmptyNullFilters = notEmptyFilters.filter(
      ([_key, value]) => value.toUpperCase() === "NULL"
    );
    const notEmptyAndNotNullFilters = notEmptyFilters.filter(
      ([_key, value]) => value.toUpperCase() !== "NULL"
    );

    if (notEmptyFilters.length) {
      query += " WHERE";
      let startsWith = "";
      notEmptyNullFilters.forEach(([key, value]) => {
        query += ` ${startsWith} ${key} IS NULL`;
        startsWith = "AND";
      });
      notEmptyAndNotNullFilters.forEach(([key, value], index) => {
        if (/^[0-9]+$/.test(value) && !["phone", "inn"].includes(key)) {
          query += ` ${startsWith} ${key} = $${index + 1}`;
          startsWith = "AND";
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(value) && key.includes("date")) {
          query += ` ${startsWith} TO_CHAR(${key}, 'YYYY-MM-DD') = $${
            index + 1
          }`;
          startsWith = "AND";
        } else {
          query += ` ${startsWith} ${key} ~ $${index + 1}`;
          startsWith = "AND";
        }
      });
    }
    log(query);
    const result = await con.query(
      query,
      notEmptyAndNotNullFilters.map(([_, value]) => value)
    );
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getClients = async (filters = {}, con) => {
  const result = await getData({ filters, con, tableName: "clients" });
  return result.rows;
};

export const getProviders = async (filters = {}, con) => {
  const result = await getData({ filters, con, tableName: "providers" });
  return result.rows;
};

export const getProducts = async (filters = {}, con) => {
  const result = await getData({ filters, con, tableName: "products" });
  return result.rows;
};

export const getEmployees = async (filters = {}, con) => {
  const result = await getData({ filters, con, tableName: "employees" });
  return result.rows;
};

export const getOrders = async (filters = {}, con) => {
  const result = await getData({ filters, con, tableName: "orders" });
  return result.rows;
};

export const getOrderDetails = async (filters = {}, con) => {
  const result = await getData({
    filters,
    con,
    tableName: "order_details",
  });
  return result.rows;
};

export const deleteData = async ({
  tableName,
  keyName,
  keyValue,
  con,
}) => {
  try {
    let query = `DELETE FROM ${tableName} WHERE ${keyName} = $1`;
    log(query);
    await con.query(query, [keyValue]);
    const result = await con.query(`SELECT * FROM ${tableName}`);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteClient = async (keyValue, con) => {
  const result = await deleteData({
    tableName: "clients",
    keyName: "id",
    keyValue,
    con,
  });
  return result.rows;
};

export const deleteProvider = async (keyValue, con) => {
  const result = await deleteData({
    tableName: "providers",
    keyName: "name",
    keyValue,
    con,
  });
  return result.rows;
};

export const deleteEmployee = async (keyValue, con) => {
  const result = await deleteData({
    tableName: "employees",
    keyName: "id",
    keyValue,
    con,
  });
  return result.rows;
};

export const deleteProduct = async (keyValue, con) => {
  const result = await deleteData({
    tableName: "products",
    keyName: "name",
    keyValue,
    con,
  });
  return result.rows;
};

export const deleteOrder = async (keyValue, con) => {
  const result = await deleteData({
    tableName: "orders",
    keyName: "id",
    keyValue,
    con,
  });
  return result.rows;
};

export const deleteOrderDetails = async (keyValue, con) => {
  const result = await deleteData({
    tableName: "order_details",
    keyName: "id",
    keyValue,
    con,
  });
  return result.rows;
};

export const addData = async ({ tableName, row, con }) => {
  try {
    let fieldsNamesString = "";
    let fieldsValuesString = "";
    let fieldsValues = [];
    log(row);
    Object.entries(row)
      .filter(([key, value]) => key && value)
      .forEach(([key, value], index, arr) => {
        const currentValue = `$${index + 1}`;
        if (index === 0) {
          fieldsNamesString += `(${key}`;
          fieldsValuesString += `(${currentValue}`;
        } else if (index === arr.length - 1) {
          fieldsNamesString += `,${key})`;
          fieldsValuesString += `,${currentValue})`;
        } else {
          fieldsNamesString += `,${key}`;
          fieldsValuesString += `,${currentValue}`;
        }
        fieldsValues.push(value);
      });
    let query = `INSERT INTO ${tableName}${fieldsNamesString} VALUES${fieldsValuesString}`;
    log(query);
    await con.query(query, fieldsValues);

    const result = await con.query(`SELECT * FROM ${tableName}`);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addClient = async (row, con) => {
  const result = await addData({ tableName: "clients", row, con });
  return result.rows;
};

export const addProvider = async (row, con) => {
  const result = await addData({ tableName: "providers", row, con });
  return result.rows;
};

export const addProduct = async (row, con) => {
  const result = await addData({ tableName: "products", row, con });
  return result.rows;
};

export const addEmployee = async (row, con) => {
  const result = await addData({ tableName: "employees", row, con });
  return result.rows;
};

export const addOrder = async (row, con) => {
  const result = await addData({ tableName: "orders", row, con });
  return result.rows;
};

export const addOrderDetails = async (row, con) => {
  const result = await addData({ tableName: "order_details", row, con });
  return result.rows;
};
