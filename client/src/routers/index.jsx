import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Pages from "@pages/index";
import Header from "@components/common/header/Header";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Pages.GeneralMainPage} />
        <Route exact path="/signup" component={Pages.SignupPage} />
        <Route exact path="/signin" component={Pages.SigninPage} />
        <Route exact path="/mypage" component={Pages.MyPage} />
        <Route exact path="/reservation" component={Pages.UserReservationPage} />
        <Route exact path="/restaurant/general" component={Pages.RestaurantGeneralPage} />
        <Route exact path="/restaurant/in-campus" component={Pages.RestaurantInsidePage} />
        <Route path="/restaurant/in-campus/:id" component={Pages.RestaurantInsideDetailPage} />
        <Route path="/restaurant/outside/:id" component={Pages.RestaurantOutsidePage} />
        <Route path="/restaurant/type/:type" component={Pages.RestaurantsByTypePage} />
        {/* 이하 추후 인증 라우터 추가 필요  */}
        <Route exact path="/owner" component={Pages.OwnerMainPage} />
        <Route exact path="/owner/add" component={Pages.AddRestaurantPage} />
        <Route exact path="/owner/edit" component={Pages.EditRestaurantPage} />
        <Route exact path="/owner/reservation" component={Pages.ReservationTodayPage} />
        <Route exact path="/owner/reservation-total" component={Pages.ReservationTotalPage} />
        <Route component={Pages.NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainRouter;
