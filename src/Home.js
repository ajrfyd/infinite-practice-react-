import React from "react";
import { QueryClient, QueryClientProvider, useQuery, useInfiniteQuery, notifyManager } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import styled from 'styled-components';
import axios from "axios";


const Home = () => {

  const getPokeList = ({ pageParam = OFFSET }) => axios.get('https://pokeapi.co/api/v2/pokemon', { params:{ limit: OFFSET, offset: pageParam }}).then(res => res?.data); 
  // const { data, isLoading, isError } = useQuery(['poke', 1], getPokeList, { keepPreviousData: true })
  // console.log(data);
  const OFFSET = 30;
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery(
    'pokemonList',
    getPokeList,
    {
      getNextPageParam: (lastPage, page) => {
        console.log(lastPage);
        const { next } = lastPage;
        // console.log(page);
        if(!next) return false;
        console.log(Number(new URL(next).searchParams.get("offset")))
        return Number(new URL(next).searchParams.get("offset"));
      }
    }
  )
  console.log(data);
  return (
    <Container>
      {
        status === 'loading' && <p>Loading....</p>
      }
      {
        status === 'error' && <p>{error.message}</p>
      }
      {
        status === 'success' && data.pages.map((poke, idx) => (
          <PokeContainer key={idx}>
            {poke.results.map(pok => (
              <PokeDiv key={pok.name}>
                <p>
                  {pok.name}
                </p>
              </PokeDiv>
            ))}
          </PokeContainer>
        ))
      }
      <button 
        onClick={() => fetchNextPage()}
        style={{
          marginTop: '1rem',
          border: 'none',
          padding: '.7rem .5rem',
          borderRadius: '5px',
          backgroundColor: '#6200ee',
          color: '#fff',
          fontSize: '.9rem',
          fontWeight: 'bold'
        }}
      >
          More Data
      </button>
      {
        isFetchingNextPage && <p>Load More...</p>
      }
    </Container>
  )
}

export default Home;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  padding: .2rem 0;
`

const PokeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 60%;
  & + & {
    margin-bottom: 2rem;
  }
`

const PokeDiv = styled.div`
  text-align: center;
  padding: 1rem 0;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .4);
  /* border: 5px dashed red; */
  
`