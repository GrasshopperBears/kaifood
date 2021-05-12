import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Card, Popover } from "antd";
import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";

const MainMenuCard = ({ title, menus, info, code }) => {
  const history = useHistory();
  const clickHandler = (e) => {
    if (e.target.closest(".ant-popover")) return;
    // history.push(`/restaurant/inside/${code}`);
  };

  return (
    <CardStyled title={title} onClick={clickHandler} bordered={false} extra={<InfoPopover info={info} />}>
      {menus}
    </CardStyled>
  );
};

const InfoPopover = ({ info }) => {
  const clickHandler = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <Popover placement="left" overlayStyle={{ maxWidth: "60%" }} content={info} trigger="click" arrowPointAtCenter>
      <InfoCircleOutlined onClick={clickHandler} />
    </Popover>
  );
};

const CardStyled = styled(Card)`
  .ant-card-head {
    min-height: 0;
    background-color: ${(props) => props.theme.color.darkPurple};
    color: white;
    border-radius: ${(props) => props.theme.radius.md} ${(props) => props.theme.radius.md} 0 0;
    .ant-card-head-wrapper > * {
      padding-top: 12px;
      padding-bottom: 12px;
    }
    .anticon {
      color: white;
      font-size: 1.2rem;
    }
  }
  .ant-card-body {
    background-color: ${(props) => props.theme.color.mistyRose};
    border-radius: 0 0 ${(props) => props.theme.radius.md} ${(props) => props.theme.radius.md};
  }
`;

export default MainMenuCard;
