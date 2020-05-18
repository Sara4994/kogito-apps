import React from 'react';
import {storiesOf} from '@storybook/react';
import ServerUnavailable from './ServerUnavailable';

storiesOf('Server unavailable', module).add('default',() => (
    <ServerUnavailable />
))