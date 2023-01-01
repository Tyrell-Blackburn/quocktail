import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery, useQueries } from '@tanstack/react-query'
import axios from 'axios';
import Spinner from './components/Spinner';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";

import Home from "./components/Home";
import Search from './components/Search';
import AdvSearch from './components/AdvSearch';
import RandomDrink from './components/RandomDrink';
import "./styles.css";

import ScrollToTop from "./utility/ScrollToTop";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

axios.defaults.timeout = 6000;

let theme = createTheme();
theme = responsiveFontSizes(theme);

const URL_ALCOHOL = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic';
const URL_NO_ALCOHOL = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Non_Alcoholic';
const URL_OPTIONAL_ALCOHOL = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Optional_alcohol';
let queryKeys = []; // ['a', 'b', 'c', 'd', ...]

for (let i = 0; i < 26; i ++) {
  const charCode = String.fromCharCode(97 + i);
  queryKeys.push(charCode);
}

for (let i = 0; i <= 9; i ++) {
  const number = i;
  queryKeys.push(number);
}

function App() {

  const tempData = useQueries({
    queries: queryKeys.map((key) => {
      return {
        queryKey: ['drinks', key],
        queryFn: () => getAllData(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?f=${key}`),
        refetchOnWindowFocus: false
      }
    }),
  })
  
  useEffect(() => {
    let loading = false;

    for (let i = 0; i < tempData.length; i ++ ) {
      if (tempData[i].fetchStatus !== 'idle') {
        // console.log('loading', tempData)
        loading = true;
        break;
      } 
    }

    if (!loading) {
      // console.log('not loading', tempData);
      let flattenedData = [];

      tempData.forEach(el => {
        if (el.data) {
          // console.log(el.data);
          flattenedData = [...flattenedData, ...el.data]
        } 
      })
      flattenedData = flattenedData.sort((a, b) => a.strDrink.localeCompare(b.strDrink)); // sort drink arrays
      console.log(flattenedData);
    } 
  }, [tempData]);

  const getAllData = async (url) => {
    try {
      const response = await axios.get(url);
      const drinks = response.data.drinks;
      return drinks;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

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

  const alcoholData = useQuery(['alcoholDrinks'], () => getData(URL_ALCOHOL), { refetchOnWindowFocus: false });
  const noAlcoholData = useQuery(['noAlcoholDrinks'], () => getData(URL_NO_ALCOHOL), { refetchOnWindowFocus: false });
  const optionalAlcoholData = useQuery(['optionalAlcoholDrinks'], () => getData(URL_OPTIONAL_ALCOHOL), { refetchOnWindowFocus: false });

  // useEffect(() => {
  //   console.log('loading', alcoholData.isLoading, noAlcoholData.isLoading, optionalAlcoholData.isLoading)
  //   console.log('fetching', alcoholData.isFetching, noAlcoholData.isFetching, optionalAlcoholData.isFetching)
  //   console.log('error', alcoholData.isError, noAlcoholData.isError, optionalAlcoholData.isError)
  //   console.log('success', alcoholData.isSuccess, noAlcoholData.isSuccess, optionalAlcoholData.isSuccess)
  // }, [alcoholData, noAlcoholData, optionalAlcoholData]);

  const loading = alcoholData.isLoading || noAlcoholData.isLoading || optionalAlcoholData.isLoading || alcoholData.isFetching || noAlcoholData.isFetching || optionalAlcoholData.isFetching;
  const error = alcoholData.isError || noAlcoholData.isError || optionalAlcoholData.isError;
  const success = alcoholData.isSuccess && noAlcoholData.isSuccess && optionalAlcoholData.isSuccess;

  // console.log('error', error);
  // console.log('success', success);
  // console.log('data', alcoholData.data, noAlcoholData.data, optionalAlcoholData.data);
  // console.log('data', typeof alcoholData.data, typeof noAlcoholData.data, typeof optionalAlcoholData.data);
  // console.log('error', alcoholData.error, noAlcoholData.error, optionalAlcoholData.error)
  // console.log('error', alcoholData.isError, noAlcoholData.isError, optionalAlcoholData.isError)

  let allDrinks;
  let invalidURL = false;
  let noData = false;
  const timeoutMessage = `timeout of ${axios.defaults.timeout}ms exceeded`;

  if (success) {
    if (alcoholData.data === 'None Found' || noAlcoholData.data === 'None Found' || optionalAlcoholData.data === 'None Found') noData = true;
    else if (alcoholData.data.message === timeoutMessage || noAlcoholData.data.message === timeoutMessage || optionalAlcoholData.data.message === timeoutMessage) invalidURL = true;
    else {
      allDrinks = [...alcoholData.data, ...noAlcoholData.data, ...optionalAlcoholData.data]; // combine drink arrays
      allDrinks = allDrinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink)); // sort drink arrays
    }
  }

  return (
    <div className="App">
      {
        loading ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}><CircularProgress size={400} /></Box> :
        noData ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white', fontSize: '4rem'}}><span>Failed to fetch data</span></Box> :
          invalidURL ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white', fontSize: '4rem'}}><span>Invalid API URL</span></Box> :
            error ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white', fontSize: '4rem'}}><span>An Error Occured</span></Box> :
              <ThemeProvider theme={theme}>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home allDrinks={allDrinks} />} />
                  <Route path="/search" element={<Search allDrinks={allDrinks} />} />
                  <Route path="/search/:id" element={<Search allDrinks={allDrinks} />} />
                  <Route path="/advsearch" element={<AdvSearch alcoholDrinks={alcoholData.data} noAlcoholDrinks={noAlcoholData.data} optionalAlcoholDrinks={optionalAlcoholData.data} allDrinks={allDrinks} />} />
                  <Route path="/random" element={<RandomDrink />} />
                </Routes>
              </ThemeProvider>
      }
    </div>
  );
}

export default App;
