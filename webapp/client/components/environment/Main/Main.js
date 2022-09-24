import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import ReactNotification from 'react-notifications-component';
import { useDispatch } from 'react-redux';
import R from 'ramda';

import { attemptGetUser } from '_thunks/user';

import WelcomePage from '_pages/WelcomePage';
import LoginPage from '_pages/LoginPage';
import RegisterPage from '_pages/RegisterPage';
import HomePage from '_pages/HomePage';
import TodoPage from '_pages/TodoPage';
import SettingsPage from '_pages/SettingsPage';
import LostPage from '_pages/LostPage';
import RegisterRestaurantPage from '../../pages/RegisterRestaurantPage';
import MenuListPage from '../../pages/MenuListPage';
import MyOrders from '../../pages/MyOrders';

import Navigation from '../../organisms/Navigation';
import Footer from '../../organisms/Footer';

export default function Main({ location }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscribed = true;

    dispatch(attemptGetUser())
      .catch(R.identity)
      .then(() => subscribed && setLoading(false));

    return () => {
      subscribed = false;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    !loading && (
      <div>
        <ReactNotification />
        <Navigation pathname={location.pathname} />
        <div className="main">
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/todo" component={TodoPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/restaurant" component={RegisterRestaurantPage} />
            <Route path="/menuList/:id" component={MenuListPage} />
            <Route path="/myOrders" component={MyOrders} />

            <Route path="*" component={LostPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  );
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
