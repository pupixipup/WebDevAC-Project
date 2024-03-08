import { useLoaderData } from "react-router-dom";
import { normalizeLink } from "../shared/helpers";
import styles from "./Location.module.css"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export async function locationLoader ({ params }) {
  const id = params.locationId;
  const url = new URL(import.meta.env.VITE_BASE_URL + "/locations/" + id);
  const request = await fetch(url)
  const json = await request.json()
  return json;
}

export const Location = () => {
  const data  = useContext(AuthContext)
  const { token } = data;
  const location = useLoaderData();
  return <div className={styles.location_container}>
    <h4>{location.name}</h4>
    <span>{location.category}</span>
    <address>{location.address}</address>
    <img style={{maxWidth: "450px"}} src={location.image} />
      <button>
        <a target="_blank" href={normalizeLink(location.url)}>
        Open website
        </a>
      </button>
        <div style={{maxWidth: "450px", width: "100%"}}>
          <div className={styles.map_wrapper}>
        <iframe
        className={styles.map_frame}
        src={location.map_frame} allowFullScreen={true} loading="lazy"></iframe>
          </div>
        </div>
  </div>
}