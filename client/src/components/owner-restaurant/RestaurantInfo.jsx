import React from "react";
import editRestaurantInfo from "@services/restaurant/edit-restaurant-info";
import { Row, Col, Space, Typography, Modal, message, Radio, InputNumber } from "antd";
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
      <Col span={8}>{label}</Col>
      <Col span={16}>
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
  const editReservation = async (e) => {
    const provideReservation = e.target.value === "true";
    confirm({
      title: "수정하시겠습니까?",
      async onOk() {
        const { success } = await editRestaurantInfo(info._id, { provideReservation, maxReservationNumber: 0 });
        if (!success) return message.error("업데이트 중 오류가 발생했습니다");
        onUpdate({ ...info, provideReservation });
      },
    });
  };
  const editMaxReservationNumber = async (e) => {
    const maxReservationNumber = parseInt(e.target.value);
    confirm({
      title: "수정하시겠습니까?",
      async onOk() {
        const { success } = await editRestaurantInfo(info._id, { maxReservationNumber });
        if (!success) return message.error("업데이트 중 오류가 발생했습니다");
        onUpdate({ ...info, maxReservationNumber });
      },
    });
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <InfoRow label="주소" value={info.address} notAllowEmpty onChange={editAddress} />
        <InfoRow label="시간" value={info.time[0]} notAllowEmpty onChange={editTime} />
        <InfoRow label="전화번호" value={info.phoneNumber} notAllowEmpty onChange={editPhoneNumber} />
        <InfoRow label="한 줄 소개" value={info.description} onChange={editDescription} max={50} />
        <Row>
          <Col span={8}>예약 가능 여부</Col>
          <Col span={16}>
            <Radio.Group onChange={editReservation} buttonStyle="solid" value={info.provideReservation.toString()}>
              <Radio.Button value="true">가능</Radio.Button>
              <Radio.Button value="false">불가능</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        {info.provideReservation && (
          <Row>
            <Col span={8}>최대 예약 인원</Col>
            <Col span={16}>
              <InputNumber value={info.maxReservationNumber} onBlur={editMaxReservationNumber} onPressEnter={editMaxReservationNumber} /> 명
            </Col>
          </Row>
        )}
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
