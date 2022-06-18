import styled from "styled-components";

const BenchedChampionsListStyled = styled.div`
  display: flex;
  flex-flow: column nowrap;

  > :first-child {
    width: 600px;
    justify-content: center;

    > div {
      margin: 0 auto;
      border-left: 4px solid gold;
    }
  }

  > :last-child {
    width: 640px;
    display: flex;
    gap: 10px;
    margin: 10px;
  }
`;

export default BenchedChampionsListStyled;
