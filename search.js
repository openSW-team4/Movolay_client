import { styled } from "styled-components";
import { useState } from "react";

const SearchBar = styled.input`
  border: 5px solid purple;
  height: 60px;
  width: 700px;
  margin: 30px;
  padding: 10px;
  font-size: 25px;
`;
const Wrap3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Search() {
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <Wrap3>
      <SearchBar
        type="text"
        value={search}
        onChange={onChange}
        placeholder={"⌕ 검색어를 입력하시오"}
      />
    </Wrap3>
  );
}
