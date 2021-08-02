import { useState } from "react";
import styles from '../styles/Home.module.css'
import Nav from "../components/Nav";
import FormItem from "../components/FormItem";
import Head from "../components/Head";
import Footer from "../components/Footer";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const round2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100

const Card = ({ title, content, popupContent }) => (
  <Popup 
    trigger={
      <button className={styles.card}>
        <h3>{title}</h3>
        <p>{content}</p>
      </button>
    } 
    position="right center"
  >
    {close => (
      <div className={styles.modalContainer}>
        <button className={styles.modalClose} onClick={close}>
          &times;
        </button>
        <div className={styles.modalHeader}>{title}</div>
        <div className={styles.modalContent}>{popupContent}</div>
      </div>
    )}
  </Popup>
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
            <Card 
              title="DCF Value" 
              content={`\$${round2(valuation.dcf_value)}`}
              popupContent="This is the discounted cash flow value, which is the value of the company based on the given parameters. This value is calculated by taking the companies future cash flows and discounting them back to today, using the given discount rate. The discount rate can be thought of as the return on investment you want. If the current stock price is lower than the DCF value, then you would expect a return on investment greater than your discount rate."
            />
            <Card 
              title="PE Multiple" 
              content={round2(valuation.pe_multiple)}
              popupContent="The price to earnings multiple that is derived through averaging the results of the perpetual growth PE and the earnings growth PE. The perpetual growth PE is derived from the perpetual rate and the discount rate, and the earnings growth PE is derived from average earnings growth and a default PEG ratio."
            />
            <Card 
              title="Final EPS" 
              content={`\$${round2(valuation.eps[valuation.eps.length - 1])}`}
              popupContent="The earnings per share of the last year this DCF valuation is calculated on. Earnings per share are calculated by taking the company net income and dividing by the number of shares."
            />
            <Card 
              title="Final Net Income" 
              content={`\$${displayNumber(valuation.net_income[valuation.net_income.length - 1])}`}
              popupContent="The net income of the last year this DCF valuation is calculated on. Net income is the bottom line of the income statement, and is the value left over to shareholders."
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

const displayNumber = (num) => {
  console.log(num);
  const numAsString = new Number(num).toString();
  console.log(numAsString);

  const nonFractional = numAsString.split(".")[0];
  console.log(nonFractional);

  if (nonFractional.length > 7) {
    return `${round2(num / 1000000000)}bn`;
  }

  return `${round2(num / 1000000)}M`;
}