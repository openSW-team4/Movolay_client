import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { MyPage } from "../routes/mypage";

const Title = styled.div`
  position: sticky;
  font-size: 70px;
  font-weight: 600;
  color: white;
  text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
  margin-left: 180px;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  color:white;
  padding: 20px;
  height: 95px;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 20px;
  margin-left: 170px;
`;
const Home = styled.span`
  font-size: 25px;
  font-weight: bolder !important;
  margin-right: 30px;
`;
const Movie = styled.span`
  font-size: 25px;
  font-weight: bolder !important;
  margin-right: 30px;
`;

const Search = styled.div`
  font-size: 60px;
  font-weight: 600;
  margin-right: 190px;
`;

const Mypage = styled.div`
  font-size: 25px;
  font-weight: bolder !important;
  margin-right: 30px;
`;

export function Nav() {
  const navigate = useNavigate();
  const onClick = (r) => {
    navigate(`/${r}`);
  };

  return (
    <Banner>
      <Title onClick={() => onClick("")}>--사이트제목--</Title>
      <Menu>
        <Home onClick={() => onClick("home")}>home</Home>
        <Movie onClick={() => onClick("movies")}>movies</Movie>
        <Mypage onClick={()=> onClick("MyPage")}> MyPage</Mypage>
      </Menu>
      <Search onClick={() => onClick("search")}>⌕</Search>
    </Banner>
  );
}
