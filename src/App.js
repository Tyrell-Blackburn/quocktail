import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueries } from '@tanstack/react-query'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";

import Home from "./components/Home";
import Search from './components/Search';
import AdvSearch from './components/AdvSearch';
import RandomDrink from './components/RandomDrink';
import "./styles.css";

import ScrollToTop from "./utility/ScrollToTop";

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

axios.defaults.timeout = 10000; // set axios timeout in ms

// set responsiveness sizes for text
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 2000
    },
  },
});
theme = responsiveFontSizes(theme);

let queryKeys = []; // becomes ['a', 'b', 'c', 'd', ... 0, 1, 2, 3 ...]

for (let i = 0; i < 26; i ++) {
  const charCode = String.fromCharCode(97 + i);
  queryKeys.push(charCode);
}

for (let i = 0; i <= 9; i ++) {
  const number = i;
  queryKeys.push(number);
}

function App() {
  
  const [allDrinks, setAllDrinks] = useState(null);
  const [allLoading, setAllLoading] = useState(true);

  // extra all detailed data on drinks from the API
  const allDrinksData = useQueries({
    queries: queryKeys.map((key) => {
      return {
        queryKey: ['drinks', key],
        queryFn: () => getData(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?f=${key}`),
        refetchOnWindowFocus: false, // re-enable this for production
      }
    })
  })
  
  useEffect(() => {
    let loading = false;

    for (let i = 0; i < allDrinksData.length; i ++ ) {
      if (allDrinksData[i].fetchStatus !== 'idle') {
        loading = true;
        break;
      } 
    }

    if (!loading) {
      let flattenedData = [];

      allDrinksData.forEach(el => {
        if (el.data) {
          flattenedData = [...flattenedData, ...el.data]
        } 
      })
      
      flattenedData.sort((a, b) => a.strDrink.localeCompare(b.strDrink)); // sorts drinks array alphabetically

      if (!allDrinks) setAllDrinks(flattenedData);
      setAllLoading(false);
    } 
  }, [allDrinksData, allDrinks, setAllDrinks]);
  
  
  // useEffect(() => {
  //   console.log('ready', allDrinks);
  // },[allDrinks])

  const getData = async (url) => {
    try {
      const response = await axios.get(url);
      const drinks = response.data.drinks;
      return drinks;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const error = allDrinksData.isError;
  const success = allDrinksData.isSuccess;

  let invalidURL = false;
  let noData = false;
  const timeoutMessage = `timeout of ${axios.defaults.timeout}ms exceeded`;

  if (success) {
    if (allDrinksData.data === 'None Found') noData = true;
    else if (allDrinksData.data.message === timeoutMessage) invalidURL = true;
  }

  return (
    <div className="App">
      {
        allLoading ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}><CircularProgress size={400} /></Box> :
        noData ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white', fontSize: '4rem'}}><span>Failed to fetch data</span></Box> :
          invalidURL ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white', fontSize: '4rem'}}><span>Invalid API URL</span></Box> :
            error ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white', fontSize: '4rem'}}><span>An Error Occured</span></Box> :
              <ThemeProvider theme={theme}>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home allDrinks={allDrinks} />} />
                  {/* <Route path="/search" element={<Search allDrinks={allDrinks} />} /> */}
                  <Route path="/search/:id" element={<Search allDrinks={allDrinks} />} />
                  <Route path="/advsearch" element={<AdvSearch allDrinks={allDrinks} />} />
                  <Route path="/random" element={<RandomDrink />} />
                </Routes>
              </ThemeProvider>
      }
    </div>
  );
}

export default App;
