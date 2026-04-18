import { combineSlices } from "@reduxjs/toolkit";
import { UserSlice } from "../slices/UserSlice";
import { MainDataSlice } from "../slices/MainDataSlice";

export const RootReducer = combineSlices(UserSlice, MainDataSlice)