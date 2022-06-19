import styled from "styled-components";

const ChampionWrapperStyled = styled.div`
  margin: 10px;
  display: flex;
  flex-flow: column nowrap;

  h2 {
    background-color: #a335ee;
    color: white;
    text-align: center;
  }

  h2:first-of-type {
    margin-top: 0;
  }

  input {
    margin-bottom: 20px;
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
