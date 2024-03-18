import { useLoaderData, useParams } from "react-router-dom"
import { normalizeLink } from "../shared/helpers"
import styles from "./Location.module.css"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { useState } from "react"
import { Review } from "../components"
import { useFetch } from "../hooks/useFetch"

export async function locationLoader({ params }) {
  const id = params.locationId
  const url = new URL(import.meta.env.VITE_BASE_URL + "/locations/" + id)
  const request = await fetch(url)
  const json = await request.json()
  return json
}

export const Location = (props) => {
  const params = useParams()
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState(0)
  const data = useContext(AuthContext)
  const { user } = data
  const location = useLoaderData()
  const [reviews, error, invalidate] = useFetch({
    url: "/reviews",
    parameters: {
      locationId: params.locationId,
    },
  })

  function submit(event) {
    event.preventDefault()
    fetch(import.meta.env.VITE_BASE_URL + "/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        reviewerId: user._id,
        locationId: params.locationId,
        score: rating,
        description,
      }),
    }).then(() => {
      setDescription("")
      setRating(0)
      invalidate()
    })
  }

  return (
    <div className="flex items-start gap-4 flex-col p-2 mx-auto my-0 justify-center">
      <div className={styles.location_wrapper}>
        <div className="flex gap-3 mb-3 flex-col sm:flex-row">
          <img
            className="rounded-lg"
            style={{ maxWidth: "500px", maxHeight: "400px", width: "100%" }}
            src={location.image}
          />
          <div className="mt-4 ml-4 flex gap-2 flex-col justify-between w-[100%]">
            <div className="flex flex-col">
              <h4 className="text-[1.6em]">{location.name}</h4>
              <hr />
              <span className="font-bold mb-2">{location.category}</span>
              <address>{location.address}</address>
            </div>
            <button className="w-[200px]">
              <a
                className="font-[500]"
                target="_blank"
                href={normalizeLink(location.url)}
              >
                Open website
              </a>
            </button>
          </div>
        </div>
        <div className={styles.reviews}>
          {Array.isArray(reviews) &&
            reviews.map((review) => (
              <Review key={review._id} review={review} />
            ))}
        </div>

        {user ? (
          <form
            className="mb-3 mt-[20px] flex flex-col gap-3"
            onSubmit={submit}
          >
            <div className="flex flex-col gap-1">
              <div className="mb-4 flex flex-col w-auto items-center w-full">
                <h3 className="mb-0">Write a review for</h3>
                <hr className="w-full" />
                <p className="text-[1.6em] mt-0">{location.name}</p>
              </div>
            </div>
            <div
              style={{ width: "100%" }}
              className="flex flex-col gap-1 items-center"
            >
              <div className="mt-0 mb-6 flex items-center">
                <h4 className="text-lg">Rating: </h4>
                <input
                  className="w-16 m-2 text-xl"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                  type="number"
                  min={0}
                  max={5}
                />
                <h4 className="text-lg"> / 5</h4>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a review here..."
                rows={5}
                minLength={15}
                maxLength={200}
                className={"w-full box-border p-5"}
              ></textarea>
            </div>
            <button
              className="bg-[var(--button-bg-color)] text-bold w-[200px] m-auto"
              type="submit"
            >
              Submit Review
            </button>
            <hr />
          </form>
        ) : (
          <h5 className="mt-10 mb-[100px] text-center text-xl font-normal">
            Log In to leave a review
          </h5>
        )}
        <div style={{ maxWidth: "450px", width: "100%" }}>
          <div className={styles.map_wrapper}>
            <iframe
              className={styles.map_frame}
              src={location.map_frame}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
