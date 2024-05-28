import { styled } from "styled-components";
import { movies } from "../api";
import Card from "../components/card";
import { useMatch } from "react-router-dom";
import { Modal } from "../components/modal";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-left: 160px;
  margin-right: 160px;
  margin-top: 30px;
  z-index: 80;
`;

export function Movies() {
  const isMatch = useMatch("/movies/:id");
  const theId =
    isMatch?.params.id &&
    movies.results.find((movie) => movie.id + "" === isMatch.params.id);

  return (
    <>
      {isMatch ? (
        <Modal
          title={theId.title}
          overview={theId.overview}
          average={theId.vote_average}
          poster={theId.poster_path}
        />
      ) : null}
      <Wrapper>
        {movies.results.map((movies) => (
          <Card
            id={movies.id}
            overview={movies.overview}
            poster={movies.poster_path}
            title={movies.title}
            vote={movies.vote_average}
            key={movies.id}
          />
        ))}
      </Wrapper>
    </>
  );
}
