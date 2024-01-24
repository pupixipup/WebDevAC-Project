import { useEffect } from "react"

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((json) => console.log(json))
  }, [])
  return <div>Hello, World!</div>
}

export default App
