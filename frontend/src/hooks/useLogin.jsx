import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${apiUrl}/api/user/login`, {
        email,
        password,
      });
      console.log(res);

      const json = res.data;

      // Save the user to the local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // Redirect to the home page if login success
      window.location.href = "/";

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data || "An error occurred during login.");
    }
  };

  return { login, isLoading, error };
};
