import styled from "styled-components";

const ChampionStyled = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 0 0 20%;
  max-width: 120px;
  max-height: 120px;

  &.EARNED img {
    filter: grayscale(1);
  }

  span {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    position: absolute;
    font-weight: 700;
    color: #dc3545;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
    width: 100%;
    text-align: center;
  }
`;

export default ChampionStyled;
