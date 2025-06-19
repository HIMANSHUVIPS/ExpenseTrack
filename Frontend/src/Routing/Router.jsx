import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";
import ErrorPage from "../components/Error/Error";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import MainAuth from "../Auth/MainAuth";
import HomePage from "../components/Home/HomePage";
import AddExpense from "../components/Features/AddExpense/AddExpense";
import AddIncome from "../components/Features/AddIncome/AddIncome";
import Report from "../components/Features/Report/Report";
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
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
        { path: "home", element: <HomePage /> },
        {path:"add-expense", element:<AddExpense/>},
        {path:"add-income" , element:<AddIncome/>},
        {path:"report",element:<Report/>}
    ],
  },
]);

export default router;
