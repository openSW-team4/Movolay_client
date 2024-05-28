import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 90;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ModalPoster = styled.div`
  background-image: url(${(props) => props.bgUrl});
  border-radius: 2%;
  height: 400px;
  width: 270px;
  background-size: cover;
  margin-right: 30px;
`;

const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.div`
  text-align: center;
  font-size: 50px;
  color: white;
  font-weight: bolder !important;
`;

const ModalVote = styled.div`
  text-align: center;
  font-size: 30px;
  color: white;
`;

const ModalText = styled.div`
  height: 300px;
  width: 500px;
  margin: 20px;
  text-align: center;
  font-size: 20px;
  color: white;
`;

export function Modal(props) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/movies");
  };
  return (
    <ModalWrapper onClick={onClick}>
      <ModalPoster bgUrl={`https://image.tmdb.org/t/p/w200${props.poster}`} />
      <ModalWrap>
        <ModalTitle>{props.title}</ModalTitle>
        <ModalVote>⭐️{props.average}</ModalVote>
        <ModalText>{props.overview}</ModalText>
      </ModalWrap>
    </ModalWrapper>
  );
}
