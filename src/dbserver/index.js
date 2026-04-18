import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Pool } from "pg";
import { generateJWTToken, requireJWTAuth } from "./JWT.js";
import {
  addClient,
  addEmployee,
  addOrder,
  addOrderDetails,
  addProduct,
  addProvider,
  dbConfig,
  deleteClient,
  deleteEmployee,
  deleteOrder,
  deleteOrderDetails,
  deleteProduct,
  deleteProvider,
  getClients,
  getEmployees,
  getOrderDetails,
  getOrders,
  getProducts,
  getProviders,
} from "./db.js";

const { log } = console;

dotenv.config();
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const connections = {};

app.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    log(`Попытка авторизации: \n login: ${login} \n password: ${password}`);
    const pool = new Pool({ ...dbConfig, user: login, password });
    
    const con = await pool.connect();

    if (con) {
      connections[login] = con;
      const token = generateJWTToken(login);

      res.json({
        success: true,
        message: "Авторизация успешна",
        token,
        user: login,
      });
      log(`Успех`);
    } else {
      const message = "Неверные учетные данные";
      res.json({ error: message, success: false });
      log(message);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    log("Ошибка сервера:", error.message);
  }
});

app.post("/logout", async (req, res) => {
  try {
    log(`Попытка деавторизации`);
    const user = req.body.user;
    log(user)
    await connections[user].release();
    await connections[user].end();
    res.json({
      success: true,
      message: "Деавторизация успешна",
    });
    log(`Успех`);
  } catch (error) {
    res.status(500).json({ error: error.message });
    log("Ошибка сервера:", error.message);
  }
});

const sendPostQuery = (queryFunction, logName, resName) => async (req, res) => {    //logname в формате: <действие> <объект-доступа>
  try {
    const user = req.user;
    const { ...filters } = req.body;
    log(`Попытка ${logName}`);
    log(req.user);
    const result = await queryFunction(filters, connections[user]);
    if (result && result.length > 0) {
      log("Успех");
      res.json({
        success: true,
        [resName]: result,
      });
    } else {
      const error = "Ничего не найдено";
      log(error);
      res.status(404).json({
        succes: false,
        error,
      });
    }
  } catch (err) {
    log(`Ошибка ${logName.split(" ")[0]}: \n ${err}`);
    res.status(403).json({
      error: err.message,
    });
  }
};

const sendDeleteQuery =
  (queryFunction, logName, resName) => async (req, res) => {
    try {
      const user = req.user;
      const { identifier } = req.body;

      log(`Попытка ${logName}`);
      log(req.user);
      const result = await queryFunction(identifier, connections[user]);
      if (result && result.length > 0) {
        log("Успех");
        res.json({
          success: true,
          [resName]: result,
        });
      } else {
        const error = "Ничего не найдено";
        log(error);
        res.status(404).json({
          succes: false,
          error,
        });
      }
    } catch (err) {
      log(`Ошибка ${logName.split(" ")[0]}: \n ${err}`);
      res.status(403).json({
        error: err.message,
      });
    }
  };

const sendPutQuery = (queryFunction, logName, resName) => async (req, res) => {
  try {
    const user = req.user;
    const { row } = req.body;

    log(`Попытка ${logName}`);
    log(req.user);
    const result = await queryFunction(row, connections[user]);
    if (result && result.length > 0) {
      log("Успех");
      res.json({
        success: true,
        [resName]: result,
      });
    } else {
      const error = "Ничего не найдено";
      log(error);
      res.status(404).json({
        succes: false,
        error,
      });
    }
  } catch (err) {
    log(`Ошибка ${logName.split(" ")[0]}: \n ${err}`);
    res.status(403).json({
      error: err.message,
    });
  }
};

app.post(
  "/clients",
  requireJWTAuth,
  sendPostQuery(getClients, "получения clients", "clients")
);
app.delete(
  "/clients",
  requireJWTAuth,
  sendDeleteQuery(deleteClient, "удаления clients", "clients")
);
app.put(
  "/clients",
  requireJWTAuth,
  sendPutQuery(addClient, "добавления clients", "clients")
);

app.post(
  "/providers",
  requireJWTAuth,
  sendPostQuery(getProviders, "получения providers", "providers")
);
app.delete(
  "/providers",
  requireJWTAuth,
  sendDeleteQuery(deleteProvider, "удаления providers", "providers")
);
app.put(
  "/providers",
  requireJWTAuth,
  sendPutQuery(addProvider, "добавления providers", "providers")
);

app.post(
  "/products",
  requireJWTAuth,
  sendPostQuery(getProducts, "получения products", "products")
);
app.delete(
  "/products",
  requireJWTAuth,
  sendDeleteQuery(deleteProduct, "удаления products", "products")
);
app.put(
  "/products",
  requireJWTAuth,
  sendPutQuery(addProduct, "добавления products", "products")
);

app.post(
  "/employees",
  requireJWTAuth,
  sendPostQuery(getEmployees, "получения employees", "employees")
);
app.delete(
  "/employees",
  requireJWTAuth,
  sendDeleteQuery(deleteEmployee, "удаления employees", "employees")
);
app.put(
  "/employees",
  requireJWTAuth,
  sendPutQuery(addEmployee, "добавления employees", "employees")
);

app.post(
  "/orders",
  requireJWTAuth,
  sendPostQuery(getOrders, "получения orders", "orders")
);
app.delete(
  "/orders",
  requireJWTAuth,
  sendDeleteQuery(deleteOrder, "удаления orders", "orders")
);
app.put(
  "/orders",
  requireJWTAuth,
  sendPutQuery(addOrder, "добавления orders", "orders")
);

app.post(
  "/order-details",
  requireJWTAuth,
  sendPostQuery(getOrderDetails, "получения order-details", "orderDetails")
);
app.delete(
  "/order-details",
  requireJWTAuth,
  sendDeleteQuery(deleteOrderDetails, "удаления order-details", "orderDetails")
);
app.put(
  "/order-details",
  requireJWTAuth,
  sendPutQuery(addOrderDetails, "добавления order-details", "orderDetails")
);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
