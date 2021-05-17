import React, { useCallback } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import { MdLocationOn, MdAccessTime, MdPhone } from "react-icons/md";

const RestaurantInfo = ({ time, address, phoneNumber }) => {
  const phoneCallHandler = useCallback(
    (e) => {
      e.stopPropagation();
      Modal.confirm({
        title: "매장에 전화하시겠습니까?",
        onOk: () => {
          document.location.href = `tel:${phoneNumber}`;
        },
      });
    },
    [phoneNumber]
  );

  return (
    <>
      <InfoStyled>
        <IconWrapper>
          <MdAccessTime />
        </IconWrapper>
        {time}
      </InfoStyled>
      <InfoStyled>
        <MdLocationOn />
        {address}
      </InfoStyled>
      <InfoStyled onClick={phoneCallHandler}>
        <MdPhone />
        {phoneNumber}
      </InfoStyled>
    </>
  );
};

const InfoStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 2px;
  svg {
    margin: 5px 16px 5px 0;
    vertical-align: center;
  }
`;

const IconWrapper = styled.div`
  width: 30px;
`;

export default RestaurantInfo;
