import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import MainTitle from "@components/common/MainTitle";
import addRestaurant from "@services/restaurant/add-restaurant";
import { addOwnerRestaurant } from "@actions/owner-restaurant";
import days from "@utils/days-array";
import { Form, Input, Button, message, Radio, InputNumber, Checkbox, DatePicker } from "antd";
import styled from "styled-components";

const { RangePicker } = DatePicker;

const AddRestaurantPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showReservationNumber, setShowReservationNumber] = useState(false);

  const submitHandler = async (values) => {
    const result = await addRestaurant({
      ...values,
      provideReservation: values.provideReservation === "true",
    });
    if (!result) return message.error("식당 추가 중 오류가 발생했습니다");
    dispatch(addOwnerRestaurant({ _id: result._id, name: result.name }));
    history.push(`/owner/detail/${result._id}`);
  };

  const changReservation = (e) => {
    setShowReservationNumber(e.target.value === "true");
  };

  return (
    <Wrapper>
      <MainTitle>식당 추가하기</MainTitle>
      <Form name="addRestaurantForm" onFinish={submitHandler}>
        <Form.Item label="식당 이름" name="name" rules={[{ required: true, message: "식당 이름을 입력해주세요" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="주소" name="address" rules={[{ required: true, message: "주소를 입력해주세요" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="운영 시간" name="time" rules={[{ required: true, message: "운영 시간을 입력해주세요" }]}>
          <RangePicker
            picker="time"
            format="HH:mm"
            showTime={{
              format: "HH:mm",
            }}
          />
        </Form.Item>
        <Form.Item label="휴무일" name="closeDate">
          <Checkbox.Group options={days} />
        </Form.Item>
        <Form.Item
          label="전화번호"
          name="phoneNumber"
          rules={[
            { required: true, message: "전화번호를 입력해주세요" },
            { pattern: /[\d-]{8,11}/, message: "올바른 전화번호 형식이 아닙니다" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="예약 가능 여부" name="provideReservation" rules={[{ required: true, message: "예약 가능 여부를 선택해주세요" }]}>
          <Radio.Group onChange={changReservation} buttonStyle="solid">
            <Radio.Button value="true">가능</Radio.Button>
            <Radio.Button value="false">불가능</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="최대 예약 인원"
          name="maxReservationNumber"
          hidden={!showReservationNumber}
          rules={[
            { required: showReservationNumber, message: "최대 예약 인원을 입력해주세요" },
            { min: 1, message: "1명 이상의 인원을 입력해주세요" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="한 줄 소개" name="description" rules={[{ max: 50, message: "한 줄 소개는 최대 50자까지만 입력이 가능합니다" }]}>
          <Input.TextArea showCount />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: "20px" }}>
            추가하기
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .ant-form-item-label {
    min-width: 7rem;
  }
`;

export default AddRestaurantPage;
