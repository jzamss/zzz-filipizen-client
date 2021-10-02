import HomeScreen from "./screens/HomeScreen";
import PartnerListScreen from "./screens/PartnerListScreen";
import PartnerScreen from "./screens/PartnerScreen";
import PartnerServiceScreen from "./screens/PartnerServiceScreen";
// import ModuleScreen from "./screens/ModuleScreen";
// import ServiceScreen from "./screens/ServiceScreen";

import PaymentSuccessScreen from "./screens/PaymentSuccessScreen";
import PaymentErrorScreen from "./screens/PaymentErrorScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

const routes = [
  {
    name: "home",
    exact: true,
    path: "/",
    component: HomeScreen,
  },
  {
    name: "partners",
    path: "/partners",
    exact: true,
    component: PartnerListScreen,
  },
  {
    name: "partner",
    path: "/partners/:partnerId",
    exact: true,
    component: PartnerScreen,
  },
  {
    name: "service",
    path: "/partners/:partnerId/:module/:service",
    component: PartnerServiceScreen,
  },
  {
    name: "success",
    path: "/payment/success",
    component: PaymentSuccessScreen,
  },
  {
    name: "error",
    path: "/payment/error",
    component: PaymentErrorScreen,
  },
  {
    name: "404",
    path: "*",
    component: NotFoundScreen,
  },
  // {
  //   name: "systools",
  //   exact: true,
  //   path: "/admin/systool",
  //   component: HomeScreen,
  // },
];

export default routes;
