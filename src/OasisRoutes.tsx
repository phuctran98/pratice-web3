import React from "react";
import { RouteProps, withRouter } from "react-router";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { ROUTES } from "./common/Constant";
import Login from "./modules/login";

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  return (
    <>
      hi
    </>
  );
};

export const OasisRoutesComp: React.FC<RouteComponentProps> = (props) => {
  return(
    <Switch>
      <Route path={ROUTES.LOGIN} component={Login}></Route>
    </Switch>
  )
};

export const OasisRoutes = withRouter(OasisRoutesComp);