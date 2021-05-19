import React from "react";
import { Card, Image, Typography } from "antd";
import styled from "styled-components";

const { Meta } = Card;
const { Title, Text } = Typography;

const RestaurantOutCampusMenu = ({ info }) => {
  const { name, price, description, imgUrl } = info;

  return (
    <CardStyled hoverable>
      <Meta avatar={<Image width={80} height={80} src={imgUrl} alt={`Image of ${name}`} />} />
      <div style={{ marginLeft: "20px" }}>
        <TitleStyled>
          <Title level={4}>{name}</Title>
          <Price level={5}>/{price.toLocaleString()}원</Price>
        </TitleStyled>
        <Text type="secondary">{description}</Text>
      </div>
    </CardStyled>
  );
};

const CardStyled = styled(Card)`
  .ant-card-body {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px ${(props) => props.theme.padding.sidePadding};
    .ant-card-meta-avatar {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0;
    }
  }
`;

const TitleStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  > * {
    margin-top: 0 !important;
    margin-bottom: 5px !important;
  }
`;

const Price = styled(Title)`
  margin-left: 15px;
`;

export default RestaurantOutCampusMenu;
