import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

import {
  Home,
  People,
  ShoppingCart,
  Receipt,
  AccountCircle,
  Notifications,
  Language,
  Menu,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { Box, Stack, styled } from "@mui/system";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import LocalstorageService from "../utils/helpers/localstorage-services";
import Sidebar from "../components/commonComp/Sidebar";
import Topbar from "../components/commonComp/Topbar";

export default function AdminLayout() {
  const [currentLink,setCurrentLink]=useState("Dashboard");

  const navigate=useNavigate();
  const token=LocalstorageService.getLoggedInUserToken();
  console.log(token);
  
  const sidebarLinks=[
    // {
    //   id: 1,
    //   name: "Price",
    //   path: "/admin-dashboard",
    //   // icon: Home,
    //   children: [],
    // },
    // {
    //   id: 2,
    //   name: "Brand",
    //   path: "/admin-dashboard/partner",
    //   // icon: People,
    //   children: [
    //     // {
    //     //   id: 21,
    //     //   name: "Dealer",
    //     //   path: "/admin-dashboard/partner/dealer",
    //     // },
    //     // {
    //     //   id: 22,
    //     //   name: "Super Dealer",
    //     //   path: "/admin-dashboard/partner/super-dealer",
    //     // },
    //     // {
    //     //   id: 23,
    //     //   name: "Dealer Requests for code",
    //     //   path: "/admin-dashboard/partner/dealer-request-code",
    //     // },
    //     // {
    //     //   id: 24,
    //     //   name: "KYC Failed request",
    //     //   path: "/admin-dashboard/partner/kyc-failed-request",
    //     // },
    //   ],
    // },
    {
      id: 3,
      name: "RAM",
      path: "/admin-dashboard/product",
      // icon: ShoppingCart,
      children: [
        // {
        //   id: 31,
        //   name: "Add Product",
        //   path: "/admin-dashboard/product/add",
        // },
        // {
        //   id: 32,
        //   name: "Manage Products",
        //   path: "/admin-dashboard/product/manage",
        // },
      ],
    },
    {
      id: 4,
      name: "Screen Size",
      path: "/admin-dashboard/sales",
      // icon: TrendingUpIcon, 
      children: [],
    },
    {
      id: 5,
      name: "Battery",
      path: "/admin-dashboard/items",
      // icon: WidgetsIcon,
      children: [],
    },
    {
      id: 6,
      name: "Primary Camera",
      path: "/admin-dashboard/refunds",
      // icon: CurrencyExchangeIcon,
      children: [],
    },
    // {
    //   id: 7,
    //   name: "Customers",
    //   path: "/admin-dashboard/customers",
    //   icon: "VscPeople",
    // },
    {
      id: 8,
      name: "Secondary Camera",
      path: "/admin-dashboard/sellers",
      // icon: ShoppingBagIcon,
      children: [],
    },
    {
      id: 9,
      name: "Operating System",
      path: "/admin-dashboard/reports",
      // icon: ReportGmailerrorredIcon,
      children: [],
    },
    {
      id: 10,
      name: "Processor",
      path: "/admin-dashboard/uploaded-files",
      // icon: TopicOutlinedIcon,
      children: [],
    },
    {
      id: 11,
      name: "Network Type",
      path: "/admin-dashboard/blog-system",
      // icon: ChatOutlinedIcon,
      children: [],
    },
    {
      id: 12,
      name: "Type",
      path: "/admin-dashboard/doodle",
      // icon: InterestsOutlinedIcon,
      children: [],
    },
    {
      id: 13,
      name: "Clock Speed",
      path: "/admin-dashboard/marketing",
      // icon: CampaignOutlinedIcon,
      children: [],
    },
    // {
    //   id: 14,
    //   name: "Support",
    //   path: "/admin-dashboard/support",
    //   // icon: HeadsetMicOutlinedIcon,
    //   children: [],
    // },
    // {
    //   id: 15,
    //   name: "Website Setup",
    //   path: "/admin-dashboard/website-setup",
    //   // icon: LanguageOutlinedIcon,
    //   children: [],
    // },{
    //   id: 16,
    //   name: "Staff Management",
    //   path: "/admin-dashboard/staff",
    //   // icon: GroupsOutlinedIcon,
    //   children: [
    //     // {
    //     //   id: 161,
    //     //   name: "All Staffs",
    //     //   path: "/admin-dashboard/all-staff",
    //     // },
    //     // {
    //     //   id: 162,
    //     //   name: "Staff Role",
    //     //   path: "/admin-dashboard/staff-role",
    //     // },
    //   ],
    // }

];

  return (
    <Stack direction="row">
     
     <Sidebar sidebarLinks={sidebarLinks} lightColor={"secondary.light"} mainColor={"secondary.main"} setCurrentLink={setCurrentLink}/>

        <Box sx={{width:"100%",backgroundColor:"customBg.white",minHeight:"100vh"}} >

            <Topbar lightColor={"secondary.light"} mainColor={"secondary.main"} currentLink={currentLink}/>
                <Outlet />
        </Box>
        
    </Stack>
  );
}

