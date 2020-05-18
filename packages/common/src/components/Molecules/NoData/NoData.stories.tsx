import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import NoData from './NoData';

const eventsFromObject = actions({
    onClick: 'clicked',
    onMouseOver: 'hovered'
  });
  export default {
    title: 'Storybook Knobs',
    decorators: [withKnobs]
  };

const props = {
    location: {
        state: {
            prev: '/DomainExplorer',
            title: 'Domain not found',
            description: `Domain with the name Travels not found`,
            buttonText: 'Go to domain explorer'
        }
    },
    defaultPath: '/ProcessInstances',
    defaultButton: 'Go to process list'
}


storiesOf('No Data', module).add('default', () =>(
  
    <NoData {...props} {...eventsFromObject}/>
))