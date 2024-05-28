import { styled } from "styled-components";
import { movies } from "../api";
import Card1 from "../components/card1";

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export function Movinfo() {
  return (
    <Wrapper1>
      {movies.results.map((movies) => (
        <Card1
          overview={movies.overview}
          title={movies.title}
          poster={movies.poster_path}
          vote={movies.vote_average}
          key={movies.id}
        />
      ))}
    </Wrapper1>
  );
}
