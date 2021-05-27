import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import moment from "moment";
import MainTitle from "@components/common/MainTitle";
import MenuInReservation from "@components/reservation/MenuInReservation";
import getRestaurantInfo from "@services/restaurant/get-restaurant-info";
import getRestaurantMenus from "@services/menu-out-campus/get-restaurant-menus";
import getReservationPossible from "@services/reservation/get-reservation-possible";
import { Typography, Form, DatePicker, InputNumber, Spin, Row, Col, Card, Button } from "antd";
import styled from "styled-components";

const { Text } = Typography;
const disabledDate = (current) => current && current < moment().subtract(1, "days").endOf("day");

const UserMakeReservationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [restaurantInfo, setRestaurantInfo] = useState(location.state.restaurantInfo || undefined);
  const [menus, setMenus] = useState(location.state.menus || []);
  const [allowReservation, setAllowReservation] = useState(false);
  const [pending, setPending] = useState(false);
  const [selectedMenus, setSelectedMenus] = useState({});
  const [maxPeople, setMaxPeople] = useState(0);

  const initRestaurant = useCallback(async () => {
    try {
      if (!restaurantInfo) {
        const result = await getRestaurantInfo(id);
        if (!result || !result.provideReservation) throw new Error();
        setRestaurantInfo(result);
      }
      if (!menus.length) {
        const menuResult = await getRestaurantMenus(id);
        if (!menuResult.length) throw new Error();
        setMenus(menuResult);
      }
    } catch (e) {
      history.push("/restaurant/out-campus");
    }
  }, [restaurantInfo, id, menus, history]);

  const checkReservationValidity = useCallback(
    async (time) => {
      setPending(true);
      const datetime = moment(time).format("YYYYMMDDTHHmm");
      const result = await getReservationPossible(id, datetime);
      setAllowReservation(result.possible);
      setMaxPeople(result.currentMaximum);
      setPending(false);
    },
    [id]
  );

  useEffect(() => {
    initRestaurant();
  }, [id, initRestaurant]);

  const submitHandler = async (values) => {};

  const selectMenuHandler = useCallback(
    (menuId, count) => {
      setSelectedMenus({ ...selectedMenus, [menuId]: count });
    },
    [selectedMenus]
  );

  return (
    <>
      <MainTitle>예약하기</MainTitle>
      <Typography style={{ marginBottom: "20px" }}>식당 이름: {restaurantInfo.name}</Typography>
      <Form name="makeReservation" onFinish={submitHandler}>
        <Form.Item name="datetime" label="예약 날짜" rules={[{ required: true, message: "예약 시간을 선택해주세요" }]}>
          <DatePicker
            onChange={checkReservationValidity}
            disabledDate={disabledDate}
            format="MM-DD HH:mm"
            defaultValue={moment()}
            showTime
          />
        </Form.Item>
        {!allowReservation && !pending && <Text type="danger">해당 일시에는 예약이 불가능합니다</Text>}
        {pending && <Spin />}
        <ValidityWrapper disabled={!allowReservation}>
          {(!allowReservation || pending) && <UnvalidOverlay />}
          {allowReservation && <Text type="secondary">최대 예약 가능 인원: {maxPeople}명</Text>}
          <Form.Item
            label="예약 인원"
            name="peopleNumber"
            rules={[
              { required: true, message: "최대 예약 인원을 입력해주세요" },
              { type: "number", min: 1, message: "1명 이상의 인원을 선택해주세요" },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Card size="small" style={{ padding: "0 20px" }}>
            <Row>
              <Col xs={20}>메뉴</Col>
              <Col xs={4}>수량</Col>
            </Row>
          </Card>
          {menus.map((menu) => (
            <MenuInReservation menu={menu} onChange={selectMenuHandler} count={selectedMenus[menu._id] || 0} key={menu._id} />
          ))}
          <Typography.Title level={4} style={{ margin: "20px 0" }}>
            예상 가격: &nbsp;
            {Object.entries(selectedMenus)
              .reduce((acc, [menuId, menuCount]) => {
                acc += menus.find((menu) => menu._id === menuId).price * menuCount;
                return acc;
              }, 0)
              .toLocaleString()}
            원
          </Typography.Title>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              예약하기
            </Button>
          </Form.Item>
        </ValidityWrapper>
      </Form>
    </>
  );
};

const ValidityWrapper = styled.div`
  position: relative;
`;

const UnvalidOverlay = styled.div`
  position: absolute;
  background: rgba(219, 219, 219, 0.8);
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default UserMakeReservationPage;
