import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
const apiUrl = import.meta.env.VITE_API_URL;

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${apiUrl}/api/user/signup`,
        userData
      );
      console.log("Rs: ", res.data);

      const json = res.data;

      // Save the user to the local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // Force full reload to ensure new user context
      window.location.href = "/";

      setIsLoading(false);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      setError(
        error.response?.data?.error || "An error occurred during signup."
      );
    }
  };

  return { signup, isLoading, error };
};
