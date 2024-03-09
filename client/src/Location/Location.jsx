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
  const [reviews, error] = useFetch({
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
    })

}

  return <div className={styles.location_container}>
    <div className={styles.location_wrapper}>
    <div className={styles.location_content}>
    <img style={{maxWidth: "450px", maxHeight: "400px", width: "100%"}} src={location.image} />
    <div className={styles.location_description}>
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
      <div>
        {Array.isArray(reviews) && reviews.map((review) => <Review key={review._id} review={review} />)}
      </div>
      <form className={styles.location_review_form} onSubmit={submit}>
        <h2>
          Create review
          </h2>
       <div className={styles.location_review_form_field}>
        Rating
        <input value={rating} onChange={(event) => setRating(event.target.value)} type="number" min={0} max={5} />
       </div>
       <div style={{width: "100%"}} className={styles.location_review_form_field}>
        Review
       <textarea
       value={description}
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="review..."
         rows={5} minLength={15} maxLength={200}
          className={styles.form_text} ></textarea>
       </div>
       <button type="submit">Submit</button>
      </form>
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