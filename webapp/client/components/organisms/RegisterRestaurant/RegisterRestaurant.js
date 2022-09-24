import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import R from 'ramda'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload'

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'

import Box from 'react-bulma-companion/lib/Box'
import Button from 'react-bulma-companion/lib/Button'
import Title from 'react-bulma-companion/lib/Title'
import Field from 'react-bulma-companion/lib/Field'
import Control from 'react-bulma-companion/lib/Control'
import Icon from 'react-bulma-companion/lib/Icon'
import Input from 'react-bulma-companion/lib/Input'
import Label from 'react-bulma-companion/lib/Label'
import Help from 'react-bulma-companion/lib/Help'
import File from 'react-bulma-companion/lib/File'

import useKeyPress from '_hooks/useKeyPress'
import { postCheckUsername } from '_api/users'
import { validateUsername, validatePassword } from '_utils/validation'
import { attemptRegister, attemptRestuarantRegister } from '_thunks/auth'

export default function RegisterRestaurant() {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [password, setPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [restaurantName, setRestaurantName] = useState('')
  const [address, setaddress] = useState('')
  const [pincode, setpincode] = useState('')
  const [location, setlocation] = useState('')
  const [role, setRole] = useState('admin')
  const [profilePic, setProfilePic] = useState('')
  const [fileName, setFileName] = useState('')


  const checkPassword = (newUsername, newPassword) => {
    const { valid, message } = validatePassword(newUsername, newPassword)

    setPasswordValid(valid)
    setPasswordMessage(message)
  }

  const checkUsername = (newUsername) => {
    const { valid, message } = validateUsername(newUsername)

    if (valid) {
      setUsernameMessage('Checking username...')
      setUsernameAvailable(false)

      postCheckUsername(newUsername)
        .then((res) => {
          setUsernameAvailable(res.available)
          setUsernameMessage(res.message)
        })
        .catch(R.identity)
    } else {
      setUsernameAvailable(valid)
      setUsernameMessage(message)
    }
  }

  const updateUsername = (newUserName) => {
    setUsername(newUserName)
    checkPassword(newUserName, password)
  }

  const handleUsernameChange = (e) => {
    updateUsername(e.target.value)
    checkUsername(e.target.value)
  }
  const handleAddressChange = (e) => {
    setaddress(e.target.value)
  }
  const handleResturantChange = (e) => {
    setRestaurantName(e.target.value)
  }
  const handlePincodeChange = (e) => {
    setpincode(e.target.value)
  }
  const handleLocationChange = (e) => {
    setlocation(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    checkPassword(username, e.target.value)
  }

  const handleFileChange =(e) =>{
    console.log("File name ", e.target.value)
    setFileName(e.target.value)
    console.log("Filess ", e.target.files[0])
    setProfilePic(e.target.files[0])
  }

  const register = () => {
    console.log("PP ",profilePic)
    console.log("SS ",fileName)

    // const profilePic  = new FormData()
    // profilePic.append('profilePic', profilePic)

    if (usernameAvailable && passwordValid) {

      const newUser  = new FormData()

      newUser.append('profilePic', profilePic)
      newUser.append('username', username)
      newUser.append('password', password)
      newUser.append('restaurantName', restaurantName)
      newUser.append('location', location)
      newUser.append('pincode', pincode)
      newUser.append('role', role)
      newUser.append('address', address)
      newUser.append('role', role)

      
      dispatch(attemptRestuarantRegister(newUser)).catch(R.identity)
    }
  }

  useKeyPress('Enter', register)

  return (
    <Box className='register'>
      <Title size='3'>Register Restaurant</Title>
      <hr className='separator' />
      <p className='has-space-below'>
        Already a member?&nbsp;
        <Link to='/login'>Login</Link>
      </p>
      <Field>
        <Label htmlFor='username'>Username</Label>
        <Control iconsRight>
          <Input
            id='username'
            placeholder='Username'
            color={
              username ? (usernameAvailable ? 'success' : 'danger') : undefined
            }
            value={username}
            onChange={handleUsernameChange}
          />
          {username && (
            <Icon
              size='small'
              align='right'
              color={usernameAvailable ? 'success' : 'danger'}
            >
              <FontAwesomeIcon
                icon={usernameAvailable ? faCheck : faExclamationTriangle}
              />
            </Icon>
          )}
        </Control>
        {username && (
          <Help color={usernameAvailable ? 'success' : 'danger'}>
            {usernameMessage}
          </Help>
        )}
      </Field>
      <Field>
        <Label htmlFor='password'>Password</Label>
        <Control iconsRight>
          <Input
            id='password'
            placeholder='Password'
            type='password'
            color={
              password ? (passwordValid ? 'success' : 'danger') : undefined
            }
            value={password}
            onChange={handlePasswordChange}
          />
          {password && (
            <Icon
              size='small'
              align='right'
              color={passwordValid ? 'success' : 'danger'}
            >
              <FontAwesomeIcon
                icon={passwordValid ? faCheck : faExclamationTriangle}
              />
            </Icon>
          )}
        </Control>
        {password && (
          <Help color={passwordValid ? 'success' : 'danger'}>
            {passwordMessage}
          </Help>
        )}
      </Field>
      <Field>
        <Label htmlFor='restaurantName'>Restaurant Name</Label>
        <Control iconsRight>
          <Input
            id='restaurantName'
            placeholder='Restaurant Name'
            type='text'
            // color={password ? (passwordValid ? 'success' : 'danger') : undefined}
            value={restaurantName}
            onChange={handleResturantChange}
          />
        </Control>
      </Field>
      <Field>
        <Label htmlFor='address'>Restaurant Address</Label>
        <Control iconsRight>
          <Input
            id='address'
            placeholder='Restaurant Address'
            type='text'
            // color={password ? (passwordValid ? 'success' : 'danger') : undefined}
            value={address}
            onChange={handleAddressChange}
          />
        </Control>
      </Field>
      <Field>
        <Label htmlFor='pincode'>Restaurant Zipcode</Label>
        <Control iconsRight>
          <Input
            id='pincode'
            placeholder='Restaurant Zipcode'
            type='text'
            // color={password ? (passwordValid ? 'success' : 'danger') : undefined}
            value={pincode}
            onChange={handlePincodeChange}
          />
        </Control>
      </Field>
      <Field>
        <Label htmlFor='location'>Restaurant Location(City)</Label>
        <Control iconsRight>
          <Input
            id='location'
            placeholder='Restaurant Location(City)'
            type='text'
            // color={password ? (passwordValid ? 'success' : 'danger') : undefined}
            value={location}
            onChange={handleLocationChange}
          />
        </Control>
      </Field>
      <Field>
        <Label htmlFor='file'>Attach a Restaurant Image</Label>
        <Control iconsRight>
          <Input
            id='profilePic'
            placeholder='Restaurant Image'
            type='file'
            // color={password ? (passwordValid ? 'success' : 'danger') : undefined}
             value={fileName}
            onChange={handleFileChange}
          />
        </Control>
      </Field>
      {/* <Field>
    <File color="info" hasName >
      <File.Label>
        <File.Input name="file" type="file"  onChange={handleFileChange}/>
        <File.CTA >
          <File.Icon>
            <FontAwesomeIcon icon={faUpload} />
          </File.Icon>
          <File.Text>Restaurant Image</File.Text>
        </File.CTA>
        <File.Name>File name </File.Name>
      </File.Label>
    </File>
  </Field> */}

      <hr className='separator' />
      <div className='has-text-right'>
        <Button
          color='success'
          onClick={register}
          disabled={!passwordValid || !usernameAvailable}
        >
          Create Account
        </Button>
      </div>
    </Box>
  )
}
