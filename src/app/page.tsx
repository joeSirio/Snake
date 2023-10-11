import styles from './page.module.css'
import Game from './game'

export default function Home() {
  return (
    <main className={styles.main}>
      <Game />
    </main>
  )
}
