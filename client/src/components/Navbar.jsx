import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthHooks"

export const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleLogOut = () => {
    logout()
  }

  return (
    <header className="navbar">
      <h2>{<Link to="/">JKPG</Link>}</h2>
      <nav>
        {user && (
          <div>
            <span>{user?.name ? <Link to={`/profile/${user?.name}`}>{user?.name}</Link>  : "Navbar"}</span>
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
