import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserStore = createContext();

const UserStoreProvider = ({ children }) => {
  const urlApi = import.meta.env.VITE_BACKEND_URL;

  return <UserStore.Provider value={{}}>{children}</UserStore.Provider>;
};

export default UserStoreProvider;
