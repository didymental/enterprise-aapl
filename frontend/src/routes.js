import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";


const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
];

export default routes;
