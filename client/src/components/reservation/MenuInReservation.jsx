import React from "react";
import styled from "styled-components";
import { Card, Typography, Row, Col, Button } from "antd";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const MenuInReservation = ({ menu, onChange, count }) => {
  const increaseMenu = () => {
    onChange(menu._id, count + 1);
  };
  const decreaseMenu = () => {
    if (count - 1 >= 0) onChange(menu._id, count - 1);
  };

  return (
    <CardStyled>
      <Row>
        <Col xs={20}>
          <Row>
            <Typography.Title level={5}>{menu.name}</Typography.Title>
            <Typography>/ {menu.price.toLocaleString()}원</Typography>
          </Row>
          <Row>
            <Typography.Text type="secondary">{menu.description}</Typography.Text>
          </Row>
        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={12} style={{ lineHeight: "45px" }}>
              {count}
            </Col>
            <Col xs={12} style={{ display: "flex", flexDirection: "column" }}>
              <Button onClick={increaseMenu} type="secondary" icon={<AiOutlinePlus />} size="small" />
              <Button onClick={decreaseMenu} type="secondary" icon={<AiOutlineMinus />} size="small" />
            </Col>
          </Row>
        </Col>
      </Row>
    </CardStyled>
  );
};

const CardStyled = styled(Card)`
  .ant-card-body {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
  }
`;
export default MenuInReservation;
