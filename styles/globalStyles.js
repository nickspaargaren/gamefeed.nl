import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  html,
  body {height: 100%;}

  body {margin: 0;
    color: #292a2c;
    font-size: 15px;
    -webkit-text-size-adjust: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8f6f7;
  }

`;
 
export default GlobalStyle;