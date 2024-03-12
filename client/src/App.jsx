import { useContext } from "react"
import { AuthContext } from "./context/authContext"
import { useState, useEffect } from "react"
import categories from "../generalized_categories.json"

import { Card } from "./components"
import "./index.css"
import { Category } from "./components"

const PAGE_LIMIT = 10
const SORT_OPTIONS = ["asc", "desc"]
function App() {
  const data  = useContext(AuthContext)
  const { token } = data;
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
    const request = await fetch(url, {
      credentials: 'include',
      headers: {
        Authorization: token
      }
    })
    if (request.status !== 200) {
      throw new Error("status code " + request.status)
    }
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
  }, [category, sort, data])
  if (error) {

    return <div>
      <h1 className="text-center">Error: {error.message}</h1>
      <button className="flex my-0 mx-auto" onClick={() => window.location.reload()}>Reload</button>
      </div>
  }

  if (loading) {
    return <h1 className="text-center">LOADING</h1>
  }

  return (
    <div>
      <div>
        <div className="m-1 ml-0 p-1 flex gap-1 overflow-x-auto">
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
        <div className="m-1 ml-0 p-1 flex gap-1 overflow-x-auto">
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
        <div className="grid justify-items-center gap-5 locations_grid p-1">
          {locations.map((el) => (
            <Card key={el._id} location={el} />
          ))}
        </div>
      </div>
      {from < count && (
        <button className="text-center mx-auto my-2 items-center flex justify-center" onClick={fetchData}>
          More
        </button>
      )}
    </div>
  )
}

export default App
