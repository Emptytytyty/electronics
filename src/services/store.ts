import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "./reducers/RootReducer";
import {
  useDispatch as dispatchHook,
  useSelector as selectHook,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: RootReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectHook<never>;
