import React from 'react'

export default () => (
  <header style={{ display: "flex", alignItems: "center" }}>
  <img
    src="https://cdn.pixabay.com/photo/2016/03/31/21/05/beverage-1296175_960_720.png"
    alt="react-static-teapot"
    style={{ width: "20vw" }}
  />
  <div
    style={{
      float: "left",
      verticalAlign: "bottom",
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column"
    }}
  >
    <h1>It's blog time.</h1>
  </div>
</header>
)
