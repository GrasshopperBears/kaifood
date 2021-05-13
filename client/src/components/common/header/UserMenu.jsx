import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "app-firebase";
import { userCheckLogin, userLogin, userLogout } from "@actions/user";
import SignupModal from "@components/common/auth/SignupModal";
import styled from "styled-components";

const MenuSingle = ({ content, action }) => {
  return <MenuSingleStyled onClick={action}>{content}</MenuSingleStyled>;
};

const AuthorizedUserMenus = ({ closeUserMenu }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const goReservationPage = useCallback(() => {
    history.push("/reservation");
  }, [history]);
  const goMypage = useCallback(() => {
    history.push("/mypage");
  }, [history]);
  const logoutHandler = async () => {
    closeUserMenu();
    await firebase.auth().signOut();
    dispatch(userLogout());
    // 인증 필요한 페이지는 메인으로 리디렉션
  };

  return (
    <>
      <MenuSingle content="예약 내역" action={goReservationPage} />
      <MenuSingle content="마이페이지" action={goMypage} />
      <MenuSingle content="로그아웃" action={logoutHandler} />
    </>
  );
};

const UnauthorizedUserMenu = ({ closeUserMenu }) => {
  const [signupVisible, setSignupVisible] = useState(false);
  const [signinVisible, setSigninVisible] = useState(false);

  const showSignupModal = useCallback(() => {
    closeUserMenu();
    setSignupVisible(true);
  }, []);
  const hideSignupModal = useCallback(() => {
    setSignupVisible(false);
  }, []);
  const showSigninModal = useCallback(() => {
    closeUserMenu();
    setSigninVisible(true);
  }, []);
  const hideSigninModal = useCallback(() => {
    setSigninVisible(false);
  }, []);

  return (
    <>
      <MenuSingle content="로그인" action={showSigninModal} />
      <MenuSingle content="회원가입" action={showSignupModal} />
      <SignupModal hideSignupModal={hideSignupModal} visible={signupVisible} />
    </>
  );
};

const UserMenu = ({ closeUserMenu }) => {
  const dispatch = useDispatch();
  const { authorized, initialized } = useSelector((state) => state.userTracker);

  const checkUserState = (user) => {
    if (!initialized) {
      console.log(initialized);
      if (user) dispatch(userLogin());
      else dispatch(userCheckLogin());
    }
  };

  return (
    <>
      {initialized &&
        (authorized ? <AuthorizedUserMenus closeUserMenu={closeUserMenu} /> : <UnauthorizedUserMenu closeUserMenu={closeUserMenu} />)}
    </>
  );
};

const MenuSingleStyled = styled.div`
  padding: 7px 0;
  text-align: center;
`;

export default UserMenu;
