import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserStore = createContext({
  handleGetUserData: () => {},
  handleFetchExpense: () => {},
  handleFetchIncome: () => {},
  triggerRefresh: false
});

const UserStoreProvider = ({ children }) => {
  const navigate = useNavigate();
  const urlApi = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [refreshUser, setRefreshUser] = useState(false);

  const handleGetUserData = async () => {
    try {
      const response = await axios.get(`${urlApi}/data/user-profile-data`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUserData(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };

  const handleFetchExpense = async () => {
    try {
      const response = await axios.get(`${urlApi}/data/user-expenses`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExpenses(response.data.expenses);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };

  const handleFetchIncome = async () => {
    try {
      const response = await axios.get(`${urlApi}/data/user-incomes`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIncome(response.data.incomes);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };
useEffect(() => {
  handleGetUserData();
  handleFetchExpense();
  handleFetchIncome();
}, []);
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