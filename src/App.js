import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import DrinkDetails from './components/DrinkDetails';
import RandomDrink from './components/RandomDrink';
import "./styles.css";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';


let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
  
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drink/:id" element={<DrinkDetails />} />
          <Route path="/random" element={<RandomDrink />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
