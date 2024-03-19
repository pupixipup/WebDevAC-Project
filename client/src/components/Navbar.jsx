import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthHooks"

export const Navbar = ({ placeholder }) => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleLogOut = () => {
    logout()
  }

  return (
    <>
      {placeholder && <div style={{height: "64px"}}></div>}
    <header className="navbar">
      <h1>
        {
          <Link to="/">
            <span className="jkpgcityLogo">JKPG</span>
            <span className="thin">city</span>
          </Link>
        }
      </h1>
      <nav>
        {user && (
          <div className="user-container">
            {user && <Link to="/create">Create</Link>}
            <span>
              {user?.name ? (
                <Link to={`/profile/${user?.name}`}>{user?.name}</Link>
              ) : (
                "Navbar"
              )}
            </span>
            <a onClick={handleLogOut}>Log out</a>
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
  </>
  )
}
