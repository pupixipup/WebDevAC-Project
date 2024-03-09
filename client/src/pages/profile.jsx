import { useContext, useEffect } from "react"
import { AuthContext } from "../context/authContext"
import { useParams } from "react-router-dom"
import { useState } from "react"

export const Profile = () => {
  const { username } = useParams()
  const [user, setUser] = useState()
  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + "/users/" + username)
    .then((res) => res.json())
    .then((res) => setUser(res))
    .catch(err => console.log(err))
  }, [])
  return <div style={{margin: "10px"}}>
    <h3>
    Name: {user?.name}
    </h3>
    <h4>
    Email: {user?.email}
    </h4>
  </div>
}