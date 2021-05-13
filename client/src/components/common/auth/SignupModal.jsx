import React from "react";
import { useDispatch } from "react-redux";
import firebase from "app-firebase";
import signup from "@services/auth/signup";
import { userLogin } from "@actions/user";
import { Modal, Form, Input, message } from "antd";
import styled from "styled-components";

const SignupModal = ({ visible, hideSignupModal }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const submitHandler = async () => {
    message.loading("회원가입 중입니다", 0);
    const { email, password, realName, nickname } = await form.validateFields();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const uid = firebase.auth().currentUser.uid;
      const serverResult = await signup({ uid, realname: realName, nickname });
      if (serverResult.success) {
        message.destroy();
        form.resetFields();
        hideSignupModal();
        dispatch(userLogin());
      } else {
        message.destroy();
        message.error(serverResult.message);
      }
    } catch (e) {
      message.destroy();
      firebaseSignupErrorHandler(e);
    }
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
        <FormItemStyled
          label="비밀번호 확인"
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "비밀번호를 다시 한 번 입력해주세요",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("위에서 입력한 비밀번호와 다릅니다"));
              },
            }),
          ]}
        >
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

const firebaseSignupErrorHandler = (e) => {
  const { code } = e;
  switch (code) {
    case "auth/email-already-in-use":
      message.error({
        content: (
          <>
            <p>이미 가입된 이메일입니다.</p>
            <p>다른 이메일로 가입해주세요.</p>
          </>
        ),
      });
      break;
    default:
      message.error({
        content: (
          <>
            <p>회원가입 중 오류가 발생했습니다.</p>
            <p>다시 시도해주세요.</p>
          </>
        ),
      });

      break;
  }
};

export default SignupModal;
