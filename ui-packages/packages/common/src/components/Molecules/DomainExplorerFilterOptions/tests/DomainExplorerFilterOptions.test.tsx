import React from 'react';
import DomainExplorerFilterOptions from '../DomainExplorerFilterOptions';
import reactApollo from 'react-apollo';
import { GraphQL } from '../../../../graphql/types';
import useGetInputFieldsFromQueryQuery = GraphQL.useGetInputFieldsFromQueryQuery;
import useGetInputFieldsFromTypeQuery = GraphQL.useGetInputFieldsFromTypeQuery;
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() });
jest.mock('apollo-client');
jest.mock('react-apollo', () => {
  const ApolloClient = { query: jest.fn() };
  return { useApolloClient: jest.fn(() => ApolloClient) };
});

jest.mock('../../../../graphql/types');
// tslint:disable: no-string-literal
// tslint:disable: no-unexpected-multiline
describe('Domain explorer filter options component tests', () => {
  const defaultProps = {
    currentDomain: 'Travels',
    getQuery: {
      loading: false,
      data: {
        __type: {
          name: 'Query',
          fields: [
            {
              name: 'Travels',
              args: [
                {
                  name: 'where',
                  type: { kind: 'INPUT_OBJECT', name: 'TravelsArgument' }
                },
                {
                  name: 'orderBy',
                  type: { kind: 'INPUT_OBJECT', name: 'TravelsOrderBy' }
                },
                {
                  name: 'pagination',
                  type: { kind: 'INPUT_OBJECT', name: 'Pagination' }
                }
              ],
              type: {
                ofType: { name: 'Travels' }
              }
            }
          ]
        }
      }
    },
    parameters: [
      { flight: ['arrival'] },
      { flight: ['departure'] },
      { flight: ['gate'] },
      {
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
    ],
    setColumnFilters: jest.fn(),
    setTableLoading: jest.fn(),
    setDisplayTable: jest.fn(),
    setDisplayEmptyState: jest.fn(),
    setFilterError: jest.fn(),
    getQueryTypes: {
      loading: false,
      data: {
        __schema: {
          queryType: [
            {
              name: 'AddressArgument',
              kind: 'INPUT_OBJECT',
              inputFields: [
                {
                  name: 'city',
                  type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                },
                {
                  name: 'country',
                  type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                },
                {
                  name: 'street',
                  type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                },
                {
                  name: 'zipCode',
                  type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                }
              ]
            },
            {
              name: 'IdArgument',
              kind: 'INPUT_OBJECT',
              inputFields: [
                { name: 'id', type: { name: null, kind: 'LIST' } },
                { name: 'equal', type: { name: 'String', kind: 'SCALAR' } },
                { name: 'isNull', type: { name: 'Boolean', kind: 'SCALAR' } }
              ]
            }
          ]
        }
      }
    },
    filterChips: ['metadata / processInstances / state: ACTIVE'],
    setFilterChips: jest.fn(),
    runFilter: true,
    setRunFilter: jest.fn(),
    finalFilters: {
      metadata: {
        processInstances: { state: { equal: 'ACTIVE' } }
      },
      trip: {
        country: {
          equal: 'Australia'
        }
      }
    },
    argument: 'TravelsArgument',
    setFinalFilters: jest.fn(),
    getSchema: {
      data: {
        __type: {
          name: 'TravelsArgument',
          inputFields: [
            { name: 'and', type: { name: null, kind: 'LIST' } },
            { name: 'or', type: { name: null, kind: 'LIST' } },
            {
              name: 'flight',
              type: {
                name: 'FlightArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  {
                    name: 'arrival',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'departure',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'flightNumber',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'gate',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'seat',
                    type: {
                      name: 'StringArgument'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    },
    reset: false,
    setReset: jest.fn()
  };
  const defaultProps2 = {
    reset: false,
    setReset: jest.fn(),
    currentDomain: 'Travels',
    getQuery: {
      loading: false,
      data: {
        __type: {
          name: 'Query',
          fields: [
            {
              name: 'Travels',
              args: [
                {
                  name: 'where',
                  type: { kind: 'INPUT_OBJECT', name: 'TravelsArgument' }
                },
                {
                  name: 'orderBy',
                  type: { kind: 'INPUT_OBJECT', name: 'TravelsOrderBy' }
                },
                {
                  name: 'pagination',
                  type: { kind: 'INPUT_OBJECT', name: 'Pagination' }
                }
              ],
              type: {
                ofType: { name: 'Travels' }
              }
            }
          ]
        }
      }
    },
    parameters: [
      { flight: ['arrival'] },
      { flight: ['departure'] },
      { flight: ['gate'] },
      {
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
    ],
    setColumnFilters: jest.fn(),
    setTableLoading: jest.fn(),
    setDisplayTable: jest.fn(),
    setDisplayEmptyState: jest.fn(),
    setFilterError: jest.fn(),
    getQueryTypes: {
      loading: false,
      data: {
        __schema: {
          queryType: [
            {
              name: 'AddressArgument',
              kind: 'INPUT_OBJECT',
              inputFields: [
                {
                  name: 'city',
                  type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                },
                {
                  name: 'country',
                  type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                },
                {
                  name: 'street',
                  type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                },
                {
                  name: 'zipCode',
                  type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                }
              ]
            },
            {
              name: 'IdArgument',
              kind: 'INPUT_OBJECT',
              inputFields: [
                { name: 'id', type: { name: null, kind: 'LIST' } },
                { name: 'equal', type: { name: 'String', kind: 'SCALAR' } },
                { name: 'isNull', type: { name: 'Boolean', kind: 'SCALAR' } }
              ]
            },
            {
              name: 'ProcessInstanceMetaArgument',
              kind: 'INPUT_OBJECT',
              inputFields: [
                {
                  name: 'state',
                  type: {
                    name: 'ProcessInstanceStateArgument',
                    kind: 'INPUT_OBJECT'
                  }
                }
              ]
            }
          ]
        }
      }
    },
    filterChips: [],
    setFilterChips: jest.fn(),
    runFilter: true,
    setRunFilter: jest.fn(),
    finalFilters: {
      metadata: {
        processInstances: { state: { equal: 'ACTIVE' } }
      },
      trip: {
        country: {
          equal: 'Australia'
        }
      }
    },
    argument: 'TravelsArgument',
    setFinalFilters: jest.fn(),
    getSchema: {
      data: {
        __type: {
          name: 'TravelsArgument',
          inputFields: [
            { name: 'and', type: { name: null, kind: 'LIST' } },
            { name: 'or', type: { name: null, kind: 'LIST' } },
            {
              name: 'flight',
              type: {
                name: 'FlightArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  {
                    name: 'arrival',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'departure',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'flightNumber',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'gate',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'seat',
                    type: {
                      name: 'StringArgument'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    }
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  let client;
  let useApolloClient;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  const mockuseApolloClient = () => {
    // tslint:disable-next-line: react-hooks-nesting
    client = useApolloClient();
  };

  beforeEach(() => {
    useApolloClient = jest.spyOn(reactApollo, 'useApolloClient');
    mockuseApolloClient();
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
    mockUseEffect();
  });
  it('Snapshot test with default props', async () => {
    const props = {
      reset: false,
      setReset: jest.fn(),
      currentDomain: 'Travels',
      getQuery: {
        loading: false,
        data: {
          __type: {
            name: 'Query',
            fields: [
              {
                name: 'Travels',
                args: [
                  {
                    name: 'where',
                    type: { kind: 'INPUT_OBJECT', name: 'TravelsArgument' }
                  },
                  {
                    name: 'orderBy',
                    type: { kind: 'INPUT_OBJECT', name: 'TravelsOrderBy' }
                  },
                  {
                    name: 'pagination',
                    type: { kind: 'INPUT_OBJECT', name: 'Pagination' }
                  }
                ],
                type: {
                  ofType: { name: 'Travels' }
                }
              }
            ]
          }
        }
      },
      parameters: [
        {
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
      ],
      setColumnFilters: jest.fn(),
      setTableLoading: jest.fn(),
      setDisplayTable: jest.fn(),
      setDisplayEmptyState: jest.fn(),
      setFilterError: jest.fn(),
      getQueryTypes: {
        loading: false,
        data: {
          __schema: {
            queryType: [
              {
                name: 'TestArgument',
                inputFields: [
                  {
                    name: 'test',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  }
                ]
              },
              {
                name: 'AddressArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  {
                    name: 'city',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  },
                  {
                    name: 'country',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  },
                  {
                    name: 'street',
                    type: { name: 'TestArgument', kind: 'INPUT_OBJECT' }
                  },
                  {
                    name: 'zipCode',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  }
                ]
              },
              {
                name: 'IdArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  { name: 'id', type: { name: null, kind: 'LIST' } },
                  { name: 'equal', type: { name: 'String', kind: 'SCALAR' } },
                  { name: 'isNull', type: { name: 'Boolean', kind: 'SCALAR' } }
                ]
              }
            ]
          }
        }
      },
      filterChips: [],
      setFilterChips: jest.fn(),
      runFilter: true,
      setRunFilter: jest.fn(),
      finalFilters: {
        metadata: {
          processInstances: { state: { equal: 'ACTIVE' } }
        },
        trip: {
          country: {
            equal: 'Australia'
          }
        }
      },
      argument: 'TravelsArgument',
      setFinalFilters: jest.fn(),
      getSchema: {
        data: {
          __type: {
            name: 'TravelsArgument',
            inputFields: [
              { name: 'and', type: { name: null, kind: 'LIST' } },
              { name: 'or', type: { name: null, kind: 'LIST' } },
              {
                name: 'id',
                type: {
                  inputFields: [
                    { name: 'in', type: { name: null, __typename: '__Type' } },
                    {
                      name: 'equal',
                      type: { name: 'String', __typename: '__Type' }
                    },
                    {
                      name: 'isNull',
                      type: { name: 'Boolean', __typename: '__Type' }
                    }
                  ],
                  kind: 'INPUT_OBJECT',
                  name: 'IdArgument'
                }
              },
              {
                name: 'flight',
                type: {
                  name: 'FlightArgument',
                  kind: 'INPUT_OBJECT',
                  inputFields: [
                    {
                      name: 'arrival',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'departure',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'flightNumber',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'gate',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'seat',
                      type: {
                        name: 'StringArgument'
                      }
                    }
                  ]
                }
              },
              {
                name: 'hotel',
                type: {
                  name: 'HotelArgument',
                  kind: 'INPUT_OBJECT',
                  inputFields: [
                    {
                      name: 'address',
                      type: { name: 'AddressArgument', __typename: '__Type' }
                    },
                    {
                      name: 'bookingNumber',
                      type: { name: 'StringArgument', __typename: '__Type' }
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    };
    // @ts-ignore
    useGetInputFieldsFromTypeQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          name: 'IdArgument',
          inputFields: [
            { name: 'in', type: { name: null, kind: 'LIST' } },
            { name: 'equal', type: { name: 'String', kind: 'SCALAR' } },
            { name: 'isNull', type: { name: 'Boolean', kind: 'SCALAR' } }
          ],
          kind: 'INPUT_OBJECT'
        }
      }
    });
    // @ts-ignore
    useGetInputFieldsFromQueryQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          name: 'TravelsArgument',
          inputFields: [
            {
              name: 'and',
              type: {
                name: null,
                kind: 'LIST',
                inputFields: null
              }
            },
            {
              name: 'or',
              type: {
                name: null,
                kind: 'LIST',
                inputFields: null
              }
            },
            {
              name: 'flight',
              type: {
                name: 'FlightArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  {
                    name: 'arrival',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'departure',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'flightNumber',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'gate',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'seat',
                    type: {
                      name: 'StringArgument'
                    }
                  }
                ]
              }
            },
            {
              name: 'hotel',
              type: {
                name: 'HotelArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  {
                    name: 'address',
                    type: {
                      name: 'AddressArgument'
                    }
                  },
                  {
                    name: 'bookingNumber',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'name',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'phone',
                    type: {
                      name: 'StringArgument'
                    }
                  },
                  {
                    name: 'room',
                    type: {
                      name: 'StringArgument'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    });
    const wrapper = mount(<DomainExplorerFilterOptions {...props} />);
    wrapper.update();
    wrapper.setProps({});
    const mGraphQLResponse = {
      data: {
        Travels: [
          {
            flight: {
              arrival: '2020-07-22T03:30:00.000+05:30',
              departure: '2020-07-07T03:30:00.000+05:30',
              flightNumber: 'MX555',
              gate: 'test',
              seat: 'test'
            },
            metadata: {
              processInstances: [
                {
                  businessKey: 'LKJD13',
                  id: '37bc93d0-1100-3913-85aa-a8dc253281b0',
                  lastUpdate: '2020-07-06T09:16:09.823Z',
                  processName: 'travels',
                  serviceUrl: 'http://localhost:8080',
                  start: '2020-07-06T09:16:09.58Z',
                  state: 'ACTIVE'
                },
                {
                  businessKey: null,
                  id: '8526d522-24f6-4d12-b975-394a0adeb8f8',
                  lastUpdate: '2020-07-06T09:16:09.824Z',
                  processName: 'HotelBooking',
                  serviceUrl: 'http://localhost:8080',
                  start: '2020-07-06T09:16:09.746Z',
                  state: 'COMPLETED'
                }
              ]
            }
          },
          {
            flight: {
              arrival: '2020-07-23T03:30:00.000+05:30',
              departure: '2020-07-10T03:30:00.000+05:30',
              flightNumber: 'MX555',
              gate: null,
              seat: null
            },
            metadata: {
              processInstances: [
                {
                  businessKey: '4Y0W6E',
                  id: 'd2b4967b-e8b1-3232-a07c-d639e08a11d4',
                  lastUpdate: '2020-07-06T09:16:55.621Z',
                  processName: 'travels',
                  serviceUrl: 'http://localhost:8080',
                  start: '2020-07-06T09:16:55.609Z',
                  state: 'ACTIVE'
                },
                {
                  businessKey: null,
                  id: 'cd5f6cc6-7ef4-4eb1-947b-3f53f201ab15',
                  lastUpdate: '2020-07-06T09:16:55.621Z',
                  processName: 'HotelBooking',
                  serviceUrl: 'http://localhost:8080',
                  start: '2020-07-06T09:16:55.611Z',
                  state: 'COMPLETED'
                }
              ]
            }
          }
        ]
      },
      loading: false,
      networkStatus: 7,
      stale: false
    };
    client.query.mockReturnValueOnce(mGraphQLResponse);
    await Promise.resolve();
    expect(wrapper).toMatchSnapshot();
  });
  it('Trigger onselect function on field select', async () => {
    const mGraphQLResponse = {
      data: {
        Travels: []
      },
      loading: false,
      networkStatus: 7,
      stale: false
    };
    client.query.mockReturnValueOnce(mGraphQLResponse);
    const wrapper = mount(<DomainExplorerFilterOptions {...defaultProps} />);
    wrapper.update();
    wrapper.setProps({});

    // @ts-ignore
    useGetInputFieldsFromQueryQuery.mockReturnValue({
      loading: false,
      data: {}
    });
    // @ts-ignore
    useGetInputFieldsFromTypeQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          name: 'IdArgument',
          inputFields: [
            { name: 'in', type: { name: null, kind: 'LIST' } },
            { name: 'equal', type: { name: 'String', kind: 'SCALAR' } },
            { name: 'isNull', type: { name: 'Boolean', kind: 'SCALAR' } }
          ],
          kind: 'INPUT_OBJECT'
        }
      }
    });
    const obj = {
      nativeEvent: {
        target: {
          parentElement: {
            parentElement: {
              getAttribute: jest.fn(() => 'id')
            }
          }
        }
      },
      target: {}
    } as any;
    const obj2 = {
      target: {
        innerText: 'equal'
      }
    } as any;
    // simulate on select prop on fields dropdown to make a selection
    act(() => {
      wrapper
        .find('#select-field')
        .first()
        .props()
        ['onSelect'](obj);
    });
    // simulate on clear prop on fields dropdown
    act(() => {
      wrapper
        .find('#select-field')
        .first()
        .props()
        ['onClear']();
    });
    // simulate dropdown to select an operator
    act(() => {
      wrapper
        .find('#select-operator')
        .first()
        .props()
        ['onSelect'](obj2);
    });
    // check input textbox when the operator is either "equal" or "like"
    wrapper
      .update()
      .find('input')
      .at(1)
      .simulate('change', 'Hello');
    // trigger button click after setting isDisable false on button
    act(() => {
      wrapper
        .find('#button-with-string')
        .at(2)
        .props()['isDisabled'] = false;
      wrapper
        .find('#button-with-string')
        .at(2)
        .props()['disabled'] = false;
      const event = {} as React.MouseEvent<HTMLButtonElement, MouseEvent>;
      wrapper
        .find('#button-with-string')
        .at(2)
        .props()
        ['onClick'](event);
    });
    await Promise.resolve();
    expect(wrapper.find('input')).toBeTruthy();
    expect(wrapper.find('#button-with-string')).toBeTruthy();
  });
  it('check "in" operator', async () => {
    const wrapper = mount(<DomainExplorerFilterOptions {...defaultProps} />);
    wrapper.update();
    wrapper.setProps({});
    // @ts-ignore
    useGetInputFieldsFromQueryQuery.mockReturnValue({
      loading: false,
      data: {}
    });
    // @ts-ignore
    useGetInputFieldsFromTypeQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          name: 'IdArgument',
          inputFields: [
            { name: 'in', type: { name: null, kind: 'LIST' } },
            { name: 'equal', type: { name: 'String', kind: 'SCALAR' } },
            { name: 'isNull', type: { name: 'Boolean', kind: 'SCALAR' } }
          ],
          kind: 'INPUT_OBJECT'
        }
      }
    });
    const obj = {
      nativeEvent: {
        target: {
          parentElement: {
            parentElement: {
              getAttribute: jest.fn(() => 'id')
            }
          }
        }
      },
      target: {
        textContent: 'id'
      }
    } as any;
    const obj2 = {
      target: {
        innerText: 'in'
      }
    } as any;
    // simulate on select prop on fields dropdown to make a selection
    act(() => {
      wrapper
        .find('#select-field')
        .first()
        .props()
        ['onSelect'](obj);
    });
    // trigger on select prop to make a selection on operator dropdown
    act(() => {
      wrapper
        .find('#select-operator')
        .first()
        .props()
        ['onSelect'](obj2);
    });
    // check input text box group when selected operator is "in"
    wrapper
      .update()
      .find('input')
      .at(1)
      .simulate('change', 'test1,test2');
    // trigger button click after setting isDisable false on button
    wrapper
      .find('#button-with-arrayInput')
      .at(2)
      .props()['isDisabled'] = false;
    wrapper
      .find('#button-with-arrayInput')
      .at(2)
      .props()['disabled'] = false;
    const event = {} as React.MouseEvent<HTMLButtonElement, MouseEvent>;
    act(() => {
      wrapper
        .find('#button-with-arrayInput')
        .at(2)
        .props()
        ['onClick'](event);
    });
    expect(wrapper.find('input')).toBeTruthy();
    expect(wrapper.find('#button-with-arrayInput')).toBeTruthy();
  });
  it('check isNull operator', async () => {
    const mGraphQLResponse = {
      data: {
        Travels: [
          {
            flight: {
              arrival: '2020-07-22T03:30:00.000+05:30',
              departure: '2020-07-07T03:30:00.000+05:30',
              flightNumber: 'MX555',
              gate: null,
              seat: null
            },
            metadata: {
              processInstances: [
                {
                  businessKey: 'LKJD13',
                  id: '37bc93d0-1100-3913-85aa-a8dc253281b0',
                  lastUpdate: '2020-07-06T09:16:09.823Z',
                  processName: 'travels',
                  serviceUrl: 'http://localhost:8080',
                  start: '2020-07-06T09:16:09.58Z',
                  state: 'ACTIVE'
                },
                {
                  businessKey: null,
                  id: '8526d522-24f6-4d12-b975-394a0adeb8f8',
                  lastUpdate: '2020-07-06T09:16:09.824Z',
                  processName: 'HotelBooking',
                  serviceUrl: 'http://localhost:8080',
                  start: '2020-07-06T09:16:09.746Z',
                  state: 'COMPLETED'
                }
              ]
            }
          },
          {
            flight: {
              arrival: '2020-07-23T03:30:00.000+05:30',
              departure: '2020-07-10T03:30:00.000+05:30',
              flightNumber: 'MX555',
              gate: null,
              seat: null
            },
            metadata: {
              processInstances: [
                {
                  businessKey: '4Y0W6E',
                  id: 'd2b4967b-e8b1-3232-a07c-d639e08a11d4',
                  lastUpdate: '2020-07-06T09:16:55.621Z',
                  processName: 'travels',
                  serviceUrl: 'http://localhost:8080',
                  start: '2020-07-06T09:16:55.609Z',
                  state: 'ACTIVE'
                },
                {
                  businessKey: null,
                  id: 'cd5f6cc6-7ef4-4eb1-947b-3f53f201ab15',
                  lastUpdate: '2020-07-06T09:16:55.621Z',
                  processName: 'HotelBooking',
                  serviceUrl: 'http://localhost:8080',
                  start: '2020-07-06T09:16:55.611Z',
                  state: 'COMPLETED'
                }
              ]
            }
          }
        ]
      },
      loading: false,
      networkStatus: 7,
      stale: false
    };
    client.query.mockReturnValueOnce(mGraphQLResponse);
    // @ts-ignore
    useGetInputFieldsFromQueryQuery.mockReturnValue({
      loading: false,
      data: {}
    });
    // @ts-ignore
    useGetInputFieldsFromTypeQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          name: 'IdArgument',
          inputFields: [
            { name: 'in', type: { name: null, kind: 'LIST' } },
            { name: 'equal', type: { name: 'String', kind: 'SCALAR' } },
            { name: 'isNull', type: { name: 'Boolean', kind: 'SCALAR' } }
          ],
          kind: 'INPUT_OBJECT'
        }
      }
    });
    const wrapper = mount(<DomainExplorerFilterOptions {...defaultProps} />);
    wrapper.update();
    wrapper.setProps({});
    const obj = {
      nativeEvent: {
        target: {
          parentElement: {
            parentElement: {
              getAttribute: jest.fn(() => 'id')
            }
          }
        }
      },
      target: {
        textContent: 'id'
      }
    } as any;
    const obj2 = {
      target: {
        innerText: 'isNull'
      }
    } as any;
    // simulate on select prop on fields dropdown to make a selection
    act(() => {
      wrapper
        .find('#select-field')
        .first()
        .props()
        ['onSelect'](obj);
    });
    // simulate on toggle prop on fields dropdown
    act(() => {
      wrapper
        .find('#select-field')
        .first()
        .props()
        ['onToggle']();
    });
    // simulate on select on operatore dropdown
    act(() => {
      wrapper
        .find('#select-operator')
        .first()
        .props()
        ['onSelect'](obj2);
    });
    act(() => {
      wrapper
        .find('#select-operator')
        .first()
        .props()
        ['onToggle']();
    });
    const obj3 = {
      target: {
        innerText: ''
      }
    } as any;
    // check if third value input is a dropdown when selected operator is "isNull"
    act(() => {
      wrapper
        .update()
        .find('Dropdown')
        .props()
        ['onSelect'](obj3);
    });
    // stimulate on toggle props on boolean value dropdown
    act(() => {
      wrapper
        .update()
        .find('Dropdown')
        .props()
        ['toggle']['props']['onToggle']();
    });
    wrapper
      .update()
      .find('#button-with-boolean')
      .first()
      .simulate('click');
    wrapper.update();
    expect(wrapper.find('dropdown')).toBeTruthy();
    expect(wrapper.find('#button-with-boolean')).toBeTruthy();
  });
  it('check equal operator on stateSelection', async () => {
    // @ts-ignore
    useGetInputFieldsFromQueryQuery.mockReturnValue({
      loading: false,
      data: {}
    });
    // @ts-ignore
    useGetInputFieldsFromTypeQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          name: 'ProcessInstanceStateArgument',
          inputFields: [
            {
              name: 'equal',
              type: {
                name: 'ProcessInstanceState',
                kind: 'ENUM',
                __typename: '__Type'
              }
            },
            {
              name: 'in',
              type: { name: null, kind: 'LIST', __typename: '__Type' }
            }
          ],
          kind: 'INPUT_OBJECT'
        }
      }
    });
    const wrapper = mount(<DomainExplorerFilterOptions {...defaultProps2} />);
    wrapper.update();
    wrapper.setProps({});
    const obj = {
      nativeEvent: {
        target: {
          parentElement: {
            parentElement: {
              getAttribute: jest.fn(() => 'metadata / processInstances')
            }
          }
        }
      },
      target: { textContent: 'state' }
    } as any;
    const obj2 = {
      target: {
        innerText: 'equal'
      }
    } as any;
    // simulate field dropdown to select "state" field
    act(() => {
      wrapper
        .update()
        .find('#select-field')
        .first()
        .props()
        ['onSelect'](obj);
    });
    // simulate field dropdown to select "equal" operator
    act(() => {
      wrapper
        .update()
        .find('#select-operator')
        .first()
        .props()
        ['onSelect'](obj2);
    });
    const obj3 = {
      target: {
        innerText: 'ACTIVE'
      }
    } as any;
    // simulate value dropdown to select "ACTIVE" state
    act(() => {
      wrapper
        .update()
        .find('#stateSelection')
        .at(0)
        .props()
        ['onSelect'](obj3);
    });
    act(() => {
      wrapper
        .update()
        .find('#stateSelection')
        .at(0)
        .props()
        ['onToggle']();
    });
    wrapper
      .update()
      .find('#stateSelection')
      .at(0)
      .props()['selections'] = 'ACTIVE';
    wrapper
      .update()
      .find('#button-with-stateSelection')
      .first()
      .simulate('click');
    expect(wrapper.find('#stateSelection')).toBeTruthy();
    expect(wrapper.find('#button-with-stateSelection')).toBeTruthy();
  });
  it('check in operator on stateSelection', async () => {
    // @ts-ignore
    useGetInputFieldsFromQueryQuery.mockReturnValue({
      loading: false,
      data: {}
    });
    // @ts-ignore
    useGetInputFieldsFromTypeQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          name: 'ProcessInstanceStateArgument',
          inputFields: [
            {
              name: 'equal',
              type: {
                name: 'ProcessInstanceState',
                kind: 'ENUM',
                __typename: '__Type'
              }
            },
            {
              name: 'in',
              type: { name: null, kind: 'LIST', __typename: '__Type' }
            }
          ],
          kind: 'INPUT_OBJECT'
        }
      }
    });
    const obj = {
      nativeEvent: {
        target: {
          parentElement: {
            parentElement: {
              getAttribute: jest.fn(() => 'metadata / processInstances')
            }
          }
        }
      },
      target: { textContent: 'state' }
    } as any;
    const obj2 = {
      target: {
        innerText: 'in'
      }
    } as any;
    const wrapper = mount(<DomainExplorerFilterOptions {...defaultProps2} />);
    wrapper.update();
    wrapper.setProps({});
    // simulate field dropdown to select "state" field
    act(() => {
      wrapper
        .update()
        .find('#select-field')
        .first()
        .props()
        ['onSelect'](obj);
    });
    // simulate operator dropdown to select "in" operator
    act(() => {
      wrapper
        .update()
        .find('#select-operator')
        .first()
        .props()
        ['onSelect'](obj2);
    });
    const obj3 = {
      target: {
        innerText: ''
      }
    } as any;
    // simulate value dropdown to make multiple state values
    act(() => {
      wrapper
        .update()
        .find('#MultiSelection')
        .at(0)
        .props()
        ['onSelect'](obj3);
    });
    act(() => {
      wrapper
        .update()
        .find('#MultiSelection')
        .at(0)
        .props()
        ['onToggle']();
    });
    wrapper
      .update()
      .find('#button-with-MultiSelection')
      .first()
      .simulate('click');

    expect(wrapper.find('#MultiSelection')).toBeTruthy();
    expect(wrapper.find('#button-with-MultiSelection')).toBeTruthy();
  });
  it('check equal operator on user task stateSelection', async () => {
    const props = {
      reset: false,
      setReset: jest.fn(),
      currentDomain: 'Travels',
      getQuery: {
        loading: false,
        data: {
          __type: {
            name: 'Query',
            fields: [
              {
                name: 'Travels',
                args: [
                  {
                    name: 'where',
                    type: { kind: 'INPUT_OBJECT', name: 'TravelsArgument' }
                  },
                  {
                    name: 'orderBy',
                    type: { kind: 'INPUT_OBJECT', name: 'TravelsOrderBy' }
                  },
                  {
                    name: 'pagination',
                    type: { kind: 'INPUT_OBJECT', name: 'Pagination' }
                  }
                ],
                type: {
                  ofType: { name: 'Travels' }
                }
              }
            ]
          }
        }
      },
      parameters: [
        { flight: ['arrival'] },
        { flight: ['departure'] },
        { flight: ['gate'] },
        {
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
      ],
      setColumnFilters: jest.fn(),
      setTableLoading: jest.fn(),
      setDisplayTable: jest.fn(),
      setDisplayEmptyState: jest.fn(),
      setFilterError: jest.fn(),
      getQueryTypes: {
        loading: false,
        data: {
          __schema: {
            queryType: [
              {
                name: 'AddressArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  {
                    name: 'city',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  },
                  {
                    name: 'country',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  },
                  {
                    name: 'street',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  },
                  {
                    name: 'zipCode',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  }
                ]
              },
              {
                name: 'IdArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  { name: 'id', type: { name: null, kind: 'LIST' } },
                  { name: 'equal', type: { name: 'String', kind: 'SCALAR' } },
                  { name: 'isNull', type: { name: 'Boolean', kind: 'SCALAR' } }
                ]
              },
              {
                name: 'ProcessInstanceMetaArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  {
                    name: 'state',
                    type: {
                      name: 'ProcessInstanceStateArgument',
                      kind: 'INPUT_OBJECT'
                    }
                  }
                ]
              },
              {
                name: 'UserTaskInstanceMetaArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  {
                    name: 'state',
                    type: {
                      name: 'StringArgument',
                      kind: 'INPUT_OBJECT',
                      __typename: '__Type'
                    }
                  }
                ]
              }
            ]
          }
        }
      },
      filterChips: [],
      setFilterChips: jest.fn(),
      runFilter: true,
      setRunFilter: jest.fn(),
      finalFilters: {
        metadata: {
          processInstances: { state: { equal: 'ACTIVE' } }
        },
        trip: {
          country: {
            equal: 'Australia'
          }
        }
      },
      argument: 'TravelsArgument',
      setFinalFilters: jest.fn(),
      getSchema: {
        data: {
          __type: {
            name: 'TravelsArgument',
            inputFields: [
              { name: 'and', type: { name: null, kind: 'LIST' } },
              { name: 'or', type: { name: null, kind: 'LIST' } },
              {
                name: 'flight',
                type: {
                  name: 'FlightArgument',
                  kind: 'INPUT_OBJECT',
                  inputFields: [
                    {
                      name: 'arrival',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'departure',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'flightNumber',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'gate',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'seat',
                      type: {
                        name: 'StringArgument'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    };
    // @ts-ignore
    useGetInputFieldsFromQueryQuery.mockReturnValue({
      loading: false,
      data: {}
    });
    // @ts-ignore
    useGetInputFieldsFromTypeQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          name: 'ProcessInstanceStateArgument',
          inputFields: [
            {
              name: 'equal',
              type: {
                name: 'ProcessInstanceState',
                kind: 'ENUM',
                __typename: '__Type'
              }
            },
            {
              name: 'in',
              type: { name: null, kind: 'LIST', __typename: '__Type' }
            }
          ],
          kind: 'INPUT_OBJECT'
        }
      }
    });
    const obj = {
      nativeEvent: {
        target: {
          parentElement: {
            parentElement: {
              getAttribute: jest.fn(() => 'metadata / userTasks')
            }
          }
        }
      },
      target: { textContent: 'state' }
    } as any;
    const obj2 = {
      target: {
        innerText: 'in'
      }
    } as any;
    const wrapper = mount(<DomainExplorerFilterOptions {...props} />);
    wrapper.update();
    wrapper.setProps({});
    // simulate fields dropdown to select "state" from userTasks
    act(() => {
      wrapper
        .update()
        .find('#select-field')
        .first()
        .props()
        ['onSelect'](obj);
    });
    // simulate operator dropdown to select "in" operator
    act(() => {
      wrapper
        .update()
        .find('#select-operator')
        .first()
        .props()
        ['onSelect'](obj2);
    });
    expect(wrapper.find('#MultiSelection')).toBeTruthy();
    expect(wrapper.find('#button-with-MultiSelection')).toBeTruthy();
  });
  it('test empty parent string', () => {
    // @ts-ignore
    useGetInputFieldsFromQueryQuery.mockReturnValue({
      loading: false,
      data: {}
    });
    // @ts-ignore
    useGetInputFieldsFromTypeQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          name: 'IdArgument',
          inputFields: [
            { name: 'in', type: { name: null, kind: 'LIST' } },
            { name: 'equal', type: { name: 'String', kind: 'SCALAR' } },
            { name: 'isNull', type: { name: 'Boolean', kind: 'SCALAR' } }
          ],
          kind: 'INPUT_OBJECT'
        }
      }
    });
    const wrapper = mount(<DomainExplorerFilterOptions {...defaultProps} />);
    wrapper.update();
    wrapper.setProps({});
    const obj = {
      nativeEvent: {
        target: {
          parentElement: {
            parentElement: {
              getAttribute: jest.fn(() => ' ')
            }
          }
        }
      },
      target: { textContent: 'id' }
    } as any;
    // simulate field operator to test root options which has no parent
    act(() => {
      wrapper
        .find('#select-field')
        .first()
        .props()
        ['onSelect'](obj);
    });
    const obj2 = {
      target: {
        innerText: 'equal'
      }
    } as any;
    act(() => {
      wrapper
        .find('#select-operator')
        .first()
        .props()
        ['onSelect'](obj2);
    });
    wrapper
      .update()
      .find('input')
      .at(1)
      .simulate('change', 'Hello');
    act(() => {
      wrapper
        .find('#button-with-string')
        .at(2)
        .props()['isDisabled'] = false;
      wrapper
        .find('#button-with-string')
        .at(2)
        .props()['disabled'] = false;
      const event = {} as React.MouseEvent<HTMLButtonElement, MouseEvent>;
      wrapper
        .find('#button-with-string')
        .at(2)
        .props()
        ['onClick'](event);
    });
    expect(wrapper.find('input')).toBeTruthy();
    expect(wrapper.find('#button-with-string')).toBeTruthy();
  });
  it('test reset to default', () => {
    const props = {
      setReset: jest.fn(),
      currentDomain: 'Travels',
      getQuery: {
        loading: false,
        data: {
          __type: {
            name: 'Query',
            fields: [
              {
                name: 'Travels',
                args: [
                  {
                    name: 'where',
                    type: { kind: 'INPUT_OBJECT', name: 'TravelsArgument' }
                  },
                  {
                    name: 'orderBy',
                    type: { kind: 'INPUT_OBJECT', name: 'TravelsOrderBy' }
                  },
                  {
                    name: 'pagination',
                    type: { kind: 'INPUT_OBJECT', name: 'Pagination' }
                  }
                ],
                type: {
                  ofType: { name: 'Travels' }
                }
              }
            ]
          }
        }
      },
      parameters: [
        { flight: ['arrival'] },
        { flight: ['departure'] },
        { flight: ['gate'] },
        {
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
      ],
      setColumnFilters: jest.fn(),
      setTableLoading: jest.fn(),
      setDisplayTable: jest.fn(),
      setDisplayEmptyState: jest.fn(),
      setFilterError: jest.fn(),
      getQueryTypes: {
        loading: false,
        data: {
          __schema: {
            queryType: [
              {
                name: 'AddressArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  {
                    name: 'city',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  },
                  {
                    name: 'country',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  },
                  {
                    name: 'street',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  },
                  {
                    name: 'zipCode',
                    type: { name: 'StringArgument', kind: 'INPUT_OBJECT' }
                  }
                ]
              },
              {
                name: 'IdArgument',
                kind: 'INPUT_OBJECT',
                inputFields: [
                  { name: 'id', type: { name: null, kind: 'LIST' } },
                  { name: 'equal', type: { name: 'String', kind: 'SCALAR' } },
                  { name: 'isNull', type: { name: 'Boolean', kind: 'SCALAR' } }
                ]
              }
            ]
          }
        }
      },
      filterChips: ['metadata / processInstances / state: ACTIVE'],
      setFilterChips: jest.fn(),
      runFilter: true,
      setRunFilter: jest.fn(),
      finalFilters: {
        metadata: {
          processInstances: { state: { equal: 'ACTIVE' } }
        },
        trip: {
          country: {
            equal: 'Australia'
          }
        }
      },
      argument: 'TravelsArgument',
      setFinalFilters: jest.fn(),
      getSchema: {
        data: {
          __type: {
            name: 'TravelsArgument',
            inputFields: [
              { name: 'and', type: { name: null, kind: 'LIST' } },
              { name: 'or', type: { name: null, kind: 'LIST' } },
              {
                name: 'flight',
                type: {
                  name: 'FlightArgument',
                  kind: 'INPUT_OBJECT',
                  inputFields: [
                    {
                      name: 'arrival',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'departure',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'flightNumber',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'gate',
                      type: {
                        name: 'StringArgument'
                      }
                    },
                    {
                      name: 'seat',
                      type: {
                        name: 'StringArgument'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      },
      reset: true
    };
    // @ts-ignore
    useGetInputFieldsFromQueryQuery.mockReturnValue({
      loading: false,
      data: {}
    });
    // @ts-ignore
    useGetInputFieldsFromTypeQuery.mockReturnValue({
      loading: false,
      data: {
        __type: {
          name: 'IdArgument',
          inputFields: [
            { name: 'in', type: { name: null, kind: 'LIST' } },
            { name: 'equal', type: { name: 'String', kind: 'SCALAR' } },
            { name: 'isNull', type: { name: 'Boolean', kind: 'SCALAR' } }
          ],
          kind: 'INPUT_OBJECT'
        }
      }
    });
    const wrapper = mount(<DomainExplorerFilterOptions {...props} />);
    wrapper.update();
    wrapper.setProps({});
    const obj = {
      nativeEvent: {
        target: {
          parentElement: {
            parentElement: {
              getAttribute: jest.fn(() => ' ')
            }
          }
        }
      },
      target: { textContent: 'id' }
    } as any;
    // check reset to default sets "id" field on dropdown
    act(() => {
      wrapper
        .find('#select-field')
        .first()
        .props()
        ['onSelect'](obj);
    });
    const obj2 = {
      target: {
        innerText: 'equal'
      }
    } as any;
    // check reset to default sets "equal" operator on dropdown
    act(() => {
      wrapper
        .find('#select-operator')
        .first()
        .props()
        ['onSelect'](obj2);
    });
    wrapper
      .update()
      .find('input')
      .at(1)
      .simulate('change', 'Hello');
    act(() => {
      wrapper
        .find('#button-with-string')
        .at(2)
        .props()['isDisabled'] = false;
      wrapper
        .find('#button-with-string')
        .at(2)
        .props()['disabled'] = false;
      const event = {} as React.MouseEvent<HTMLButtonElement, MouseEvent>;
      wrapper
        .find('#button-with-string')
        .at(2)
        .props()
        ['onClick'](event);
    });
    expect(wrapper.find('input')).toBeTruthy();
  });
});
