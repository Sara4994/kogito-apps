import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import {
  useGetQueryTypesQuery,
  useGetQueryFieldsQuery,
  useGetColumnPickerAttributesQuery
} from '../../../../graphql/types';
import DomainExplorerContainer from '../DomainExplorerContainer';
import { MockedProvider, wait } from '@apollo/react-testing';
import { getWrapper } from '../../../../utils/OuiaUtils';

jest.mock('react-apollo');

const props = {
  domains: ['Travels', 'VisaApplications'],
  loadingState: false,
  rememberedParams: [{ flight: ['arrival'] }, { flight: ['departure'] }],
  rememberedSelections: [],
  domainName: 'Travels',
  metaData: {
    metadata: [
      {
        processInstances: [
          'id',
          'processName',
          'state',
          'start',
          'lastUpdate',
          'businessKey'
        ]
      }
    ]
  }
};

const routeComponentPropsMock = {
  history: {locations : {key: "ugubul"}} as any,
  location: {
    pathname: '/DomainExplorer/Travels',
    state: {
      parameters: [{ flight: ['arrival'] }, { flight: ['departure'] }]
    },
    key: "ugubul"
  } as any,
  match: {
    params: {
      domainName: 'Travels'
    }
  } as any,
}
const routeComponentPropsMock2 = {
  history: { locations : {key: "ugubul"} } as any,
  location: {
    pathname: '/DomainExplorer/Travels',
    state: {

    }
  } as any,
  match: {
    params: {
      domainName: 'Travels'
    }
  } as any,
}
const props2 = {
  domains: ['Travels', 'VisaApplications'],
  location: {
    pathname: '/DomainExplorer/Travels',
    state: {}
  },
  match: {
    params: {
      domainName: 'Travels'
    }
  },
  rememberedParams: [],
  rememberedSelections: [],
  domainName: 'Travels',
  metaData: {}
};

jest.mock('../../../../graphql/types');

describe('Domain Explorer Container component', () => {
  it('Snapshot test', async () => {
    // @ts-ignore
    useGetColumnPickerAttributesQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          fields: [
            {
              name: 'flight',
              type: {
                name: 'Flight',
                kind: 'OBJECT',
                fields: [
                  {
                    name: 'arrival',
                    type: {
                      name: 'String',
                      kind: 'SCALAR'
                    }
                  }
                ]
              }
            },
            {
              name: 'id',
              type: {
                name: 'String',
                kind: 'SCALAR',
                fields: null
              }
            }
          ]
        }
      }
    });
    // @ts-ignore
    useGetQueryFieldsQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          fields: [
            {
              name: 'Travels'
            },
            {
              name: 'visaApplication'
            },
            {
              name: 'Jobs'
            }
          ]
        }
      }
    });
    // @ts-ignore
    useGetQueryTypesQuery.mockReturnValue({
      loading: false,
      data: {}
    });    
    const wrapper = mount(
      <BrowserRouter>
        <MockedProvider mocks={[]} addTypename={false}>
          <DomainExplorerContainer {...props} {...routeComponentPropsMock} />
        </MockedProvider>
      </BrowserRouter>);
      await wait(0)
    wrapper.update();
    expect(wrapper.find(DomainExplorerContainer)).toMatchSnapshot();
  });
  it('Check error response for getQueryFields query', async () => {
    // @ts-ignore
    useGetQueryFieldsQuery.mockReturnValue({
      loading: false,
      data: null,
      error: {}
    });
    const wrapper = mount(
      <BrowserRouter>
        <MockedProvider mocks={[]} addTypename={false}>
          <DomainExplorerContainer {...props} {...routeComponentPropsMock} />
        </MockedProvider>
      </BrowserRouter>
    );
    wrapper.update();
    wrapper.setProps({});
    expect(wrapper.find(DomainExplorerContainer)).toMatchSnapshot();
  });
  it('Mock query testing', async () => {
    // @ts-ignore
    useGetQueryFieldsQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          fields: [
            {
              name: 'Travels'
            },
            {
              name: 'visaApplication'
            },
            {
              name: 'Jobs'
            }
          ]
        }
      }
    });
    // @ts-ignore
    useGetColumnPickerAttributesQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          fields: [
            {
              name: 'flight',
              type: {
                name: 'Flight',
                kind: 'OBJECT',
                fields: [
                  {
                    name: 'arrival',
                    type: {
                      name: 'String',
                      kind: 'SCALAR'
                    }
                  }
                ]
              }
            },
            {
              name: 'id',
              type: {
                name: 'String',
                kind: 'SCALAR',
                fields: null
              }
            }
          ]
        }
      }
    });
    // @ts-ignore
    useGetQueryTypesQuery.mockReturnValue({
      loading: false,
      data: {}
    });
    const wrapper = getWrapper(
      <BrowserRouter>
        <MockedProvider mocks={[]} addTypename={false}>
          <DomainExplorerContainer {...props} {...routeComponentPropsMock} />
        </MockedProvider>
      </BrowserRouter>, 'DomainExplorerContainer');
    wrapper.update();
    expect(wrapper.find(DomainExplorerContainer)).toMatchSnapshot();
    expect(useGetQueryFieldsQuery).toHaveBeenCalled();
    expect(useGetQueryTypesQuery).toHaveBeenCalled();
    expect(useGetColumnPickerAttributesQuery).toBeCalledWith({
      variables: { columnPickerType: 'Travels' }
    });
  });
  it('Check error response for getPicker query', () => {
    // @ts-ignore
    useGetColumnPickerAttributesQuery.mockReturnValue({
      loading: false,
      error: {}
    });
    const wrapper = mount(
      <BrowserRouter>
        <DomainExplorerContainer {...props} {...routeComponentPropsMock} />
      </BrowserRouter>
    );
    wrapper.update();
    wrapper.setProps({});
    expect(wrapper).toMatchSnapshot();
  });
  it('Check error response for getQueryTypes', () => {
    // @ts-ignore
    useGetQueryTypesQuery.mockReturnValue({
      loading: false,
      data: null,
      error: {}
    });
    const wrapper = mount(
      <BrowserRouter>
        <DomainExplorerContainer {...props} {...routeComponentPropsMock} />
      </BrowserRouter>
    );
    wrapper.update();
    wrapper.setProps({});
    expect(wrapper).toMatchSnapshot();
  });
  it('check assertions on rememberedParams', () => {
    const wrapper = mount(
      <BrowserRouter>
        <DomainExplorerContainer {...props2} {...routeComponentPropsMock2} />
      </BrowserRouter>);
    wrapper.update();
    wrapper.setProps({});
    expect(wrapper.find(DomainExplorerContainer)).toMatchSnapshot();
  });
});