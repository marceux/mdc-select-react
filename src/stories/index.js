import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Select from '../Select';

const options = [
  { id: 'apple', label: 'Apple', value: 'apple' },
  { id: 'orange', label: 'Orange', value: 'orange' },
  { id: 'strawberry', label: 'Strawberry', value: 'strawberry' },
  { id: 'grape', label: 'Grape', value: 'grape' },
];

storiesOf('Select', module)
  .add('with default options', () => (
    <Select options={options} placeholder="Select a Fruit" />
  ));
