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
      <h1>
        {
          <Link to="/">
            JKPG<span className="thin">city</span>
          </Link>
        }
      </h1>
      <nav>
        {user && (
          <div>
            <span>
              {user?.name ? (
                <Link to={`/profile/${user?.name}`}>{user?.name}</Link>
              ) : (
                "Navbar"
              )}
            </span>
            <button onClick={handleLogOut}>Log out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link className="nav-option" to="/login">
              Login
            </Link>
            <Link className="nav-option" to="/signup">
              Signup
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
