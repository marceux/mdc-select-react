import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Datalist from '../components/Datalist';
import Select from '../components/Select';

const options = [
  { id: 'default', text: '', value: '' },
  { id: 'apple', text: 'Apple', value: 'apple' },
  { id: 'orange', text: 'Orange', value: 'orange' },
  { id: 'strawberry', text: 'Strawberry', value: 'strawberry' },
  { id: 'grape', text: 'Grape', value: 'grape' },
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
  ))
  .add('disabled is true', () => (
    <Select {...props} disabled />
  ));

storiesOf('Datalist', module)
  .add('default', () => (
    <Datalist {...props} />
  ));
