import React from "react";
import RestaurantCard from "@components/common/RestaurantCard";

export default {
  title: "Restaurant/Info Card",
  component: RestaurantCard,
};

const Template = (args) => <RestaurantCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  info: {
    name: "롯데리아",
    phoneNumber: "042-863-8944",
    address: "장영신 학생회관 2층(N13-1)",
    time: "매일 08:00 ~ 22:00",
  },
};
