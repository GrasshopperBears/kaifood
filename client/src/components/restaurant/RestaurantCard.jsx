import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import RestaurantInfo from "./RestaurantInfo";
import { Card } from "antd";
import styled from "styled-components";
import { MdRestaurantMenu } from "react-icons/md";

const RestaurantCard = ({ info, url }) => {
  const history = useHistory();
  const { name, phoneNumber, address, time } = info;

  const clickHandler = useCallback(() => {
    if (url) history.push(url);
  }, [history, url]);

  return (
    <CardStyled title={name} onClick={clickHandler}>
      <div style={{ width: "100%" }}>
        <RestaurantInfo time={time} address={address} phoneNumber={phoneNumber} />
      </div>
      {info.restaurantType === "restarant-in" && (
        <MenuDiv>
          <MdRestaurantMenu size="25" />
          <div>메뉴</div>
        </MenuDiv>
      )}
    </CardStyled>
  );
};

const CardStyled = styled(Card)`
  margin: 5px 0 10px 0;
  word-break: keep-all;

  .ant-card-head {
    min-height: 0;
    background-color: rgba(41, 110, 180, 0.95);
    color: white;
    border-radius: ${(props) => props.theme.radius.md} ${(props) => props.theme.radius.md} 0 0;
    .ant-card-head-wrapper > * {
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }
  .ant-card-body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: rgba(192, 189, 165, 0.4);
    border-radius: 0 0 ${(props) => props.theme.radius.md} ${(props) => props.theme.radius.md};
    * {
      font-family: "S-CoreDream-3Light";
    }
  }
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid gray;
  border-radius: 5px;
  width: 70px;
  height: 60px;
  font-size: 0.7rem;
`;

export default RestaurantCard;
