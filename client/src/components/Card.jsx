import styles from "./Card.module.css"
import { normalizeLink } from "../shared/helpers";
import { Link } from "react-router-dom";

export const LocationCard = ({ location }) => {
  const { address, category, image, name, url } = location;
  return <div className={styles.card}>
   <img className={styles.image} src={image} />
   <div className={styles.body}>
    <h5>{name}</h5>
    <p>{category}</p>
    <address>{address}</address>
    <a href={normalizeLink(url)} className={styles.link}>Link</a>
    <Link to={`/locations/${location._id}`}>More</Link>
   </div>
    </div>
}