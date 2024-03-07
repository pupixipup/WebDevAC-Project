
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Signup from "./pages/signup"
import Login from "./pages/login"
import Hello from "./Hello"
import { useState, useEffect } from "react"
import categories from "../generalized_categories.json"

import { LocationCard } from "./components/Card"
import "./index.css"
import { Category } from "./components/Category"

const PAGE_LIMIT = 10
const SORT_OPTIONS = ["asc", "desc"]
function App() {
  const [locations, setLocations] = useState([])
  const [from, setFrom] = useState(0)
  const [count, setCount] = useState(0)
  const [category, setCategory] = useState()
  const [sort, setSort] = useState("asc")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  async function fetchData() {
    setLoading(true)
    const url = new URL(import.meta.env.VITE_BASE_URL + "/locations");
    url.searchParams.append("from", from)
    url.searchParams.append("sort", sort)
    if (category) {
      url.searchParams.append("category", category)
    }
    try {
    const request = await fetch(url)
    const json = await request.json()
    const { locations: locs, count } = json
    setCount(count)
    setLocations((prev) => {
      const array = [...prev, ...locs]
      // filter out duplicates
      const filteredLocs = array.filter(
        (element, index, self) =>
          index === self.findIndex((t) => t._id === element._id)
      )
      return filteredLocs
    })
    setFrom((from) => {
      return from + PAGE_LIMIT
    })
  } catch (err) {
    console.log(err)
    setError(err);
  } finally {
  setLoading(false)
  }
  }

  useEffect(() => {
    fetchData()
  }, [category, sort])

  if (error) {

    return <div>
      <h1 style={{textAlign: "center"}}>Error: {error.message}</h1>
      <button style={{ margin: "0 auto", display: 'flex'}} onClick={() => window.location.reload()}>Reload</button>
      </div>
  }

  if (loading) {
    return <h1 style={{textAlign: "center"}}>LOADING</h1>
  }

  return (
    <div>
      <div>
        <div className="categories">
          {Object.keys(categories).map((cat) => (
            <Category
              onClick={() => {
                if (cat === category) return;
                setLocations([])
                setFrom(0)
                setCategory(cat)
              }}
              key={cat}
            >
              {cat}
            </Category>
          ))}
        </div>
        <div className="categories">
          {SORT_OPTIONS.map((option) => (
            <Category
              onClick={() => {
                setSort(option)
                setLocations([])
                setFrom(0)
              }}
              key={option}
            >
              {option}
            </Category>
          ))}
        </div>
        <div className="container">
          {locations.map((el) => (
            <LocationCard key={el._id} location={el} />
          ))}
        </div>
      </div>
      {from < count && (
        <button className="more_button" onClick={fetchData}>
          More
        </button>
      )}
    </div>
  )
}

export default App
