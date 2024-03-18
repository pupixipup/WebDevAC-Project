import { useContext } from "react"
import { AuthContext } from "./context/authContext"
import { useState, useEffect } from "react"
import categories from "../generalized_categories.json"
import { Hero } from "./components/Hero/Hero.jsx"

import { Card } from "./components"
import "./index.css"
import { Category } from "./components"

const PAGE_LIMIT = 10
const SORT_OPTIONS = ["ascending", "descending"]
function App() {
  const data = useContext(AuthContext)
  const [locations, setLocations] = useState([])
  const [from, setFrom] = useState(0)
  const [count, setCount] = useState(0)
  const [category, setCategory] = useState()
  const [sort, setSort] = useState("ascending")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  async function fetchData() {
    setLoading(true)
    const url = new URL(import.meta.env.VITE_BASE_URL + "/locations")
    url.searchParams.append("from", from)
    url.searchParams.append("sort", sort)
    if (category) {
      url.searchParams.append("category", category)
    }
    try {
      const request = await fetch(url)
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
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [category, sort, data])

  useEffect(() => {
    // console.log(locations)
  }, [locations])
  if (error) {
    return (
      <div>
        <h1 className="text-center mt-12 mb-6 text-xl">
          Error: {error.message}
        </h1>
        <button
          className="flex my-0 mx-auto"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    )
  }

  return (
    <div>
      <Hero />
      <div>
        <div className=" m-auto locations-container">
          <hr className="ml-5 mr-5" />
          <h3 className="mt-[-25px] ml-7 font-bold text-lg">
            <span className="bg-[var(--main-bg-color)] text-[var(--main-dark-color)] pl-3 pr-3">
              Sort by:{" "}
            </span>
          </h3>
          <div className="m-1 ml-3 mr-3 mb-12 p-1 flex gap-1 flex-wrap justify-center">
            {Object.keys(categories).map((cat) => (
              <Category
                category={category}
                onClick={() => {
                  if (cat === category) return
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
          <hr className="ml-5 mr-5" />
          <h3 className="mt-[-15px] ml-7 font-bold text-lg">
            <span className="bg-[var(--main-bg-color)] pl-3 pr-3">
              Alphabetical order:
            </span>
          </h3>
          <div className="m-1 ml-3 mr-3 mb-12 p-1 flex gap-1 overflow-x-auto justify-center">
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

          <div className="grid justify-items-center gap-y-20 locations_grid p-1 pb-6">
            {locations.map((el) => (
              <Card key={el._id} location={el} />
            ))}
          </div>
          {loading && <h1 className="text-center">Loading...</h1>}
        </div>
      </div>
      {from < count && (
        <button
          className="mt-10 text-center mx-auto my-2 items-center flex justify-center"
          onClick={fetchData}
        >
          More
        </button>
      )}
    </div>
  )
}

export default App
