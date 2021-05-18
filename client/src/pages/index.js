import { default as GeneralMainPage } from "./general/MainPage";
import { default as UserReservationPage } from "./general/ReservationPage";
import MyPage from "./general/MyPage";
import RestaurantInsideDetailPage from "./general/RestaurantInsideDetailPage";
import RestaurantGeneralPage from "./general/RestaurantGeneralPage";
import RestaurantInsidePage from "./general/RestaurantInsidePage";
import RestaurantOutsidePage from "./general/RestaurantOutsidePage";
import RestaurantsByTypePage from "./general/RestaurantsByTypePage";
import AddRestaurantPage from "./owner/AddRestaurantPage";
import EditRestaurantPage from "./owner/EditRestaurantPage";
import { default as OwnerMainPage } from "./owner/MainPage";
import ReservationTodayPage from "./owner/ReservationTodayPage";
import ReservationTotalPage from "./owner/ReservationTotalPage";
import NotFoundPage from "./NotFoundPage";

const Pages = {
  GeneralMainPage,
  MyPage,
  UserReservationPage,
  RestaurantGeneralPage,
  RestaurantInsideDetailPage,
  RestaurantInsidePage,
  RestaurantOutsidePage,
  RestaurantsByTypePage,
  AddRestaurantPage,
  EditRestaurantPage,
  OwnerMainPage,
  ReservationTodayPage,
  ReservationTotalPage,
  NotFoundPage,
};

export default Pages;
