import React from "react";
import RestaurantOutCampusMenu from "@components/common/RestaurantOutCampusMenu";

export default {
  title: "Menu/Out Campus Menu Card",
  component: RestaurantOutCampusMenu,
};

const Template = (args) => <RestaurantOutCampusMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  info: {
    name: "오코노미야끼",
    price: 13000,
    description: "양배추와 해물, 계란이 잔뜩 들어간 오코노미야끼입니다.",
    imgUrl: "https://imgcp.aacdn.jp/img-a/1720/auto/global-aaj-front/article/2018/10/5bcb08465168a_5bcb064aaaba8_2011611650.jpg",
  },
};
