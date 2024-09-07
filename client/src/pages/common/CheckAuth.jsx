import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Check if the user is authenticated, if not, redirect to the login page
  if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check if the user or admin is authenticated and trying to access login or register page then redirect to the appropriate page
  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    const redirectTo =
      user?.role === "admin" ? "/admin/dashboard" : "/shop/home";
    return <Navigate to={redirectTo} replace />;
  }

  // Check if the user is authenticated and trying to access admin page then redirect to the unauthorized page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check if the admin is authenticated and trying to access shop page then redirect to the unauthorized page
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.startsWith("/shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }
    return children;
}
