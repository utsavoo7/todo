import React, { createContext, useEffect, useState } from "react";
import Todo from "./Pages/Todo";
import Login from "./Pages/Login";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Alert, Snackbar, ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import CommonLoader from "./Components/CommonLoader";

const PrivateRoute = ({ isAuthenticated, children }) => {
  console.log("auth: ", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

export const AppContext = createContext(null);

function App() {
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth"))
  );

  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const value = {
    showAlert,
    setShowAlert,
    isAuth,
    setIsAuth,
    loading,
    setLoading,
  };

  useEffect(() => {
    if (isAuth) {
      <Navigate to="/todo" />;
    }
  }, [isAuth]);

  return (
    <>
      <AppContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route
                path="/todo"
                element={
                  <PrivateRoute isAuthenticated={isAuth}>
                    {isAuth && <Navbar />}
                    <Todo />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<div>404 Not Found!</div>} />
            </Routes>
          </BrowserRouter>
          <CommonLoader />
          {showAlert.show && (
            <Snackbar
              anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
              }}
              open={showAlert.show}
            >
              <Alert
                autoHideDuration={6000}
                onClose={() => {
                  setShowAlert({
                    show: false,
                    message: "",
                    type: "info",
                  });
                }}
                severity={showAlert.type}
              >
                {showAlert.message}
              </Alert>
            </Snackbar>
          )}
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
