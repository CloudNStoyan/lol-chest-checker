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

  .filter-input {
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

  .filter-chest-granted {
    display: flex;
    justify-content: end;
    margin-bottom: 10px;

    label {
      cursor: pointer;
      user-select: none;
    }

    input[type="checkbox"] {
      appearance: none;
      margin: 0;
      display: flex;
      align-items: center;
      color: red;
      padding: 5px;
      border: 1px solid #a335ee;
      border-radius: 50%;
      margin-left: 10px;

      &::before {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #a335ee;
      }

      &:checked::before {
        background-color: white;
      }
    }

    label {
      color: #a335ee;
      font-weight: 600;
    }
  }
`;

export default ChampionWrapperStyled;
