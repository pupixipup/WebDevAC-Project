import { useState, useEffect } from "react"
import { LocationCard } from "./components/Card";
import "./index.css"




const PAGE_LIMIT = 10;
function App() {

  const [locations, setLocations] = useState([])
  const [from, setFrom] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
  fetchData()
  }, [])


  async function fetchData() {
    const request = await fetch(`http://localhost:3000/locations?from=${from}`);
    const json = await request.json()
    const { locations: locs, count } = json;
    setCount(count)
    setLocations((prev) => {
     const array = [...prev, ...locs]
     // filter out duplicates
     return array.filter((element, index, self) => index === self.findIndex((t) => t._id === element._id))
    })
    setFrom((from) => {
      return from + PAGE_LIMIT
    })
  }


  return (<div>
    <div>
      <div className="container">
        {locations.map(el => (
          <LocationCard key={el._id} location={el} />
        ))}
      </div></div>
      {from < count && <button className="more_button" onClick={fetchData}>More</button>}
  </div>)

}

export default App
