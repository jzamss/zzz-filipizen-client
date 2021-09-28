import HomeScreen from "./screens/HomeScreen";
import PartnerListScreen from "./screens/PartnerListScreen";
import PartnerScreen from "./screens/PartnerScreen";
import PartnerServiceScreen from "./screens/PartnerServiceScreen";
// import ModuleScreen from "./screens/ModuleScreen";
// import ServiceScreen from "./screens/ServiceScreen";

import PaymentSuccess from "./screens/PaymentSuccess";
import PaymentError from "./screens/PaymentError";
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
    component: PartnerListScreen,
  },
  {
    name: "services",
    path: "/partner/:partnerId/services",
    component: PartnerScreen,
  },
  {
    name: "service",
    path: "/partner/:partnerId/:module/:service",
    component: PartnerServiceScreen,
  },
  {
    name: "success",
    path: "/payment/success",
    component: PaymentSuccess,
  },
  {
    name: "error",
    path: "/payment/error",
    component: PaymentError,
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
