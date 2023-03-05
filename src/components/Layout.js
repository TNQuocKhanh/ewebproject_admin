import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import { makeStyles } from "@material-ui/styles";
import Header from './Header'
import Sidebar from "./Sidebar";
import Dashboard from "../pages/dashboard/Dashboard";
import { UserList, UserEdit, UserCreate, UserDetail } from "../pages/users";
import { useLayoutState } from "../context/LayoutContext";

const useStyles =  makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: `calc(100vw - 240px)`,
    minHeight: "100vh",
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
}));
function Layout(props) {
  var classes = useStyles();

  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header  />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/users" exact component={UserList} />
              <Route path="/user/create" exact component={UserCreate} />
              <Route path="/user/:id/edit" exact component={UserEdit} />
              <Route path="/user/:id/detail" exact component={UserDetail} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
