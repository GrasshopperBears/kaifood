import React, { useState, useEffect } from "react";
import editRestaurantInfo from "@services/restaurant/edit-restaurant-info";
import { options } from "@pages/owner/AddRestaurantPage";
import { Row, Col, Space, Typography, Modal, message, Radio, InputNumber, DatePicker, Button, Checkbox } from "antd";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillEdit, AiFillCheckCircle } from "react-icons/ai";
import moment from "moment";
import styled from "styled-components";

const { Paragraph } = Typography;
const { confirm } = Modal;
const { RangePicker } = DatePicker;

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
  const [disableTimeEdit, setDisableTimeEdit] = useState(true);
  const [disableCloseDate, setDisableCloseDate] = useState(true);
  const [closeDate, setCloseDate] = useState([]);

  useEffect(() => {
    setCloseDate(info.outCampusTime.closeDate);
  }, [info.outCampusTime.closeDate]);

  const editAddress = async (address) => {
    const { success } = await editRestaurantInfo(info._id, { address });
    if (!success) return message.error("업데이트 중 오류가 발생했습니다");
    onUpdate({ ...info, address });
  };
  const editTime = async (time) => {
    confirm({
      title: "수정하시겠습니까?",
      async onOk() {
        const newOutCampusTime = { ...info.outCampusTime, startTime: moment(time[0]), endTime: moment(time[1]) };
        const { success } = await editRestaurantInfo(info._id, { outCampusTime: newOutCampusTime });
        if (!success) return message.error("업데이트 중 오류가 발생했습니다");
        onUpdate({ ...info, outCampusTime: newOutCampusTime });
        setDisableTimeEdit(true);
      },
    });
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
  const closeDateHandler = (val) => {
    setCloseDate(val);
  };
  const editCloseDate = async () => {
    const originalCloseDate = info.outCampusTime.closeDate;
    if (originalCloseDate.length === closeDate.length && originalCloseDate.every((el) => closeDate.includes(el)))
      return setDisableCloseDate(true);
    confirm({
      title: "수정하시겠습니까?",
      async onOk() {
        const newOutCampusTime = { ...info.outCampusTime, closeDate };
        const { success } = await editRestaurantInfo(info._id, { outCampusTime: newOutCampusTime });
        if (!success) return message.error("업데이트 중 오류가 발생했습니다");
        onUpdate({ ...info, outCampusTime: newOutCampusTime });
        setDisableCloseDate(true);
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
        <Row>
          <Col span={8}>시간</Col>
          <Col span={15}>
            <RangePicker
              defaultValue={[moment(info.outCampusTime.startTime), moment(info.outCampusTime.endTime)]}
              disabled={disableTimeEdit}
              onOk={editTime}
              picker="time"
              format="HH:mm"
              showTime={{
                format: "HH:mm",
              }}
            />
          </Col>
          <Col span={1} style={{ display: "flex", justifyContent: "flex-end" }}>
            <EditButton
              onClick={() => {
                setDisableTimeEdit(!disableTimeEdit);
              }}
            >
              {disableTimeEdit ? <AiFillEdit /> : <AiFillCheckCircle />}
            </EditButton>
          </Col>
        </Row>
        <Row>
          <Col span={8}>휴무일</Col>
          <Col span={15}>
            {disableCloseDate ? (
              info.outCampusTime.closeDate.length ? (
                dayIntToString(info.outCampusTime.closeDate)
              ) : (
                "없음"
              )
            ) : (
              <Checkbox.Group options={options} value={closeDate} onChange={closeDateHandler} />
            )}
          </Col>
          <Col span={1} style={{ display: "flex", justifyContent: "flex-end" }}>
            <EditButton
              onClick={() => {
                if (!disableCloseDate) editCloseDate();
                else setDisableCloseDate(!disableCloseDate);
              }}
            >
              {disableCloseDate ? <AiFillEdit /> : <AiFillCheckCircle />}
            </EditButton>
          </Col>
        </Row>
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

const dayIntToString = (arr) => {
  return arr
    .reduce((acc, el) => {
      acc.push(options.find((option) => option.value === el).label);
      return acc;
    }, [])
    .join(", ");
};

const ParagraphStyled = styled(Paragraph)`
  .ant-typography-edit {
    float: right;
  }
`;

const EditButton = styled(Button)`
  border: 0;
  background: transparent;
  padding: 0;
  line-height: inherit;
  display: inline-block;
  color: #1890ff;
`;

export default RestaurantInfo;
