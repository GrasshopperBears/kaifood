import React, { useState, useEffect } from "react";
import getMenuImage from "@services/menu-out-campus/get-menu-image";
import { Card, Image, Typography, Spin } from "antd";
import styled from "styled-components";

const { Meta } = Card;
const { Title, Text } = Typography;

const RestaurantOutCampusMenu = ({ info }) => {
  const { name, price, description, imgUrl } = info;
  const [image, setImage] = useState(undefined);

  const getImage = async () => {
    if (!imgUrl) return setImage(process.env.PUBLIC_URL + "/empty-menu-image.png");
    const result = await getMenuImage(imgUrl);
    if (result) setImage(result);
    else setImage(process.env.PUBLIC_URL + "/empty-menu-image.png");
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <CardStyled>
      <Meta avatar={image ? <Image width={80} height={80} src={image} alt={`Image of ${name}`} /> : <Spin size="small" />} />
      <div style={{ marginLeft: "20px" }}>
        <TitleStyled>
          <Title level={4}>{name}</Title>
          <Price level={5}>/ {price.toLocaleString()}원</Price>
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
