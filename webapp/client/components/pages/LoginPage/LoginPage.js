import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';
import LoginSection from '../../templates/LoginSection';
import rest from '../../../assets/images/restaurant/rest.gif';
import bean from '../../../assets/images/restaurant/bean.gif';

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push('/home'));
    }
  }, []);
// login page gif and form
  return (
    <div className="login-page page">
      <LoginSection />
      <img src={rest} className="rest" alt="loading..." />
      <img src={bean} className="bean" alt="bean" width="50%" height="50%" />

    </div>
  );
}
