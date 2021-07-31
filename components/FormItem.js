import React from 'react';

export default ({ htmlFor, label, type, onChange, placeholder, required }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "2rem",
      }}
    >
      <label htmlFor={htmlFor}>{label}</label>
      <input 
        type={type}
        name={htmlFor}
        onChange={onChange}
        style={{
          border: "1px solid #eaeaea",
          textAlign: "center",
          height: "100%",
        }}
        placeholder={placeholder}
        required={required}
        step={0.1}
      />
    </div>
  )
}
