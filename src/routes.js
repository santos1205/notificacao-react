import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withLayoutLogin } from "cassi-componentes/dist/Layout"
import NotFound from "cassi-componentes/dist/404";
import HomePage from './componentes/Home/HomePage';

export default withLayoutLogin(function Routes({ userInfo }) {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={(props) => <HomePage {...props} userInfo={userInfo} />} />
                <Route path="/" component={NotFound} />
            </Switch>
        </React.Fragment>
    );
})