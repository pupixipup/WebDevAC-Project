import styles from "./Card.module.css"
import { normalizeLink } from "../../shared/helpers"
import { Link } from "react-router-dom"

export const Card = ({ location }) => {
  const { address, category, image, name, url } = location

  function componentClick() {
    console.log()
  }
  const handleDelete = async () => {
    const url = new URL(
      import.meta.env.VITE_BASE_URL + "/locations/" + location._id
    )
    const request = await fetch(url, { method: "DELETE" })
    const json = await request.json()
    window.location.reload()
    return json
  }

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      >
        <p className={styles.image_title}>{category}</p>
      </div>
      {/* <img  src={image} /> */}
      <div className={styles.body}>
        <div>
          <h5>{name}</h5>
          <address>{address}</address>
        </div>
        <div className={styles.links}>
          <a href={normalizeLink(url)} className={styles.link}>
            Website
          </a>
          <Link to={`/locations/${location._id}`}>More</Link>
          <p className="font-bold cursor-pointer" onClick={handleDelete}>
            Delete
          </p>
        </div>
      </div>
    </div>
  )
}
