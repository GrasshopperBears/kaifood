import React, { useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import MainTitle from "@components/common/MainTitle";
import { Typography, Form, DatePicker } from "antd";

const UserMakeReservationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!location.state?.name) history.push("/");
  }, []);

  const submitHandler = async (values) => {};

  return (
    <>
      <MainTitle>예약하기</MainTitle>
      <Typography style={{ marginBottom: "20px" }}>식당 이름: {location.state.name}</Typography>
      <Form name="makeReservation" onFinish={submitHandler}>
        <Form.Item label="예약 날짜">
          <DatePicker />
        </Form.Item>
      </Form>
    </>
  );
};

export default UserMakeReservationPage;
