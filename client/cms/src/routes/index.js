import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "../views/Dashboard";
import Taxes from "../views/Taxes";
import Users from "../views/Users";
import LoginPage from "../views/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
    },
    children: [
      {
        path: "",
        element: <Taxes />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
    },
  },
]);
