import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Error from "./pages/error/Error";
import Login from "./pages/login/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route path="/" component={Layout} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}
