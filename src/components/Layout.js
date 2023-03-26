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
import { UserList, UserEdit, UserCreate, UserDetail, Profile, ChangePassword } from "../pages/users";
import { useLayoutState } from "../context/LayoutContext";
import { ProductList, ProductCreate, ProductEdit, ProductDetail } from "../pages/products";
import {CategoryList, CategoryCreate, CategoryEdit, CategoryDetail } from '../pages/categories'
import { CustomerList, CustomerEdit, CustomerDetail }  from '../pages/customers'
import { OrderDetail, OrderEdit, OrderList } from '../pages/orders'

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
              <Route path="/users/create" exact component={UserCreate} />
              <Route path="/users/:id/edit" exact component={UserEdit} />
              <Route path="/users/:id/detail" exact component={UserDetail} />
              <Route path="/products" exact component={ProductList} />
              <Route path="/products/create" exact component={ProductCreate} />
              <Route path="/products/:id/edit" exact component={ProductEdit} />
              <Route path="/products/:id/detail" exact component={ProductDetail} />
              <Route path="/categories" exact component={CategoryList} />
              <Route path="/categories/create" exact component={CategoryCreate} />
              <Route path="/categories/:id/edit" exact component={CategoryEdit} />
              <Route path="/categories/:id/detail" exact component={CategoryDetail} />
              <Route path="/customers" exact component={CustomerList} />
              <Route path="/customers/:id/edit" exact component={CustomerEdit} />
              <Route path="/customers/:id/detail" exact component={CustomerDetail} />
              <Route path="/orders" exact component={OrderList} />
              <Route path="/orders/:id/edit" exact component={OrderEdit} />
              <Route path="/orders/:id/detail" exact component={OrderDetail} />
              <Route path="/profile" exact component={Profile}/>
              <Route path="/change-password" exact component={ChangePassword}/>
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
