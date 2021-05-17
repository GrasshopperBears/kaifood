import React from "react";
import styled from "styled-components";

const GeneralLayout = ({ children }) => {
  return <GeneralWrapper>{children}</GeneralWrapper>;
};

const GeneralWrapper = styled.div`
  padding: 20px ${(props) => props.theme.padding.sidePadding};
`;

export default GeneralLayout;
