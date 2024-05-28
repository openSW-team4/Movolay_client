import { useState } from "react";
import { styled } from "styled-components";

const Wrap1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Poster1 = styled.span`
  background-image: url(${(props) => props.bgUrl});
  border-radius: 5%;
  height: 340px;
  background-size: cover;
`;
const Text1 = styled.span`
  font-size: 10px;
`;
const MovieFont1 = styled.span`
  font-size: 30px;
`;
const Population1 = styled.span`
  font-size: 10px;
`;

export default function Card1(props) {
  return (
    <>
      (
      <div key={props.id}>
        <Poster1
          bgUrl={`https://image.tmdb.org/t/p/w200${props.poster}`}
        ></Poster1>
        <Wrap1>
          <Text1>{props.overview}</Text1>
          <MovieFont1>{props.title}</MovieFont1>
          <Population1>⭐️ {props.vote}</Population1>
        </Wrap1>
      </div>
      )
    </>
  );
}
