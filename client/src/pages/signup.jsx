import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const { signup, isLoading, error } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, name)
  }

  return (
    <div className="formContainer">
      <form className="signupForm" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Your user name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
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
          placeholder="At least 8 chars"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading}>Sign up</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Signup
