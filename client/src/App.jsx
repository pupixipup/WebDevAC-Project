import { useState, useEffect } from "react"
import categories from "../generalized_categories.json"

import { LocationCard } from "./components/Card";
import "./index.css"
import { Category } from "./components/Category";




const PAGE_LIMIT = 10;
function App() {
  const [locations, setLocations] = useState([])
  const [from, setFrom] = useState(0)
  const [count, setCount] = useState(0)
  const [category, setCategory] = useState()
  useEffect(() => {
  fetchData()
  }, [])

  



  async function fetchData() {
    let url = `http://localhost:3000/locations?from=${from}&`
    if (category) {
      url += `category=${category}`
    } 
    console.log(url)
    const request = await fetch(url);
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

  useEffect(() => {
 fetchData()
  }, [category])


  return (<div>
    <div>
    <div className="categories">{Object.keys(categories).map((cat) => <Category onClick={() => {
      setCategory(cat)
      console.log(category)
    }} key={cat}>{cat}</Category>)}</div>
      <div className="container">
        {locations.map(el => (
          <LocationCard key={el._id} location={el} />
        ))}
      </div></div>
      {from < count && <button className="more_button" onClick={fetchData}>More</button>}
  </div>)

}

export default App
