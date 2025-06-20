import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserStore = createContext({
  handleGetUserData: () => {},
  handleFetchExpense: () => {},
  handleFetchIncome: () => {},
  triggerRefresh:false
});

const UserStoreProvider = ({ children }) => {
  const urlApi = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [refreshUser, setRefreshUser] = useState(false);
  // fetch user profile data
  const handleGetUserData = async () => {
    try {
      const response = await axios.get(`${urlApi}/data/user-profile-data`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // fetching expense data
  const handleFetchExpense = async () => {
    try {
      const response = await axios.get(`${urlApi}/data/user-expenses`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExpenses(response.data.expenses);
    } catch (error) {
      console.log(error);
    }
  };
  // fetching income data
  const handleFetchIncome = async () => {
    try {
      const response = await axios.get(`${urlApi}/data/user-incomes`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIncome(response.data.incomes);
    } catch (error) {
      console.log(error);
    }
  };
  // trigger refresh the page when ever the data chnages
  const triggerRefresh = () => {
    setRefreshUser((prev) => !prev);
  };

  return (
    <UserStore.Provider
      value={{
        handleGetUserData,
        userData,
        handleFetchExpense,
        expenses,
        handleFetchIncome,
        income,
        triggerRefresh,
      }}
    >
      {children}
    </UserStore.Provider>
  );
};

export default UserStoreProvider;
