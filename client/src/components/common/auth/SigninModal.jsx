import React from "react";
import { useDispatch } from "react-redux";
import firebase from "app-firebase";
import { userLogin } from "@actions/user";
import { Modal, Form, Input, message } from "antd";
import styled from "styled-components";

const SigninModal = ({ visible, hideSigninModal }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const submitHandler = async () => {
    message.loading("로그인 중입니다", 0);
    const { email, password } = await form.validateFields();
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      message.destroy();
      dispatch(userLogin());
    } catch (e) {
      message.destroy();
      firebaseSigninErrorHandler(e);
    }
  };

  return (
    <Modal title="로그인" visible={visible} onOk={submitHandler} onCancel={hideSigninModal}>
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
        <FormItemStyled label="비밀번호" name="password" rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}>
          <Input.Password />
        </FormItemStyled>
      </Form>
    </Modal>
  );
};

const FormItemStyled = styled(Form.Item)``;

const firebaseSigninErrorHandler = (e) => {
  const { code } = e;
  switch (code) {
    case "auth/user-not-found":
      message.error({
        content: (
          <>
            <p>잘못된 로그인 정보입니다</p>
            <p>가입된 이메일인지 확인해주세요</p>
          </>
        ),
      });
      break;
    default:
      message.error({
        content: (
          <>
            <p>로그인 중 오류가 발생했습니다.</p>
            <p>다시 시도해주세요.</p>
          </>
        ),
      });
      break;
  }
};

export default SigninModal;
