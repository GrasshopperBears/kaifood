import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import moment from "moment";
import MainTitle from "@components/common/MainTitle";
import getRestaurantInfo from "@services/restaurant/get-restaurant-info";
import getRestaurantMenus from "@services/menu-out-campus/get-restaurant-menus";
import getReservationPossible from "@services/reservation/get-reservation-possible";
import { Typography, Form, DatePicker } from "antd";

const disabledDate = (current) => current && current < moment().subtract(1, "days").endOf("day");

const UserMakeReservationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [restaurantInfo, setRestaurantInfo] = useState(location.state.restaurantInfo || undefined);
  const [menus, setMenus] = useState(location.state.menus || []);
  const [allowReservation, setAllowReservation] = useState(false);

  const initRestaurant = async () => {
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
  };

  const checkReservationValidity = async (time) => {
    const datetime = moment(time).format("YYYYMMDDTHHmm");
    const result = await getReservationPossible(id, datetime);
  };

  useEffect(() => {
    initRestaurant();
  }, [id]);

  const submitHandler = async (values) => {};

  return (
    <>
      <MainTitle>예약하기</MainTitle>
      <Typography style={{ marginBottom: "20px" }}>식당 이름: {location.state.name}</Typography>
      <Form name="makeReservation" onFinish={submitHandler}>
        <Form.Item label="예약 날짜">
          <DatePicker onChange={checkReservationValidity} disabledDate={disabledDate} format="MM-DD HH:mm" showTime />
        </Form.Item>
      </Form>
    </>
  );
};

export default UserMakeReservationPage;
