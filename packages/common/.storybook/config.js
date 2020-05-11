import { configure } from '@storybook/react';
import '@patternfly/patternfly/patternfly.css';
const req = require.context('../src/components', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}
module = {
  addons: [ '@storybook/addon-actions/register',
            '@storybook/addon-storysource',
            '@storybook/addon-knobs/register',
            '@storybook/addon-links/register',
            '@storybook/addon-viewport/register',
            '@storybook/addon-console',
            '@storybook/addon-options/register']
}
configure(loadStories, module);