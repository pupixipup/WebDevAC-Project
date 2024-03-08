import { useContext } from "react"
import { AuthContext } from "../context/authContext"

export const Profile = () => {
  const data  = useContext(AuthContext)
  const { user } = data;
  return <div style={{margin: "10px"}}>
    <h3>
    {user?.name}
    </h3>
    <h4>
    {user?.email}
    </h4>
  </div>
}