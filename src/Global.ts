import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
  html,
  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background-color: ivory;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyled;
