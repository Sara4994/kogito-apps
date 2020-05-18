import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Nav, NavList, NavItem } from '@patternfly/react-core';
import {BrowserRouter} from 'react-router-dom';
import PageLayout from '../src/components/Templates/PageLayout/PageLayout';
import '@patternfly/patternfly/patternfly.css';
import managementConsoleLogo from '../src/static/managementConsoleLogo.svg';
const req = require.context('../src/components', true, /.stories.tsx$/);

const PageNav = (
  <Nav aria-label="Nav" theme="dark">
    <NavList>
      <NavItem >
        Process Instances
      </NavItem>
      <NavItem >
        Domain Explorer
      </NavItem>
    </NavList>
  </Nav>
);

const BrandClick = () => {
  return null;
}

addDecorator(storyFn => {
  console.log('story',storyFn)
  return(<BrowserRouter>
  <div style={{ height: '100vh' }}>
  <PageLayout
    PageNav={PageNav}
    BrandSrc={managementConsoleLogo}
    BrandAltText="Management Console Logo"
    BrandClick={BrandClick}
  >{storyFn()}</PageLayout>
  </div>
</BrowserRouter>)});

function loadStories() {
  req.keys().forEach(req);
}

module = {
  addons: ['@storybook/addon-actions/register',
    '@storybook/addon-storysource',
    '@storybook/addon-knobs/register',
    '@storybook/addon-links/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-console',
    '@storybook/addon-options/register']
}
configure(loadStories, module);