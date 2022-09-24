import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';

import RegisterRestaurant from '_templates/RegisterRestaurant';

export default function RegisterRestaurantPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push('/home'));
    }
  }, []);
// restaurant register
  return (
    <div className="register-page page">
    <RegisterRestaurant />
    </div>

  
  );
}
