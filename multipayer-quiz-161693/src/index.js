import React from "react";
import {createRoot }from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/index";
import { Provider } from "react-redux";


const root  = createRoot( document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
   
      <App />
  
    </Provider>
  </React.StrictMode>
);

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
