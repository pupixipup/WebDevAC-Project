import { useContext, useState } from "react"
import { useLogin } from "../hooks/useLogin"
import {} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useLogout } from "../hooks/useLogout";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, token } = useContext(AuthContext)
  const { login, error, isLoading } = useLogin()
  const navigate = useNavigate();
  const { logout } = useLogout()
 


  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
    navigate("/")
  }

  if (user) {
      return (<div style={{display: "flex",margin: "20px 0px" , justifyContent: "center"}}>
      <button onClick={() => logout()}>Log out</button>
       </div>)
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
