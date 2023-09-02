import React from "react";
import {createRoot }from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/index";
import { Provider } from "react-redux";
// import { ThemeProvider } from '@material-ui/core/styles';
// import { createTheme } from '@mui/material/styles';
// import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// const muiTheme = createTheme();
// const theme = extendTheme();


const root  = createRoot( document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
    {/* <ChakraProvider theme={theme} >
    <ThemeProvider theme={muiTheme}> */}
      <App />
      {/* </ThemeProvider>
    </ChakraProvider> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// // index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { ChakraProvider } from '@chakra-ui/react';
// import { ThemeProvider } from '@mui/material/styles';
// import App from './App';
// import chakraTheme from './chakraUiTheme';
// import materialUITheme from './materialUiTheme';
//  import store from "./store/index";
//  import { Provider } from "react-redux";

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <ChakraProvider theme={chakraTheme}>
//       <ThemeProvider theme={materialUITheme}>
//         <App />
//       </ThemeProvider>
//     </ChakraProvider>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
