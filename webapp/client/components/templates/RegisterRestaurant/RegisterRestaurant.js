import React from 'react';
import RegisterRestaurant from '_organisms/RegisterRestaurant';

import Section from 'react-bulma-companion/lib/Section';

export default function RegisterSection() {
  return (
    <Section className="register-secction">
      <RegisterRestaurant />
    </Section>
  );
}
