import { useAuthContext } from "./useAuthHooks"

// Remove user from local storage and set user to null in authContext
export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
     fetch(import.meta.env.VITE_BASE_URL + "/logout", {
      credentials: "include",
    })
    localStorage.removeItem("user")

    dispatch({ type: "LOGOUT" })
  }

  return { logout }
}
