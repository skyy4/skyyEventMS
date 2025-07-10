import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });

    // Force full reload to ensure logout everywhere
    window.location.href = "/login";
  };

  return { logout };
};
