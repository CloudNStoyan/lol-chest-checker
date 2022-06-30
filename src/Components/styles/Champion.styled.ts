import styled from "styled-components";

const ChampionStyled = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 60px;
  flex: 0 0 60px;
  height: 60px;

  &.ChestGrantedTrue img,
  &.ChampOwnedFalse img {
    filter: grayscale(1);
  }

  img {
    width: 100%;
    height: 100%;
  }

  span {
    position: absolute;
    font-weight: 700;
    font-size: 10px;
    color: #dc3545;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
    width: 100%;
    text-align: center;
  }
`;

export default ChampionStyled;
