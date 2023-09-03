
import AllRoutes from "./Routes";
// import "./App.css";
// function App() {
//   return (
//       <AllRoutes />

//   );
// }

// export default App;

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AllRoutes />
    </ThemeProvider>
  );
}

export default App;

