import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import R from 'ramda';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';

import Box from 'react-bulma-companion/lib/Box';
import Icon from 'react-bulma-companion/lib/Icon';
import Title from 'react-bulma-companion/lib/Title';
import Columns from 'react-bulma-companion/lib/Columns';
import Column from 'react-bulma-companion/lib/Column';
import Button from 'react-bulma-companion/lib/Button';
import Image from 'react-bulma-companion/lib/Image';
import Field from 'react-bulma-companion/lib/Field';
import Control from 'react-bulma-companion/lib/Control';
import Textarea from 'react-bulma-companion/lib/Textarea';
import Label from 'react-bulma-companion/lib/Label';
import Help from 'react-bulma-companion/lib/Help';
import Input from 'react-bulma-companion/lib/Input';
import axios from 'axios'

import { validateName } from '_utils/validation';
import { attemptGetUser, attemptUpdateUser, attemptUpdateRestaurantInfo } from '_thunks/user';


export default function GeneralProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  const [bio, setBio] = useState(user.bio || '');
  const [profilePic, setProfilePic] = useState(user.profilePic || '');
  const [restaurantName, setResName] = useState("");
  const [location, setResLocation] = useState("");
  const [address, setResAddress] = useState("");
  const [pincode, setResZipCode] = useState("");
  const [resNameEdited, setResNameEdited] = useState(false);
  const [resLocationEdited, setResLocationEdited] = useState(false);
  const [resAddressEdited, setResAddressEdited] = useState(false);
  const [resZipCodeEdited, setResZipCodeEdited] = useState(false);
  const [resProfilePicEdited, setResProfilePicEdited] = useState(false);

  const resetState = () => {
    setResNameEdited('');
    setResLocationEdited('');
    setResAddressEdited('');
    setResZipCodeEdited('');
    setResProfilePicEdited('');
  };

  
  useEffect(() => {
    console.log("useEffect called!");
    const getRestaurantsInfo = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/res/getRestaurantInfo/"+user.restaurantID,
        ).then(res => {
        console.log("response", res)
        setResName(res.data.restaurants[0].restaurantName);
        setResLocation(res.data.restaurants[0].location);
        setResAddress(res.data.restaurants[0].address);
        setResZipCode(res.data.restaurants[0].pincode);
        setProfilePic(res.data.restaurants[0].profilePic);
        console.log("Name ",res.data.restaurants[0].restaurantName);
        })
      } catch (e) { 
        console.log(e);
      }
    };
    getRestaurantsInfo();
  }, []);


  const updateFirstName = e => {
    if (validateName(e.target.value)) {
      setFirstName(e.target.value);
      setFirstNameEdited(true);
    }
  };

  const updateRestaurantName = e => {
    if(validateName(e.target.value)){
      setResName(e.target.value);
      setResNameEdited(true);
    }
  };

  const updateRestaurantAddress = e => {
    setResAddress(e.target.value);
    setResAddressEdited(true);
  };

  const updateRestaurantZipCode = e => {
    setResZipCode(e.target.value);
    setResZipCodeEdited(true);
  };

  const updateRestaurantState = e => {
    setResLocation(e.target.value);
    setResLocationEdited(true);
  };

  const updateProfilePic = e => {
    setProfilePic(e.target.value);
    setProfilePicEdited(true);
  };

  const refresh = () => dispatch(attemptGetUser())
    .then(resetState)
    .catch(R.identity);

  const save = () => {
    const updatedUser = {};

    if (resNameEdited) { updatedUser.restaurantName = restaurantName; }
    if (resAddressEdited) { updatedUser.address = address; }
    if (resZipCodeEdited) { updatedUser.pincode = pincode; }
    if (resLocationEdited) { updatedUser.location = location; }

    if (!R.isEmpty(updatedUser)) {
      dispatch(attemptUpdateRestaurantInfo(updatedUser))
        .catch(R.identity);
    }
  };

  const charactersRemaining = 240 - bio.length;
  const edited = resNameEdited || resAddressEdited || resZipCodeEdited || resLocationEdited;
  console.log("Step 2")
  return (
  

    <Box className="general-profile">
      <Icon size="medium" className="is-pulled-right" onClick={refresh} onKeyPress={refresh}>
        <FontAwesomeIcon icon={faSync} size="lg" />
      </Icon>
      <Title size="3">
        Restaurant Information
      </Title>
      <hr className="separator" />
      <Columns>
        <Column size="6">
          <Title size="3" className="has-text-centered">
            {user.usernameCase}
          </Title>
          <Image>
            <Image.Content
              className="profile-img"
              src={profilePic || '/images/default-profile.png'}
              alt="Profile"
            />
          </Image>
          {/* <Field>
            <Label htmlFor="profile-pic-url">
              Picture URL
            </Label>
            <Control>
              <Input
                id="profile-pic-url"
                placeholder="Picture URL"
                value={""}
                onChange={updateProfilePic}
              />
            </Control>
          </Field> */}
        </Column>
        <Column size="8">
          <Columns>
            <Column size="6">
              <Field>
                <Label htmlFor="first-name" className="Label">
                  Restaurant Name
                </Label>
                <Control>
                  <Input
                    id="first-name"
                    placeholder="First Name"
                    value={restaurantName}
                    onChange={updateRestaurantName}
                  />
                </Control>
              </Field>
            </Column>
            </Columns>
          <Columns>
          <Column size="6">
          <Field>
            <Label htmlFor="bio">
              Restaurant Address
            </Label>
            <Control>
              <Input
                id="bio"
                placeholder="Address"
                value={address}
                maxLength={240}
                onChange={updateRestaurantAddress}
              />
            </Control>
            <Help>
              {`Characters remaining: ${charactersRemaining}`}
            </Help>
          </Field>
          </Column>
          </Columns>
          <Columns>
            <Column size="3">
              <Field>
                <Label htmlFor="last-name">
                  City
                </Label>
                <Control>
                  <Input
                    id="last-name"
                    placeholder="Last Name"
                    value={location}
                    onChange={updateRestaurantState}
                  />
                </Control>
              </Field>
            </Column>
            <Column size="2">
              <Field>
                <Label htmlFor="zip-code">
                  Zip Code
                </Label>
                <Control>
                  <Input
                    id="zip-code"
                    placeholder="zip code"
                    value={pincode}
                    onChange={updateRestaurantZipCode}
                  />
                </Control>
              </Field>
            </Column>
            </Columns>
        </Column>
      </Columns>
      <hr className="separator" />
      <Button color="success" onClick={save} disabled={!edited}>
        Save
      </Button>
    </Box>
  );
}
