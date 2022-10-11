import styled from "styled-components";

const BenchedChampionsListStyled = styled.div`
  display: flex;
  flex-flow: column nowrap;

  .bench-list {
    display: flex;
    gap: 10px;
    flex-flow: row wrap;
    justify-content: center;
  }

  .curr-champ {
    margin: 0 auto;
    margin-bottom: 20px;

    .champ__data {
      margin: 0 auto;
    }
  }
`;

export default BenchedChampionsListStyled;
