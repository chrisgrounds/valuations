import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from "../components/Nav";

export default function MyValuation() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Valuations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>Coming soon!</h1>
      </main>
    </div>
  )
}
