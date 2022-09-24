import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';

import MenuList from '_templates/MenuList';
// import { MenuList } from '@material-ui/core';

export default function MenuListPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  // useEffect(() => {
  //   if (!R.isEmpty(user)) {
  //     dispatch(push('/home'));
  //   }
  // }, []);
// creating menu list for restaurant register page
  return (
    <div className="register-page page">
    <MenuList />
    </div>
  );
}
