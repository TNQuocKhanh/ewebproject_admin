import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import GroupIcon from "@material-ui/icons/Group";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import SidebarLink from "./SidebarLink";
import PersonIcon from "@material-ui/icons/Person";
import CategoryIcon from "@material-ui/icons/Category";
import BookIcon from "@material-ui/icons/Book";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import BusinessIcon from "@material-ui/icons/Business";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

import { makeStyles } from "@material-ui/styles";
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../context/LayoutContext";
import { storage } from "../utils";

const auth = storage.load("auth");

const adminRole = [
  { id: 0, label: "Dashboard", link: "/dashboard", icon: <HomeIcon /> },
  { id: 1, label: "Người dùng", link: "/users", icon: <GroupIcon /> },
  { id: 2, label: "Danh mục", link: "/categories", icon: <CategoryIcon /> },
  { id: 3, label: "Nhà cung cấp", link: "/suppliers", icon: <BusinessIcon /> },
  { id: 4, label: "Sản phẩm", link: "/products", icon: <BookIcon /> },
  { id: 5, label: "Mã giảm giá", link: "/vouchers", icon: <ConfirmationNumberIcon /> },
  { id: 6, label: "Khách hàng", link: "/customers", icon: <PersonIcon /> },
  { id: 7, label: "Đơn hàng", link: "/orders", icon: <AddShoppingCartIcon /> },
  {
    id: 8,
    label: "Báo cáo",
    link: "/report",
    icon: <EqualizerIcon />,
    children: [
      { label: "Phương thức thanh toán", link: "/report/payment" },
      { label: "Theo sản phẩm", link: "/report/product" },
      { label: "Sản phẩm tồn kho", link: "/report/unsold" },
      { label: "Sản phẩm nổi bật", link: "/report/feature" },
    ],
  },
];

const saleRole = [
  { id: 0, label: "Dashboard", link: "/dashboard", icon: <HomeIcon /> },
  { id: 2, label: "Danh mục", link: "/categories", icon: <CategoryIcon /> },
  { id: 4, label: "Sản phẩm", link: "/products", icon: <BookIcon /> },
  { id: 5, label: "Khách hàng", link: "/customers", icon: <PersonIcon /> },
  { id: 6, label: "Đơn hàng", link: "/orders", icon: <AddShoppingCartIcon /> },
  {
    id: 8,
    label: "Báo cáo",
    link: "/report",
    icon: <EqualizerIcon />,
    children: [
      { label: "Phương thức thanh toán", link: "/report/payment" },
      { label: "Theo sản phẩm", link: "/report/product" },
      { label: "Sản phẩm tồn kho", link: "/report/unsold" },
      { label: "Sản phẩm nổi bật", link: "/report/feature" },
    ],
  },
];

const assistantRole = [
  { id: 0, label: "Dashboard", link: "/dashboard", icon: <HomeIcon /> },
  { id: 2, label: "Danh mục", link: "/categories", icon: <CategoryIcon /> },
  { id: 4, label: "Sản phẩm", link: "/products", icon: <BookIcon /> },
  { id: 6, label: "Đơn hàng", link: "/orders", icon: <AddShoppingCartIcon /> },
  {
    id: 8,
    label: "Báo cáo",
    link: "/report",
    icon: <EqualizerIcon />,
    children: [
      { label: "Phương thức thanh toán", link: "/report/payment" },
      { label: "Theo sản phẩm", link: "/report/product" },
      { label: "Sản phẩm tồn kho", link: "/report/unsold" },
      { label: "Sản phẩm nổi bật", link: "/report/feature" },
    ],
  },
];

let structure = [];

if (auth?.roles.includes("ROLE_ADMIN")) {
  structure = adminRole;
} else {
  if (auth?.roles.includes("ROLE_SALESPERSON")) {
    structure = saleRole;
  } else {
    structure = assistantRole;
  }
}

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 40,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileBackButton: {
    marginTop: theme.spacing(0.5),
    marginLeft: 18,
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing(0.625),
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
