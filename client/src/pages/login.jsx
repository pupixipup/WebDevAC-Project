import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import {} from "react-router-dom"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useLogin()
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
    navigate("/")
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <h2>Log in</h2>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Log in</button>

      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login
