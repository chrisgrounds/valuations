import { useState } from "react";
import styles from '../styles/Home.module.css'
import Nav from "../components/Nav";
import FormItem from "../components/FormItem";
import Head from "../components/Head";
import Footer from "../components/Footer";

const round2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100

const Card = ({ title, content }) => (
  <button className={styles.card}>
    <h3>{title}</h3>
    <p>{content}</p>
  </button>
);

export default function Home() {
  const [ticker, setTicker] = useState(null);
  const [growthRate, setGrowthRate] = useState(null);
  const [operatingMargin, setOperatingMargin] = useState(null);
  const [discountRate, setDiscountRate] = useState(null);
  const [perpetualRate, setPerpetualRate] = useState(null);
  const [valuation, setValuation] = useState(null);
  const [loading, setLoading] = useState(null);
  const [showRequired, setShowRequired] = useState(false);

  const buildUrl = (params) => {
    const baseUrl = 'https://bqv9rgyo5b.execute-api.eu-west-1.amazonaws.com/Prod/';
    let paramsUrl = '?';

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        paramsUrl += `${key}=${value}&`;
      }
    }

    return baseUrl + paramsUrl
  }

  const handleValuationRequest = (e) => {
    e.preventDefault();

    setLoading(true);

    if(!ticker) {
      setShowRequired(true);
    } else {
      setShowRequired(false);
    }

    fetch(buildUrl({ ticker: ticker, growth_rate: growthRate, operating_margin: operatingMargin, discount_rate: discountRate, perpetual_rate: perpetualRate }))
      .then(data => data.json())
      .then(data => setValuation(data))
      .then(_ => setLoading(false))
      .catch(_ => setLoading(false))
  }

  return (
    <div className={styles.container}>
      <Head title="Valuations" />
      
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span style={{ color: "#0070f3" }}>Valuations!</span>
        </h1>

        <form 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            textAlign: "center", 
            gap: "0.5rem",
            marginTop: "2rem",
          }}
        >
          <FormItem 
            htmlFor="ticker" 
            label="Ticker*" 
            type="text" 
            onChange={event => setTicker(event.target.value)} 
            placeholder="tsla"
            required
          />

          <FormItem 
            htmlFor="growth" 
            label="Growth Rate"
            type="number" 
            onChange={event => setGrowthRate(event.target.value)} 
            placeholder="1.5"
          />

          <FormItem 
            htmlFor="operating_margin" 
            label="Operating Margin" 
            type="number" 
            onChange={event => setOperatingMargin(event.target.value)} 
            placeholder="0.1"
          />

          <FormItem 
            htmlFor="discount_rate" 
            label="Discount Rate" 
            type="number" 
            onChange={event => setDiscountRate(event.target.value)} 
            placeholder="0.15"
          />

          <FormItem 
            htmlFor="perpetual_rate" 
            label="Perpetual Rate" 
            type="number" 
            onChange={event => setPerpetualRate(event.target.value)} 
            placeholder="1.03"
          />
            
          <button 
            className={styles.button}
            onClick={handleValuationRequest}
          >
            &rarr; { loading && "Loading..." }
          </button>
        </form>

        {showRequired && (
          <div>
            <p 
              style={{
                color: "red"
              }}
            >
              Ticker is required
            </p>
          </div>
        )}

        { valuation && (
          <div className={styles.grid}>
            <Card title="DCF Value" content={`\$${round2(valuation.dcf_value)}`} />
            <Card title="PE Multiple" content={round2(valuation.pe_multiple)} />
            <Card title="Final EPS" content={`\$${round2(valuation.eps[valuation.eps.length - 1])}`} />
            <Card title="Final Net Income" content={`\$${round2(valuation.net_income[valuation.net_income.length - 1])}`} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
