import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 20px;
    text-decoration: none;
    color: #3F3A3A;
  }
`;

export default GlobalStyle;
