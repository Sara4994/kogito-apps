import React from 'react';
import { storiesOf } from '@storybook/react';
import AboutModelBox from './AboutModalBox';

storiesOf('About Modal Box', module).add('default', () => (
  <AboutModelBox isOpenProp={true} handleModalToggleProp={() => null} />
));
