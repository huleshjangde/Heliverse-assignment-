import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import userForm from "./formSlice";
import userSlice from "./userSlice";
import teamSlice from "./teamsSlice";
import userSelect from "./userSelect";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    userForm: userForm,
    users: userSlice,
    teams: teamSlice,
    team:userSelect
   
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
