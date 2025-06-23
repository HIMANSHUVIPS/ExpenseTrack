import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";
import ErrorPage from "../components/Error/Error";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import MainAuth from "../Auth/MainAuth";
import HomePage from "../components/Home/HomePage";
import AddExpense from "../components/Features/Expense/AddExpense/AddExpense";
import AddIncome from "../components/Features/AddIncome/AddIncome";
import Report from "../components/Features/Report/Report";
import Protected from "../ProtectedRoute/Protected";
import AllExpense from "../components/Features/Expense/AllExpense/AllExpense";
import UserStoreProvider from "../Store/Store";
const router = createBrowserRouter([
  // This is the public routes
  {
    path: "/",
    element: <MainAuth />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  // These are protected routes
  {
    path: "/layout",

    element: (
      <UserStoreProvider>
      {/* <Protected> */}
        <AppLayout />
      {/* </Protected> */}
      </UserStoreProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "add-expense", element: <AddExpense /> },
      { path: "all-expense", element: <AllExpense /> },
      { path: "add-income", element: <AddIncome /> },
      { path: "report", element: <Report /> },
    ],
  },
]);

export default router;
