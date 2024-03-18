import { useFetch } from "../../hooks/useFetch"
import styles from "./Review.module.css"

export const Review = ({ review }) => {
  const { score, description, createdAt, reviewerId } = review
  const date = new Date(createdAt).toDateString()
  const [user, err] = useFetch({ url: "/users/" + reviewerId })
  if (!user || !review) return null
  return (
    <div className={styles.review}>
      <div className={styles.textWrapper}>
        <div>
          <div className={styles.reviewHead}>
            <h4>{user.name}</h4>
            <p className={styles.score}>{score}/5</p>
          </div>
          <hr />
          <p className={styles.reveiwDescription}>{description}</p>
        </div>
        <p className={styles.reviewDate}>{date}</p>
      </div>
    </div>
  )
}
