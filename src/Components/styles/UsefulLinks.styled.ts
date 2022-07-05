import styled from "styled-components";

const UsefulLinksStyled = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  margin-top: 10px;

  a {
    text-decoration: none;
    border: 2px solid #a335ee;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 600;
    color: #a335ee;
  }
`;

export default UsefulLinksStyled;
