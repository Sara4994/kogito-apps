import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import PageNotFound from './PageNotFound';

const props ={ 
    defaultPath: '/DomainExplorer',
  defaultButton: 'Go to domain explorer',
  location: {

  }
}

const eventsFromObject = actions({
    onClick: 'clicked',
    onMouseOver: 'hovered'
  });
  export default {
    title: 'Storybook Knobs',
    decorators: [withKnobs]
  };

storiesOf('Page Not Found',module).add('default', () =>(
    <PageNotFound {...props} {...eventsFromObject}/>
))