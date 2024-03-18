import styles from "./Hero.module.css"

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className="heroTitle">
        <h1>
          JKPG<span className="thin">city</span>
        </h1>
        <h2>
          stores <span className="thin">&</span> services
        </h2>
      </div>
    </div>
  )
}
