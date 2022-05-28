import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import styled from 'styled-components';
import axios from "axios";
import Home from "./Home";

const App = () => {
  const client = new QueryClient();
  const [queryClient] = useState(() => new QueryClient());
  // const getPokeList = async() => {
  //   try {
  //     const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20');
  //     console.log(res);
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }
 



  return (
    <QueryClientProvider client={queryClient} >
      <Home />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App;

const Container = styled.div`
  
`