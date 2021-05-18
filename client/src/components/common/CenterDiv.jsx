import React from "react";
import styled from "styled-components";

const CenterDiv = ({ children, style }) => {
  return <Wrapper style={style}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default CenterDiv;
