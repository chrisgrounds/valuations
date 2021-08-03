const EmphasiseText = ({ text, color }) => (
  <span style={{ color: `${color || "#0070f3"}`, fontWeight: "bold" }}>
    {text}
  </span>
)

export default EmphasiseText;
