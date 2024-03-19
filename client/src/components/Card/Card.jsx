import styles from "./Card.module.css"
import { normalizeLink } from "../../shared/helpers"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthHooks"
export const Card = ({ location }) => {
  const { address, category, image, name, url } = location
  const { user } = useAuthContext()

  function startEdit() {
    console.log()
  }

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      >
        <p className={styles.image_title}>{category}</p>
      </div>
      <div className={styles.body}>
        <div>
          <h5>{name}</h5>
          <address>{address}</address>
        </div>
        <div className={styles.links}>
          <a href={normalizeLink(url)} className={styles.link}>
            Link
          </a>
          <Link to={`/locations/${location._id}`}>More</Link>
        </div>
      </div>
    </div>
  )
}
