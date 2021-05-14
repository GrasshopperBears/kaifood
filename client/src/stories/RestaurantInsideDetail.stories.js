import React from "react";
import RestaurantInsideDetail from "@components/common/restaurant/RestaurantInsideDaily";

export default {
  title: "Restaurant/Restaurant Inside Detail",
  component: RestaurantInsideDetail,
};

const Template = (args) => <RestaurantInsideDetail {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  date: "2021-5-15",
  menus: ["아침메뉴", "점심메뉴", "저녁메뉴"],
};
