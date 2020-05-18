import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import AboutModelBox from './AboutModalBox';
import { aboutLogoContext } from '../../contexts';
import managementConsoleLogo from '../../../static/managementConsoleLogo.svg';

const eventsFromObject = actions({
  onClick: 'clicked',
  onMouseOver: 'hovered'
});
export default {
  title: 'Storybook Knobs',
  decorators: [withKnobs]
};
storiesOf('About Modal Box', module).add('default', () => (
  <aboutLogoContext.Provider value={managementConsoleLogo}>
    <AboutModelBox
      isOpenProp={true}
      handleModalToggleProp={() => null}
      {...eventsFromObject}
    />
  </aboutLogoContext.Provider>
));
