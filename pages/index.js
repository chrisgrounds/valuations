import { useEffect, useState } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const round2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100

export default function Home() {
  const [ticker, setTicker] = useState(null);
  const [growthRate, setGrowthRate] = useState(null);
  const [valuation, setValuation] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleValuationRequest = (e) => {
    e.preventDefault();

    setLoading(true);

    fetch(`https://bqv9rgyo5b.execute-api.eu-west-1.amazonaws.com/Prod/?ticker=${ticker}&growth_rate=${growthRate}`)
      .then(data => data.json())
      .then(data => setValuation(data))
      .then(_ => setLoading(false))
  }

  console.log(valuation)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span style={{ color: "#0070f3" }}>Valuations!</span>
        </h1>

        <form 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            textAlign: "center", 
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <label htmlFor="ticker">Ticker</label>
          <input 
            type="text" 
            name="ticker" 
            onChange={event => setTicker(event.target.value)}
            style={{
              border: "1px solid #eaeaea",
              borderRadius: "10px",
              textAlign: "center",
            }}
            placeholder="tsla"
          />
            
          <label htmlFor="growth">Growth Rate</label>
          <input 
            type="number" 
            step="0.01" 
            disabled
            onChange={event => setGrowthRate(event.target.value)} 
            style={{
              border: "1px solid #eaeaea",
              borderRadius: "10px",
              textAlign: "center",
            }}
            placeholder="1.5"
          />
          
          <button 
            className={styles.button}
            onClick={handleValuationRequest}
          >
            &rarr; { loading && "Loading..." }
          </button>
        </form>

        { valuation && (
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>DCF Value</h3>
              <p>${ round2(valuation.dcf_value) }</p>
            </div>

            <div className={styles.card}>
              <h3>PE Multiple</h3>
              <p>{ round2(valuation.pe_multiple) }</p>
            </div>

            <div className={styles.card}>
              <h3>Final EPS</h3>
              <p>${ round2(valuation.eps[valuation.eps.length - 1]) }</p>
            </div>

            <div className={styles.card}>
              <h3>Final Net Income</h3>
              <p>${ round2(valuation.net_income[valuation.net_income.length - 1]) } million</p>
            </div>

          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://valuations.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Valuations by Christopher Grounds
        </a>
      </footer>
    </div>
  )
}
