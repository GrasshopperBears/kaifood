import React from "react";
import { Empty } from "antd";
import { GiSadCrab } from "react-icons/gi";

const NotFoundPage = () => {
  return <Empty image={<GiSadCrab size="80" />} description="페이지를 찾을 수 없습니다 :(" style={{ marginTop: "100px" }} />;
};

export default NotFoundPage;
