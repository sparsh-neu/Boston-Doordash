import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';

import Section from 'react-bulma-companion/lib/Section';
import Container from 'react-bulma-companion/lib/Container';
import Title from 'react-bulma-companion/lib/Title';
import img from '../../../assets/images/restaurant.jpeg';

export default function WelcomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push('/home'));
    }
  }, []);

  return (
    <div className="welcome-page page">
      <Section>
        <Container>
          <Title size="1">
            Find Your Favourite Nearby Restaurants
          </Title>
        </Container>
      </Section>
      <img src={img} alt="logo" />
    </div>
  );
}
