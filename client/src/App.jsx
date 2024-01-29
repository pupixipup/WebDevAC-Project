import { useState, useEffect } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'


function normalizeLink(link) {
  if (typeof link !== "string") return null;
  if (link.includes("https://")) return link;
  return "https://" + link;
}
  let counter = 0;

const PAGE_LIMIT = 10;
function App() {
  counter += 1;
  const [locations, setLocations] = useState([])
  const [from, setFrom] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log("hi")

    return () =>   fetchData()
  }, [])


  async function fetchData() {
    const request = await fetch(`http://localhost:3000/locations?from=${from}`);
    const json = await request.json()
    const { locations: locs, count } = json;
    setCount(count)
    setLocations((prev) => [...prev, ...locs])
    setFrom((from) => {
      return from + PAGE_LIMIT
    })
  }

  return (<div>
    <InfiniteScroll
        dataLength={locations.length}
        next={fetchData}
        hasMore={from < count}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
    >
      <ul>
        {locations.map(el => (
            <div key={el._id}>
              <div>{el.name}</div>
              <a target="_blank" href={normalizeLink(el.url)} rel="noreferrer">{el.url}</a>
              <div>{el.address}</div>
              <div>---</div>
            </div>
        ))}
      </ul>
    </InfiniteScroll>
    {/*{error && <p>Error: {error.message}</p>}*/}
  </div>)

}

export default App
