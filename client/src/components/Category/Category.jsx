import styles from "./Category.module.css"

export const Category = ({ category, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        styles.category +
        (category === children ? " " + styles.selectedCategory : "")
      }
    >
      {children}
    </button>
  )
}
