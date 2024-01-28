import { useState, useEffect } from "react"

function normalizeLink(link) {
  if (typeof link !== "string") return null;
  if (link.includes("https://")) return link;
  return "https://" + link;
}
function App() {
  const [locations, setLocations] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/locations")
      .then((res) => res.json())
      .then((json) => setLocations(json))
  }, [])

  return <div>{
    locations.slice(0,10).map((el) => {
      return <div key={el.name}>
        <div>{el.name}</div>
        <a target="_blank" href={normalizeLink(el.url)} rel="noreferrer">{el.url}</a>
        <div>{el.address}</div>
        <iframe src={el.map_frame} />
        <div>---</div>
      </div>
    })
  }</div>
}

export default App
