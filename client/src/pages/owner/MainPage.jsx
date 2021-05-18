import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin, Empty } from "antd";

const MainPage = () => {
  const { initialized, restaurants } = useSelector((state) => state.ownerRestaurant);
  const history = useHistory();

  useEffect(() => {
    if (initialized && restaurants.length) history.push(`/owner/detail/${restaurants[0]._id}`);
  }, [initialized]);

  return initialized ? (
    !restaurants.length && (
      <Empty
        description={
          <>
            <p>등록된 식당이 없습니다</p>
            <p>왼쪽 위 메뉴에서 식당을 추가해주세요</p>
          </>
        }
        style={{ marginTop: "50px" }}
      />
    )
  ) : (
    <Spin />
  );
};

export default MainPage;
