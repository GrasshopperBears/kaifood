import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Divider, List } from "antd";

const checkIsToday = (date) => {
  const inputDate = new Date(date);
  const today = new Date();
  return (
    inputDate.getFullYear() === today.getFullYear() && inputDate.getMonth() === today.getMonth() && inputDate.getDate() === today.getDate()
  );
};

const RestaurantInsideDaily = ({ date, menus }) => {
  const [today] = useState(new Date());
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    if (checkIsToday(date)) setIsToday(true);
  }, []);

  return (
    (!isToday || (isToday && today.getHours() <= 20)) && (
      <>
        <Divider orientation="left">
          {isToday ? `오늘 (${date}, ${day[today.getDay()]}요일)` : `${date}, ${day[today.getDay()]}요일`}
        </Divider>
        <ListStyled
          bordered
          dataSource={menus}
          renderItem={(menu, idx) => {
            if (isToday && getStartMealIdx(today) > idx) return <></>;
            return (
              <List.Item>
                <List.Item.Meta avatar={mealName[idx]} description={menu} />
              </List.Item>
            );
          }}
        />
      </>
    )
  );
};

const ListStyled = styled(List)`
  margin: 0 20px;
  .ant-list-item-meta-avatar {
    font-weight: bold;
  }
`;

const getStartMealIdx = (today) => {
  const time = today.getHours();
  if (time <= 9) return 0;
  if (time <= 14) return 1;
  return 2;
};

const mealName = ["아침", "점심", "저녁"];
const day = "일월화수목금토";

export default RestaurantInsideDaily;
