import React, { useState, useEffect } from "react";
import socketClient from "socket.io-client";
import { useParams } from "react-router-dom";
import CenterDiv from "@components/common/CenterDiv";
import MainTitle from "@components/common/MainTitle";
import RestaurantInfo from "@components/owner-restaurant/RestaurantInfo";
import MenuInfo from "@components/owner-restaurant/MenuInfo";
import NewReservationModal from "@components/owner-restaurant/NewReservationModal";
import ReservationInfo from "@components/owner-restaurant/ReservationInfo";
import getRestaurantInfo from "@services/restaurant/get-restaurant-info";
import { Spin, Tabs } from "antd";

const { TabPane } = Tabs;

const OwnerRestaurantDetailPage = () => {
  const { id } = useParams();
  const [pending, setPending] = useState(true);
  const [restaurantInfo, setRestaurantInfo] = useState(undefined);
  const [reservationQueue, setReservationQueue] = useState([]);

  const updateRestaurantInfo = async () => {
    const result = await getRestaurantInfo(id);
    setRestaurantInfo(result);
    setPending(false);
  };

  useEffect(() => {
    updateRestaurantInfo();
  }, [id]);

  useEffect(() => {
    const socket = socketClient(process.env.REACT_APP_SERVER_SOCKET, { query: `rid=${id}` });
    socket.on("new reservation", (reservation) => {
      setReservationQueue([reservation, ...reservationQueue]);
    });
    return () => {
      socket.close();
    };
  }, [id, reservationQueue]);

  const acceptReservation = (id) => {};
  const rejectReservation = (id) => {};
  const ignoreLastReservation = (id) => {};
  const clearReservationQueue = (id) => {};

  return pending ? (
    <CenterDiv style={{ marginTop: "100px" }}>
      <Spin size="large" />
    </CenterDiv>
  ) : (
    <>
      <MainTitle>{restaurantInfo.name || ""}</MainTitle>
      <Tabs defaultActiveKey="1">
        <TabPane tab="식당 정보" key="1">
          <RestaurantInfo info={restaurantInfo} onUpdate={setRestaurantInfo} />
        </TabPane>
        <TabPane tab="메뉴 정보" key="2">
          <MenuInfo info={restaurantInfo} />
        </TabPane>
        <TabPane tab="예약 현황" key="3">
          <ReservationInfo />
        </TabPane>
      </Tabs>
      <NewReservationModal
        info={reservationQueue[0] || undefined}
        onOk={acceptReservation}
        onReject={rejectReservation}
        onLater={ignoreLastReservation}
        allClear={clearReservationQueue}
      />
    </>
  );
};

export default OwnerRestaurantDetailPage;
