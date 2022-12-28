import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

import Home from "./components/Home";
import Search from './components/Search';
import AdvSearch from './components/AdvSearch';
import RandomDrink from './components/RandomDrink';
import "./styles.css";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const URL_ALCOHOL = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic';
const URL_NO_ALCOHOL = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Non_Alcoholic';
const URL_OPTIONAL_ALCOHOL = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Optional_alcohol';


function App() {

  const getData = async (url) => {
    const { data: response } = await axios.get(url);
    console.log(response);
    return response;
  };

  const alcoholData = useQuery(['alcoholData'], () => getData(URL_ALCOHOL), { refetchOnWindowFocus: false });
  const noAlcoholData = useQuery(['NoAlcoholData'], () => getData(URL_NO_ALCOHOL), { refetchOnWindowFocus: false });
  const optionalAlcoholData = useQuery(['optionalAlcoholData'], () => getData(URL_OPTIONAL_ALCOHOL), { refetchOnWindowFocus: false });

  // const {
  //   noAlcoholData,
  //   noAlcoholFetchStatus,
  //   noAlcoholIsLoading,
  //   noAlcoholError,
  //   noAlcoholIsError,
  //   noAlcoholIsSuccess
  // } = useQuery(['NoAlcoholData'], () => getData(URL_NO_ALCOHOL), { refetchOnWindowFocus: false });


  useEffect(() => {
    console.log('loading', alcoholData.isLoading, noAlcoholData.isLoading, optionalAlcoholData.isLoading)
    console.log('fetching', alcoholData.isFetching, noAlcoholData.isFetching, optionalAlcoholData.isFetching)
  }, [alcoholData, noAlcoholData, optionalAlcoholData]);

  const loading = alcoholData.isLoading && noAlcoholData.isLoading && optionalAlcoholData.isLoading &&alcoholData.isFetching && noAlcoholData.isFetching && optionalAlcoholData.isFetching;
  const error = alcoholData.isError && noAlcoholData.isError && optionalAlcoholData.isError;
  console.log('error bool', error);
  console.log('loading bool', loading);
  const success = alcoholData.isSuccess && noAlcoholData.isSuccess && optionalAlcoholData.isSuccess;
  console.log('success bool', success);

  let allDrinks;
  if (success) {
    allDrinks = [...alcoholData.data.drinks, ...noAlcoholData.data.drinks, ...optionalAlcoholData.data.drinks];
    console.log(allDrinks);
    allDrinks = allDrinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
    console.log(allDrinks);
  }

  return (

    <div className="App">
      {
        loading ? <span>Is Loading</span> :
        error ? <span>Error Occured</span> : 
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Home allDrinks={allDrinks} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:id" element={<Search />} />
              <Route path="/advsearch" element={<AdvSearch />} />
              <Route path="/random" element={<RandomDrink />} />
            </Routes>
          </ThemeProvider>
      }

    </div>
  );
}

export default App;
