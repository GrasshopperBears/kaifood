import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import moment from "moment";
import MainTitle from "@components/common/MainTitle";
import MenuInReservation from "@components/reservation/MenuInReservation";
import getRestaurantInfo from "@services/restaurant/get-restaurant-info";
import getRestaurantMenus from "@services/menu-out-campus/get-restaurant-menus";
import getReservationPossible from "@services/reservation/get-reservation-possible";
import requestReservation from "@services/reservation/request-reservation";
import { Typography, Form, DatePicker, InputNumber, Spin, Row, Col, Card, Button, message } from "antd";
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

  const submitHandler = async (values) => {
    const { datetime, peopleNumber } = values;
    const result = await requestReservation(id, moment(datetime).format("YYYYMMDDTHHmm"), { peopleNumber, menus: selectedMenus });
    if (!result.success) return message.error("????????? ??????????????????");
    else history.push("/reservation");
  };

  const selectMenuHandler = useCallback(
    (menuId, count) => {
      setSelectedMenus({ ...selectedMenus, [menuId]: count });
    },
    [selectedMenus]
  );

  return (
    <>
      <MainTitle>????????????</MainTitle>
      <Typography style={{ marginBottom: "20px" }}>?????? ??????: {restaurantInfo.name}</Typography>
      <Form name="makeReservation" onFinish={submitHandler}>
        <Form.Item name="datetime" label="?????? ??????" rules={[{ required: true, message: "?????? ????????? ??????????????????" }]}>
          <DatePicker
            onChange={checkReservationValidity}
            disabledDate={disabledDate}
            format="MM-DD HH:mm"
            defaultValue={moment()}
            showTime
          />
        </Form.Item>
        {!allowReservation && !pending && <Text type="danger">?????? ???????????? ????????? ??????????????????</Text>}
        {pending && <Spin />}
        <ValidityWrapper disabled={!allowReservation}>
          {(!allowReservation || pending) && <UnvalidOverlay />}
          {allowReservation && <Text type="secondary">?????? ?????? ?????? ??????: {maxPeople}???</Text>}
          <Form.Item
            label="?????? ??????"
            name="peopleNumber"
            rules={[
              { required: true, message: "?????? ?????? ????????? ??????????????????" },
              { type: "number", min: 1, message: "1??? ????????? ????????? ??????????????????" },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Card size="small" style={{ padding: "0 20px" }}>
            <Row>
              <Col xs={20}>??????</Col>
              <Col xs={4}>??????</Col>
            </Row>
          </Card>
          {menus.map((menu) => (
            <MenuInReservation menu={menu} onChange={selectMenuHandler} count={selectedMenus[menu._id] || 0} key={menu._id} />
          ))}
          <Typography.Title level={4} style={{ margin: "20px 0" }}>
            ?????? ??????: &nbsp;
            {Object.entries(selectedMenus)
              .reduce((acc, [menuId, menuCount]) => {
                acc += menus.find((menu) => menu._id === menuId).price * menuCount;
                return acc;
              }, 0)
              .toLocaleString()}
            ???
          </Typography.Title>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              ????????????
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
