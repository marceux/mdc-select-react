import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Select from '../Select';

const options = [
  { id: 'apple', label: 'Apple', value: 'apple' },
  { id: 'orange', label: 'Orange', value: 'orange' },
  { id: 'strawberry', label: 'Strawberry', value: 'strawberry' },
  { id: 'grape', label: 'Grape', value: 'grape' },
];

const props = {
  options,
  onBlur: action('Blur'),
  onChange: action('Change'),
  onFocus: action('Focus'),
};

storiesOf('Select', module)
  .add('default', () => (
    <Select {...props} />
  ))
  .add('with placeholder', () => (
    <Select {...props} placeholder="Testing" />
  ));
