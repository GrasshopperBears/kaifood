import React, { useCallback } from "react";
import { isBrowser } from "react-device-detect";
import { useHistory } from "react-router-dom";
import { Card, Popover, Divider } from "antd";
import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";

const MainMenuCard = ({ menus, info }) => {
  const history = useHistory();
  const clickHandler = (e) => {
    if (e.target.closest(".ant-popover")) return;
    history.push(`/restaurant/in-campus/${info.code}`);
  };

  return (
    <CardStyled title={info.name} onClick={clickHandler} bordered={false} extra={<InfoPopover info={info} />} hoverable={isBrowser}>
      {menus}
    </CardStyled>
  );
};
const InfoPopover = ({ info }) => {
  const clickHandler = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <Popover
      placement="left"
      overlayInnerStyle={{ padding: "20px 0" }}
      overlayStyle={{ maxWidth: "70%" }}
      content={<PopoverContent info={info} />}
      trigger="click"
      arrowPointAtCenter
    >
      <InfoCircleOutlined onClick={clickHandler} />
    </Popover>
  );
};

const PopoverContent = ({ info }) => {
  const { address, time } = info;
  return (
    <>
      <p>위치 : {address}</p>
      <Divider style={{ margin: "7px 0" }} />
      {time[0].split("//").map((eachTime) => (
        <p>{eachTime}</p>
      ))}
    </>
  );
};

const CardStyled = styled(Card)`
  margin: 15px 0;
  word-break: keep-all;

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
