import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Pages from "@pages/index";
import Header from "@components/common/header/Header";
// import OwnerRouter from "./OwnerRouter";
import GeneralLayout from "@layouts/GeneralLayout";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <GeneralLayout>
        <Switch>
          <Route exact path="/" component={Pages.GeneralMainPage} />
          <Route exact path="/restaurant/general" component={Pages.RestaurantGeneralPage} />
          <Route exact path="/restaurant/in-campus" component={Pages.RestaurantInsidePage} />
          <Route path="/restaurant/in-campus/:code" component={Pages.RestaurantInsideDetailPage} />
          {/* <Route exact path="/restaurant/out-campus" component={Pages.RestaurantOutsidePage} />
          <Route exact path="/mypage" component={Pages.MyPage} />
          <Route exact path="/reservation" component={Pages.UserReservationPage} />
          <Route exact path="/restaurant/outside/:id/reservation" component={Pages.UserMakeReservationPage} />
          <Route path="/restaurant/outside/:id" component={Pages.RestaurantOutsideDetailPage} />
          <OwnerRouter exact path="/owner" component={Pages.OwnerMainPage} />
          <OwnerRouter exact path="/owner/detail/:id" component={Pages.OwnerRestaurantDetailPage} />
          <OwnerRouter exact path="/owner/add" component={Pages.AddRestaurantPage} />
          <OwnerRouter exact path="/owner/reservation" component={Pages.ReservationTodayPage} />
          <OwnerRouter exact path="/owner/reservation-total" component={Pages.ReservationTotalPage} /> */}
          <Route component={Pages.NotFoundPage} />
        </Switch>
      </GeneralLayout>
    </BrowserRouter>
  );
};

export default MainRouter;
