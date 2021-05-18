import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainTitle from "@components/common/MainTitle";
import CenterDiv from "@components/common/CenterDiv";
import { userSetOwner } from "@actions/user";
import requestOwner from "@services/auth/request-owner";
import { Button, message } from "antd";

const MyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOwner } = useSelector((state) => state.userTracker);
  const { isOwnerOnInit } = useState(isOwner);

  const requestOwnerHandler = useCallback(async () => {
    const result = await requestOwner();
    if (!result) return message.error("오류가 발생했습니다");
    dispatch(userSetOwner());
  }, [dispatch]);

  useEffect(() => {
    if (isOwner && !isOwnerOnInit) {
      history.push("/owner");
    }
  }, [isOwner, isOwnerOnInit, history]);

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
