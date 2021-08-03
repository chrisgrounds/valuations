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
      : `${Math.abs(percentChange)}% drop`;

  const color = dcfValue - currentPrice > 0  ? "0070f3" : "red";

  return (
    <div style={{ marginBottom: "1rem", maxWidth: "800px" }}>
      <p>
        Based on this DCF valuation of <EmphasiseText color={color} text={`\$${dcfValue}`} /> and current stock price of <EmphasiseText color={color} text={`\$${currentPrice}`} />, you could <EmphasiseText color={color} text={buyOrSell} /> this equity and expect a <EmphasiseText color={color} text={returnExpectation} /> followed by returns in line with your discount rate of <EmphasiseText color={color} text={`${discountRate * 100 || 15}%`} />.
      </p>
    </div>
  );
}

export default Information;
