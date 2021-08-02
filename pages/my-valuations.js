import styles from '../styles/Home.module.css'
import Nav from "../components/Nav";
import Head from "../components/Head";

export default function MyValuation() {
  return (
    <div className={styles.container}>
      <Head title="My Valuations" />
      
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>Coming soon!</h1>
      </main>
    </div>
  )
}
