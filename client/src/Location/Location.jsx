import { useLoaderData, useParams } from "react-router-dom";
import { normalizeLink } from "../shared/helpers";
import styles from "./Location.module.css"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useState } from "react";
import { Review } from "../components";
import { useFetch } from "../hooks/useFetch";

export async function locationLoader ({ params }) {
  const id = params.locationId;
  const url = new URL(import.meta.env.VITE_BASE_URL + "/locations/" + id);
  const request = await fetch(url)
  const json = await request.json()
  return json;
}




export const Location = (props) => {
  const params = useParams()
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState(0)
  const data  = useContext(AuthContext)
  const { user } = data;
  const location = useLoaderData();
  const [reviews, error, invalidate] = useFetch({
    url: "/reviews",
    parameters: {
      locationId: params.locationId
    }
  })

  function submit(event) {
    event.preventDefault();
    fetch(import.meta.env.VITE_BASE_URL + "/review", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      credentials: 'include',
      body: JSON.stringify({
        reviewerId: user._id,
        locationId: params.locationId,
        score: rating,
        description
      })
    })
    .then(() => {
      setDescription("")
      setRating(0)
      invalidate()
    })

}

  return <div className="flex items-start gap-4 flex-col p-2 mx-auto my-0 justify-center">
    <div className={styles.location_wrapper}>
    <div className="flex gap-3 mb-3 flex-col sm:flex-row">
    <img style={{maxWidth: "450px", maxHeight: "400px", width: "100%"}} src={location.image} />
    <div className="flex gap-2 flex-col">
    <h4>{location.name}</h4>
    <span>{location.category}</span>
    <address>{location.address}</address>
      <button>
        <a target="_blank" href={normalizeLink(location.url)}>
        Open website
        </a>
      </button>
    </div>
      </div>
      <div className="flex gap-1">
        {Array.isArray(reviews) && reviews.map((review) => <Review key={review._id} review={review} />)}
      </div>
      {user ? <form className="mb-3 flex flex-col items-start gap-3" onSubmit={submit}>
        <h2>
          Create review
          </h2>
       <div className="flex flex-col gap-1">
        Rating
        <input value={rating} onChange={(event) => setRating(event.target.value)} type="number" min={0} max={5} />
       </div>
       <div style={{width: "100%"}} className="flex flex-col gap-1">
        Review
       <textarea
       value={description}
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="review..."
         rows={5} minLength={15} maxLength={200}
          className={"w-full box-border"} ></textarea>
       </div>
       <button type="submit">Submit</button>
      </form> : <h5 className="mb-2">Log In to leave a review</h5>}
        <div style={{maxWidth: "450px", width: "100%"}}>
          <div className={styles.map_wrapper}>
        <iframe
        className={styles.map_frame}
        src={location.map_frame} allowFullScreen={true} loading="lazy"></iframe>
        </div>
          </div>
        </div>
  </div>
}