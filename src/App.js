import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import DrinkDetails from './components/DrinkDetails';
import "./styles.css";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme();

// let theme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
//   typography: {
//     h1: {
//       fontFamily: "Gravitas One",
//       fontWeight: 700,
//       letterSpacing: theme.spacing(1),
//       mb: theme.spacing(1),
//     }
//   }
// });

theme = responsiveFontSizes(theme);
// console.log(theme.typography.h4);
// theme.typography = {
//   ...theme.typography,
//   h1: {
//     ...theme.typography.h1,
//     fontSize: "2.5rem"
//   },
//   h3: {
//     ...theme.typography.h3,
//     fontSize: "1.4rem"
//   },
//   h4: {
//     ...theme.typography.h4,
//     fontSize: "1rem"
//   }
// }
// console.log(theme.typography.h4);

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drink/:id" element={<DrinkDetails />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
