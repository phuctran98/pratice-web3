import React from "react";
import { RouteProps, withRouter } from "react-router";
import { Route, RouteComponentProps, Switch, Redirect } from "react-router-dom";
import { ROUTES } from "./common/Constant";
import DefaultLayout from "./components/layout/DefaultLayout";
import Dashboard from "./modules/dashboard";
import Login from "./modules/login";
import StorageUtils from "./utils/storage";

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const isLogin = !!StorageUtils.getToken()

  return (
    <>
      {
        isLogin ? (
          <DefaultLayout>
            <Route {...props} />
          </DefaultLayout>
        ) : (
          <Route render={() =>
            <>
              <Redirect to={{
                pathname: '/login',

              }}>

              </Redirect>
            </>}
          >

          </Route >)
      }
    </>
  );
};

export const OasisRoutesComp: React.FC<RouteComponentProps> = (props) => {
  return (
    <Switch>
      <Route path={ROUTES.LOGIN} component={Login}></Route>
      <PrivateRoute path="/" exact component={Dashboard} />
    </Switch>
  )
};

export const OasisRoutes = withRouter(OasisRoutesComp);