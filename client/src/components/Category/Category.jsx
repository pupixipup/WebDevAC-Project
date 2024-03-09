import styles from "./Category.module.css"

export const Category = ({ children, onClick }) => {
  return  <button onClick={onClick} className={styles.category}>{children}</button>
}