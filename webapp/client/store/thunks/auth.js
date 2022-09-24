import { push } from 'connected-react-router'
import { snakeToCamelCase } from 'json-style-converter/es5'
import { store as RNC } from 'react-notifications-component'

import {
  postRegister,
  postLogin,
  postLogout,
  postRestuarantRegister,
} from '_api/auth'
import { login, logout } from '_actions/user'

import { dispatchError } from '_utils/api'

export const attemptLogin = (user) => (dispatch) =>
  postLogin(user)
    .then((data) => {
      dispatch(login(snakeToCamelCase(data.user)))

      RNC.addNotification({
        title: 'Success!',
        message: data.message,
        type: 'success',
        container: 'top-right',
        animationIn: ['animated', 'fadeInRight'],
        animationOut: ['animated', 'fadeOutRight'],
        dismiss: {
          duration: 5000,
        },
      })
      console.log("Login ", data.user.role);
      dispatch(push(data))

      data.user.role =='user' ? dispatch(push('/home')) : dispatch(push('/settings'))
      return data
    })
    .catch(dispatchError(dispatch))

export const attemptRegister = (newUser) => (dispatch) =>
  postRegister(newUser)
    .then((data) => {
      RNC.addNotification({
        title: 'Success!',
        message: data.message,
        type: 'success',
        container: 'top-right',
        animationIn: ['animated', 'fadeInRight'],
        animationOut: ['animated', 'fadeOutRight'],
        dismiss: {
          duration: 5000,
        },
      })
     
      return dispatch(attemptLogin(newUser))
    })
    .then(() =>  dispatch(push('/home')))
    .catch(dispatchError(dispatch))

export const attemptLogout = () => (dispatch) =>
  postLogout()
    .then((data) => {
      localStorage.removeItem('id')
      localStorage.removeItem('uid')

      dispatch(logout())

      RNC.addNotification({
        title: 'Success!',
        message: data.message,
        type: 'success',
        container: 'top-right',
        animationIn: ['animated', 'fadeInRight'],
        animationOut: ['animated', 'fadeOutRight'],
        dismiss: {
          duration: 5000,
        },
      })
      dispatch(push('/login'))
      return data
    })
    .catch(dispatchError(dispatch))

export const attemptRestuarantRegister = (newUser) => (dispatch) =>
  postRestuarantRegister(newUser)
    .then((data) => {
      console.log("nu ",newUser)
      RNC.addNotification({
        title: 'Success! Now Login to Continue',
        message: data.message,
        type: 'success',
        container: 'top-right',
        animationIn: ['animated', 'fadeInRight'],
        animationOut: ['animated', 'fadeOutRight'],
        dismiss: {
          duration: 5000,
        },
      })
      console.log("Log ", data)
      // localStorage.setItem("id", data.users[0].restaurantID._id)
      // return dispatch(attemptLogin(newUser))
    })
    .then(() => dispatch(push('/login')))
    .catch(dispatchError(dispatch))
