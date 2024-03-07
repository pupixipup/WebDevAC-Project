import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthHooks"

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleLogOut = () => {
    logout()
  }

  return (
    <header className="navbar">
      <h2>Navbar</h2>

      <nav>
        {user && (
          <div>
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogOut}>Log out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
