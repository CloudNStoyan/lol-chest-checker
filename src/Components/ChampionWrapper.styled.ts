import styled from "styled-components";

const ChampionWrapperStyled = styled.div`
  margin: 10px;
  width: 640px;

  input {
    margin: 10px 0;
    width: 100%;
    border: 3px solid #a335ee;
    border-radius: 3px;
    height: 25px;

    &:focus {
      outline: 0;
      border-color: #dc48ff;
    }
  }
`;

export default ChampionWrapperStyled;
