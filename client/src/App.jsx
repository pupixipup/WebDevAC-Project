import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Signup from "./pages/signup"
import Login from "./pages/login"

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((json) => console.log(json))
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
