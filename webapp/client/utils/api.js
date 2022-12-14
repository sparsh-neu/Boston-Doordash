import { push } from 'connected-react-router';
import { store as RNC } from 'react-notifications-component';

import { logout } from '_actions/user';
// handling response for api calls
export const handleSuccess = resp => resp.body;

export const handleError = error => {
  if (error.response) {
    throw error.response;
  } else {
    const response = { status: 500, body: { message: 'Internal Server error' } };
    throw response;
  }
};

export const dispatchError = dispatch => error => {
  if (error.status === 401) {
    dispatch(logout());
    dispatch(push('/login'));
  }

  RNC.addNotification({
    title: `Error`,
    message: error.text,
    type: 'danger',
    container: 'top-right',
    animationIn: ['animated', 'fadeInRight'],
    animationOut: ['animated', 'fadeOutRight'],
    dismiss: {
      duration: 5000,
    },
  });

  throw error;
};
