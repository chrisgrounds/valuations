import styles from '../styles/Home.module.css'
import Nav from "../components/Nav";
import Head from "../components/Head";

export default function MyValuation() {
  return (
    <div className={styles.container}>
      <Head title="About" />
      
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>About</h1>

        <div>
          <p>Valuations provides a way to automate the creation of discounted cash flow valuations for equities.</p>

          <p>All you need to provide is the ticker, along optionally with an expected average growth rate, operating margin, discount rate, and perpetual yield.</p>

          <p>Valuations provides defaults if you only wish to provide a ticker.</p>
        </div>
      </main>
    </div>
  )
}
