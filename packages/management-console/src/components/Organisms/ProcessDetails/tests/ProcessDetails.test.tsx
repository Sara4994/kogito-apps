import React from 'react';
import { shallow } from 'enzyme';
import ProcessDetails from '../ProcessDetails';

const props = {
    loading: false,
    data: {
        ProcessInstances: [{
            id: '',
            processId: '',
            state: ''
        }]
    }
}

const props2 = {
    loading: true,
    data: {
        ProcessInstances: [{
            id: '2d962eef-45b8-48a9-ad4e-9cde0ad6af88',
            processId: 'hotelBooking',
            state: 'COMPLETED'
        }]
    }
}

describe('Process Details component', () => {
    it('Snapshot tests', () => {
        const wrapper = shallow(<ProcessDetails {...props}/>);
        expect(wrapper).toMatchSnapshot();
      });
    it('Sample test case', () => {
        const wrapper = shallow(<ProcessDetails {...props2}/>);
        expect(wrapper.find('Text').first().prop('component')).toBe('h4');
    });
})

