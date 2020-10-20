import React from 'react';
import { shallow } from 'enzyme';
import ProcessDetailsProcessDiagram from '../ProcessDetailsProcessDiagram';

describe('ProcessDetailsDiagram component tests', () => {
  it('Snapshot testing', () => {
    const svg = {
      props: {
        src:
          '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800" height="300" viewBox="0 0 1748 632"></svg>'
      }
    };
    const svgError = '';
    const wrapper = shallow(
      <ProcessDetailsProcessDiagram svg={svg} svgError={svgError} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
