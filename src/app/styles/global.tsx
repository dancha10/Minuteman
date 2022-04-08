import { createGlobalStyle } from 'styled-components'

import 'app/styles/main.css'

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
  }

  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  :focus,
  :active {
    outline: none;
  }

  a:focus,
  a:active {
    outline: none;
  }

  nav,
  footer,
  header,
  aside {
    display: block;
  }

  html,
  body {
    height: 100%;
    min-height: 100%;
    width: 100%;
    font-size: 100%;
    line-height: 1;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  input,
  button,
  textarea {
    font-family: inherit;
  }

  input::-ms-clear {
    display: none;
  }

  button {
    cursor: pointer;
  }

  button::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  a,
  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  ul li {
    list-style: none;
  }

  img {
    vertical-align: top;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-family: FactorA, sans-serif;
    font-weight: 400;
  }

  h1 {
    font-weight: 800;
    font-size: 42px;
    line-height: 1.2em;
  }

  h2 {
    font-weight: 700;
    font-size: 27px;
    line-height: 1.22em;
  }

  h3 {
    font-weight: 700;
    font-size: 20px;
    line-height: 1.2em;
  }

  h4 {
    font-weight: 700;
    font-size: 15px;
    line-height: 1.2em;
  }
`
