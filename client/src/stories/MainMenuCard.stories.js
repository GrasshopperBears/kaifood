import React from "react";
import MainMenuCard from "@components/user-main/MainMenuCard";

export default {
  title: "User Main/Menu Card",
  component: MainMenuCard,
};

const Template = (args) => <MainMenuCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "북측 카이마루",
  menus: "미역국, 차조밥, 간장게장, 임연수구이",
  info: "N15\n운영시간\n아침: 08:00 ~ 09:30\n점심: 11:00 ~ 13:00\n저녁: 17:00 ~ 18:30",
};
