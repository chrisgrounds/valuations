import EmphasiseText from "./EmphasiseText";
import round2 from "./round2";

const Information = ({ valuation, discountRate }) => {
  const dcfValue = round2(valuation.dcf_value);
  const currentPrice = valuation.current_price;
  const buyOrSell = dcfValue - currentPrice > 0 ? "BUY" : "SELL";
  const percentChange = round2(((dcfValue - currentPrice) / currentPrice) * 100);
  const returnExpectation 
    = dcfValue - currentPrice > 0 
      ? `${percentChange}% upside` 
      : `${percentChange}% downside`;

  return (
    <div style={{ marginBottom: "1rem", maxWidth: "800px" }}>
      <p>
        Based on this DCF valuation of <EmphasiseText text={`\$${dcfValue}`} /> and current stock price of <EmphasiseText text={`\$${currentPrice}`} />, you could <EmphasiseText text={buyOrSell} /> this equity and expect a <EmphasiseText text={returnExpectation} /> followed by returns in line with your discount rate of <EmphasiseText text={`${discountRate * 100 || 15}%`} />.
      </p>
    </div>
  );
}

export default Information;
