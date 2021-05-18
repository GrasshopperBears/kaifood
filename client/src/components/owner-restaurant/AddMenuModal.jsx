import React, { useState } from "react";
import addMenu from "@services/menu-out-campus/add-menu";
import { Modal, Form, Input, message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import styled from "styled-components";

const AddMenuModal = ({ visible, hideModal }) => {
  const [form] = Form.useForm();
  const [img, setImg] = useState(undefined);

  const submitHandler = async () => {
    message.loading("맛있는 메뉴를 등록하고 있어요", 0);
    form
      .validateFields()
      .then(async ({ name, price, description }) => {
        const formData = new FormData();
        formData.append("image", img);
        formData.append("data", JSON.stringify({ name, price, description }));
        const result = await addMenu(formData);
        message.destroy();
        if (result) {
          hideModal();
          setImg(undefined);
        } else message.error("메뉴 추가 중 오류가 발생했습니다");
      })
      .catch((e) => {
        console.log(e);
        message.destroy();
      });
  };

  const uploadHandler = async ({ file, onSuccess }) => {
    setImg(file);
    onSuccess();
  };

  return (
    <Modal title="메뉴 추가하기" visible={visible} onOk={submitHandler} onCancel={hideModal} style={{ marginTop: "50px" }}>
      <Form form={form} name="signup">
        <FormItemStyled>
          <ImgCrop modalTitle="이미지 수정하기" modalOk="확인" modalCancel="취소">
            <Upload
              customRequest={uploadHandler}
              maxCount={1}
              name="menuImage"
              listType="picture-card"
              showUploadList={{ showPreviewIcon: false }}
            >
              + 사진 추가
            </Upload>
          </ImgCrop>
        </FormItemStyled>
        <FormItemStyled label="메뉴 이름" name="name" rules={[{ required: true, message: "메뉴 이름을 입력해주세요" }]}>
          <Input />
        </FormItemStyled>
        <FormItemStyled
          label="가격"
          name="price"
          rules={[
            { required: true, message: "가격을 입력해주세요" },
            { pattern: /\d+/, message: "숫자만 입력 가능합니다" },
          ]}
        >
          <Input prefix="&#8361;" />
        </FormItemStyled>
        <FormItemStyled label="메뉴 설명" name="description">
          <Input />
        </FormItemStyled>
      </Form>
    </Modal>
  );
};

const FormItemStyled = styled(Form.Item)``;

export default AddMenuModal;
