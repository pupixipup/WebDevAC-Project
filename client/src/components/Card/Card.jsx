import styles from "./Card.module.css"
import { normalizeLink } from "../../shared/helpers"
import { Link } from "react-router-dom"

export const Card = ({ location }) => {
  const { address, category, image, name, url } = location
  return (
    <div className={styles.card}>
      <img className={styles.image} src={image} />
      <div className={styles.body}>
        <p>{category}</p>
        <div>
          <h5>{name}</h5>
          <address>{address}</address>
        </div>
        <div className={styles.links}>
          <a href={normalizeLink(url)} className={styles.link}>
            Website
          </a>
          <Link to={`/locations/${location._id}`}>More</Link>
        </div>
      </div>
    </div>
  )
}
