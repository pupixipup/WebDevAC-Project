
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Signup from "./pages/signup"
import Login from "./pages/login"
import Hello from "./Hello"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/hello" element={<Hello />} /> 
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
