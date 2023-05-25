import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  Menu as MenuIcon,
  Person as AccountIcon,
  NotificationsNone as NotificationsIcon,
} from "@material-ui/icons";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import classNames from "classnames";

import { makeStyles } from "@material-ui/styles";

import { Typography, Badge } from "./Wrapper";
import Notification from "./Notification";
import UserAvatar from "./UserAvatar";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../context/LayoutContext";
import { getListOrders, getProfile, logout } from "../apis";
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logotype: {
    color: "white",
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  appBar: {
    width: "100vw",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  headerMenu: {
    marginTop: theme.spacing(7),
  },
  headerMenuList: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
    },
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  headerMenuButtonSandwich: {
    marginLeft: 9,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
    padding: theme.spacing(0.5),
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing(2),
  },
  headerIcon: {
    fontSize: 28,
    color: "rgba(255, 255, 255, 0.35)",
  },
  headerIconCollapse: {
    color: "white",
  },
  profileMenu: {
    minWidth: 265,
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  profileMenuItem: {
    color: theme.palette.text.hint,
  },
  profileMenuIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.hint,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function Header() {
  var classes = useStyles();

  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [profileMenu, setProfileMenu] = useState(null);

  const [username, setUserName] = useState();
  const [total, setTotal] = useState(0);
  const [notifications, setNotifications] = useState([
    {
      id: 0,
      color: "secondary",
      type: "feedback",
      message: "Không có đơn hàng mới nào.",
    },
  ]);

  const history = useHistory();

  const getNewOrder = async () => {
    try {
      const res = await getListOrders();
      const result = res.filter((item) => item.status === "NEW" || item.status==="PAID" && item.paymentMethod === "VNPAY");
      if (result.length > 0) {
        setNotifications(result.reverse());
        setTotal(result.length);
      } else {
        setNotifications([
          {
            id: 0,
            color: "secondary",
            type: "feedback",
            message: "Không có đơn hàng mới nào.",
          },
        ]);
        setTotal(0);
      }
    } catch (err) {
      console.log("[Get new order] Error", err);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res) {
        localStorage.removeItem("auth");
        history.push("/login");
      }
    } catch (err) {
      console.log("[Logour] Error", err);
    }
  };

  const getUserProfile = async () => {
    try {
      const res = await getProfile();
      if (res) {
        setUserName(res.fullName);
      }
    } catch (err) {
      console.log("[Get profile] Error", err);
    }
  };

  useEffect(() => {
    getUserProfile();
    getNewOrder();
  }, []);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse
          )}
        >
          {layoutState.isSidebarOpened ? (
            <MenuOpenIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          HDKShop Admin
        </Typography>
        <div className={classes.grow} />
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={(e) => {
            setNotificationsMenu(e.currentTarget);
          }}
          className={classes.headerMenuButton}
        >
          <Badge badgeContent={total} color="warning">
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <UserAvatar name={username} />
        </IconButton>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.length > 0 &&
            notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => setNotificationsMenu(null)}
                className={classes.headerMenuItem}
              >
                <Notification {...notification} typographyVariant="inherit" />
              </MenuItem>
            ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {username || " "}
            </Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <Link to={"/profile"} style={{ textDecoration: "none" }}>
              <AccountIcon className={classes.profileMenuIcon} /> Thông tin
            </Link>
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <Link to={"change-password"} style={{ textDecoration: "none" }}>
              <VpnKeyIcon className={classes.profileMenuIcon} />
              Đổi mật khẩu
            </Link>
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={handleLogout}
            >
              Đăng xuất
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
