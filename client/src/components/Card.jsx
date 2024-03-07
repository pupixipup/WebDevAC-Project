import styles from "./Card.module.css"

export const LocationCard = ({ location }) => {
  const { address, category, image, name, url } = location;
  return <div className={styles.card}>
   <img className={styles.image} src={image} />
   <div className={styles.body}>
    <h5>{name}</h5>
    <p>{category}</p>
    <address>{address}</address>
    <a href={normalizeLink(url)} className={styles.link}>Link</a>
   </div>
    </div>
}

function normalizeLink(link) {
  if (typeof link !== "string") return null;
  if (link.includes("https://")) return link;
  return "https://" + link;
}
