import React from "react";
import { isBrowser } from "react-device-detect";
import styled from "styled-components";

const GeneralLayout = ({ children }) => {
  return <GeneralWrapper isBrowser={isBrowser}>{children}</GeneralWrapper>;
};

const GeneralWrapper = styled.div`
  padding: 20px ${(props) => (props.isBrowser ? props.theme.padding.browserSidePadding : props.theme.padding.mobileSidePadding)};
`;

export default GeneralLayout;
