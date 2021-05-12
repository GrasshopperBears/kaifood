import React from "react";
import { Modal, Form, Input } from "antd";
import styled from "styled-components";

const SignupModal = ({ visible, hideSignupModal }) => {
  const [form] = Form.useForm();
  const submitHandler = () => {
    form.validateFields().then((values) => {
      // TODO: values로 회원가입 진행
    });
  };

  return (
    <Modal title="회원가입" visible={visible} onOk={submitHandler} onCancel={hideSignupModal}>
      <Form form={form} name="signup">
        <FormItemStyled
          label="이메일"
          name="email"
          rules={[
            { required: true, message: "이메일을 입력해주세요" },
            { pattern: /.+@.+\..+/, message: "올바른 이메일 형식이 아닙니다" },
          ]}
        >
          <Input />
        </FormItemStyled>
        <FormItemStyled
          label="비밀번호"
          name="password"
          rules={[
            { required: true, message: "비밀번호를 입력해주세요" },
            { min: 6, message: "비밀번호는 최소 6자로 설정해주세요" },
          ]}
        >
          <Input.Password />
        </FormItemStyled>
        <FormItemStyled label="비밀번호 확인" name="passwordCheck" rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}>
          <Input.Password />
        </FormItemStyled>
        <FormItemStyled label="이름" name="realName" rules={[{ required: true, message: "이름을 입력해주세요" }]}>
          <Input />
        </FormItemStyled>
        <FormItemStyled label="닉네임" name="nickname" rules={[{ required: true, message: "닉네임을 입력해주세요" }]}>
          <Input />
        </FormItemStyled>
      </Form>
    </Modal>
  );
};

const FormItemStyled = styled(Form.Item)``;

export default SignupModal;
