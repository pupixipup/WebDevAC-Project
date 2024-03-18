import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthHooks"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate();

  const signup = async (email, password, name) => {
    setIsLoading(true)
    setError(null)

    // Change endpoint
    const response = await fetch(import.meta.env.VITE_BASE_URL + "/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, name }),
    })
    const responseJson = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(responseJson.error)
    }
    if (response.ok) {
      // Save user (email and JWT) to local storage
      localStorage.setItem("user", JSON.stringify(responseJson))

      // Update auth context
      dispatch({ type: "LOGIN", payload: responseJson })

      setIsLoading(false)
      navigate("/")
    }
  }

  return { signup, isLoading, error }
}
