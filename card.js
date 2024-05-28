import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieFont = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 10px;
  color:white;
  text-align: center;
  font-weight: bolder !important;
  width: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%;
  width: 100%;
  border-radius: 5%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Movielist = styled.div`
  color: black;
  padding: 20px;
  position: relative;
`;

const Text = styled.span`
  width: 14vw;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bgUrl});
  border-radius: 5%;
  height: 340px;
  background-size: cover;
  cursor: pointer;
`;
const Population = styled.div`
  text-align: center;
  margin-right: 20px;
  line-height: 0em;
  padding-bottom: 15px;
`;

const Button = styled.button`
  width: 90px;
  height: 35px;
  margin-left: 8px;
  border-radius: 10px;
  border: 0px;
  text-align: center;
  background-color: white;
  cursor: pointer;
`;

export default function Card(props) {
  const [isOver, setIsOver] = useState(false);
  const navigate = useNavigate();
  const onMouseHover = () => {
    setIsOver(true);
  };
  const onMouseLeave = () => {
    setIsOver(false);
  };

  const onCardClick = (id) => {
    navigate(`${props.id}`);
  };

  return (
    <Movielist>
      <Poster
        bgUrl={`https://image.tmdb.org/t/p/w200${props.poster}`}
        key={props.id}
        onMouseOver={onMouseHover}
        onMouseLeave={onMouseLeave}
      >
        {isOver ? (
          <Wrap key={props.id}>
            <Wrap2>
              <Text>{props.overview}</Text>
              <Button onClick={onCardClick}>
                <strong>상세보기</strong>
              </Button>
            </Wrap2>
          </Wrap>
        ) : null}
      </Poster>
      <MovieFont>{props.title}</MovieFont>
      <Population> ⭐️ {props.vote}</Population>
    </Movielist>
  );
}
