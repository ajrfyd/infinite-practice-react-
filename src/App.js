import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import styled from 'styled-components';

const App = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client} >
      Hello App??
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App;

const Container = styled.div`
  
`