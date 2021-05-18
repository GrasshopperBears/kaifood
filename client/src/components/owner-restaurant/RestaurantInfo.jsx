import React from "react";
import editRestaurantInfo from "@services/restaurant/edit-restaurant-info";
import { Row, Col, Space, Typography, Modal, message } from "antd";
import { RiEdit2Fill } from "react-icons/ri";
import styled from "styled-components";

const { Paragraph } = Typography;
const { confirm } = Modal;

const InfoRow = ({ label, value, onChange, notAllowEmpty = false, max = 0 }) => {
  const changeHandler = (val) => {
    if (notAllowEmpty && !val.length) return message.error("비울 수 없는 정보입니다");
    if (val !== value)
      confirm({
        title: "수정하시겠습니까?",
        onOk() {
          onChange(val);
        },
      });
  };

  return (
    <Row>
      <Col span={7}>{label}</Col>
      <Col span={17}>
        <ParagraphStyled editable={{ icon: <RiEdit2Fill />, onChange: changeHandler, maxLength: max }}>{value}</ParagraphStyled>
      </Col>
    </Row>
  );
};

const RestaurantInfo = ({ info, onUpdate }) => {
  const editAddress = async (address) => {
    const { success } = await editRestaurantInfo(info._id, { address });
    if (!success) return message.error("업데이트 중 오류가 발생했습니다");
    onUpdate({ ...info, address });
  };
  const editTime = async (time) => {
    const { success } = await editRestaurantInfo(info._id, { time: [time] });
    if (!success) return message.error("업데이트 중 오류가 발생했습니다");
    onUpdate({ ...info, time: [time] });
  };
  const editPhoneNumber = async (phoneNumber) => {
    const { success } = await editRestaurantInfo(info._id, { phoneNumber });
    if (!success) return message.error("업데이트 중 오류가 발생했습니다");
    onUpdate({ ...info, phoneNumber });
  };
  const editDescription = async (description) => {
    const { success } = await editRestaurantInfo(info._id, { description });
    if (!success) return message.error("업데이트 중 오류가 발생했습니다");
    onUpdate({ ...info, description });
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <InfoRow label="주소" value={info.address} notAllowEmpty onChange={editAddress} />
        <InfoRow label="시간" value={info.time[0]} notAllowEmpty onChange={editTime} />
        <InfoRow label="전화번호" value={info.phoneNumber} notAllowEmpty onChange={editPhoneNumber} />
        <InfoRow label="한 줄 소개" value={info.description} onChange={editDescription} max={50} />
      </Space>
    </>
  );
};

const ParagraphStyled = styled(Paragraph)`
  .ant-typography-edit {
    float: right;
  }
`;

export default RestaurantInfo;
