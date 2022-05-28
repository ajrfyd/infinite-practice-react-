import React from "react";
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Card = ({ id, name }) => {

  return (
    <CardContainer>
      {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name} /> */}
      <LazyLoadImage src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name}/>
      <p>{name}</p>
    </CardContainer>
  )
}

export default Card;

const CardContainer = styled.div`
  text-align: center;
  padding: 1rem 0;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .4);
  /* border: 5px dashed red; */
  &:hover {
    transform: scale(1.01);
  }
`