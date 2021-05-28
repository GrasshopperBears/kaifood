import React from "react";
import { Modal, Button, Space, Typography } from "antd";
import CenterDiv from "@components/common/CenterDiv";
import moment from "moment";

const { Title } = Typography;

const NewReservationModal = ({ info, onOk, onReject, onLater, allClear }) => {
  const okHandler = () => {
    onOk(info.id);
  };
  const rejectHandler = () => {
    onReject(info.id);
  };
  const laterHandler = () => {
    onLater(info.id);
  };

  return (
    <Modal
      visible={info}
      title="새로운 예약이 요청되었습니다"
      footer={<ButtonGroup onOk={okHandler} onReject={rejectHandler} onLater={laterHandler} />}
      onCancel={allClear}
      style={{ marginTop: "100px" }}
    >
      {info && (
        <>
          <Title level={5}>예약 일시: {moment(info.datetime).format("YYYY-MM-DD HH시 mm분")}</Title>
          <Title level={5}>예약 인원: {info.peopleNumber}명</Title>
          <Title level={5}>예약 메뉴</Title>
          {info.orders.map(({ result: { name, _id }, number }) => (
            <Typography key={_id}>
              {number} x {name}
            </Typography>
          ))}
        </>
      )}
    </Modal>
  );
};

const ButtonGroup = ({ onOk, onReject, onLater }) => {
  return (
    <CenterDiv>
      <Space size="middle">
        <Button onClick={onReject} type="primary" danger>
          거절하기
        </Button>
        <Button onClick={onLater} type="dashed">
          나중에 선택
        </Button>
        <Button onClick={onOk} type="primary">
          수락하기
        </Button>
      </Space>
    </CenterDiv>
  );
};

export default NewReservationModal;
