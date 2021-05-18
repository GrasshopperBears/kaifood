import React, { useCallback } from "react";
import MainTitle from "@components/common/MainTitle";
import CenterDiv from "@components/common/CenterDiv";
import requestOwner from "@services/auth/request-owner";
import { Button, message } from "antd";

const MyPage = () => {
  const requestOwnerHandler = useCallback(async () => {
    const result = await requestOwner();
    if (!result) return message.error("오류가 발생했습니다");
    // TODO: 이후 식당 관리 페이지로 이동
  }, []);

  return (
    <>
      <MainTitle>마이페이지</MainTitle>
      <CenterDiv style={{ margin: "100px 0" }}>
        <Button onClick={requestOwnerHandler} size="large" shape="round">
          내 식당을 등록하고 싶어요
        </Button>
      </CenterDiv>
    </>
  );
};

export default MyPage;
