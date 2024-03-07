import { useEffect } from "react"
import { AuthContext, authReducer } from "./context/authContext";
import { useContext } from "react";

const Hello = () => { 
  const data  = useContext(AuthContext)
const { token } = data;
function triggerServer() {
  if (!token) {
    return;
  }
  const headers = { 'Authorization': token };
  fetch("http://localhost:3000/posts", {headers} 
  )
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err))
}

function getGreet() {

  if (!token) {
    console.log("NO TOKEN");
    return;
  }
  const headers = { 'Authorization': token };
  fetch("http://localhost:3000/greet", {headers} 
  )
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err))
}

 
  return <div>
    <button onClick={() => triggerServer()}>Hey!</button>
    <button onClick={() => getGreet()}>Greet</button>
    </div>
}
export default Hello;