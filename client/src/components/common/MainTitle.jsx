import React from "react";
import { Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;

const MainTitle = ({ children }) => {
  return <TitleStyled level={2}>{children}</TitleStyled>;
};

const TitleStyled = styled(Title)`
  font-family: "S-CoreDream-8Heavy";
`;

export default MainTitle;
