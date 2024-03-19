import { useContext, useEffect, useMemo, useState } from "react"
import { useLogin } from "../hooks/useLogin"
import {} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { useLogout } from "../hooks/useLogout"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, token } = useContext(AuthContext)
  const [err, setError] = useState(null)
  const { login, error, isLoading } = useLogin()
  const navigate = useNavigate()
  const { logout } = useLogout()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError("All fields must be filled")
      return;
    }
   const error = await login(email, password)
   if (!error) {
     navigate("/")
    }
  }

  useEffect(() => {
    setError(null)
  }, [email, password])


  if (user) {
    return (
      <div
        style={{
          display: "flex",
          margin: "20px 0px",
          justifyContent: "center",
        }}
      >
        <button onClick={() => logout()}>Log out</button>
      </div>
    )
  }

  return (
    <div className="formContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Log in</h2>

        <label>Email:</label>
        <input
          type="email"
          placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="***"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading || err}>Log in</button>
        {err && <div className="text-red-500">{err}</div>}
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  )
}

export default Login
