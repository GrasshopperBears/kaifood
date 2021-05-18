import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import CenterDiv from "@components/common/CenterDiv";
import { Spin } from "antd";
import styled from "styled-components";

const OwnerRouter = ({ exact, path, component }) => {
  const { initialized, isOwner } = useSelector((state) => state.userTracker);

  return initialized ? (
    isOwner ? (
      <Route exact={exact} path={path} component={component} />
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <CenterDiv>
      <SpinStyled size="large" />
    </CenterDiv>
  );
};

const SpinStyled = styled(Spin)`
  margin-top: 100px;
`;

export default OwnerRouter;
