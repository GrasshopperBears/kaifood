import React, { useState } from "react";
import AddMenuModal from "./AddMenuModal";
import { Button } from "antd";

const MenuInfo = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const showModal = () => {
    setShowAddModal(true);
  };
  const hideModal = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <Button onClick={showModal} shape="round" style={{ width: "100%", height: "40px" }}>
        + 메뉴 추가하기
      </Button>
      <AddMenuModal visible={showAddModal} hideModal={hideModal} />
    </>
  );
};

export default MenuInfo;
