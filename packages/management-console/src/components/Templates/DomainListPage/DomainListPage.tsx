import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
    DataToolbar,
    DataToolbarItem,
    DataToolbarContent,
    DataToolbarFilter,
    DataToolbarToggleGroup,
    DataToolbarGroup
} from '@patternfly/react-core/dist/esm/experimental';
import {
    Title,
    Select,
    SelectOption,
    SelectVariant,
    EmptyState,
    EmptyStateIcon,
    EmptyStateBody,
    EmptyStateSecondaryActions,
    Bullseye,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    InputGroup,
    TextInput,
    FormSelect, FormSelectOption, FormSelectOptionGroup,
    Button
} from '@patternfly/react-core';
import { SearchIcon, FilterIcon } from '@patternfly/react-icons';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

const DomainListPage = () => {

    const [filters, setFilters] = useState<any>({
        location: [],
        name: [],
        status: []
    })
    const [currentCategory, setCurrentCategory] = useState('Status');
    const [currentSubCategory, setCurrentSubCategory] = useState('');
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [isFilterDropdownOpen2, setIsFilterDropdownOpen2] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [Ivalue, setIvalue] = useState(2);
    const [initData, setInitData] = useState<any>([])
    const [inputValue, setInputValue] = useState('');
    const [loading1, setLoading] = useState(false);
    const [columns, setColumns] = useState([
        { title: 'Servers' },
        { title: 'Threads' },
        { title: 'Applications' },
        { title: 'Workspaces' },
        { title: 'Status' },
        { title: 'Location' }
    ])
    const [rows, setRows] = useState([
        { cells: ['US-Node 1', '5', '25', '5', 'Stopped', 'Raleigh'] },
        { cells: ['US-Node 2', '5', '30', '2', 'Down', 'Westford'] },
        { cells: ['US-Node 3', '13', '35', '12', 'Degraded', 'Boston'] },
        { cells: ['US-Node 4', '2', '5', '18', 'Needs Maintainence', 'Raleigh'] },
        { cells: ['US-Node 5', '7', '30', '5', 'Running', 'Boston'] },
        { cells: ['US-Node 6', '5', '20', '15', 'Stopped', 'Raleigh'] },
        { cells: ['CZ-Node 1', '12', '48', '13', 'Down', 'Brno'] },
        { cells: ['CZ-Node 2', '3', '8', '20', 'Running', 'Brno'] },
        { cells: ['CZ-Remote-Node 1', '15', '20', '10', 'Down', 'Brno'] },
        { cells: ['Bangalore-Node 1', '20', '30', '30', 'Running', 'Bangalore'] }
    ])
    const onDelete = (type = '', id = '') => {
        if (type) {
            setFilters(prevState => {
                prevState[type.toLowerCase()] = prevState[type.toLowerCase()].filter(s => s !== id);
                return {
                    ...prevState
                };
            });
        } else {
            setFilters({
                location: [],
                name: [],
                status: []
            })
        }
    };

    const GET_ATTR = gql`
    query Categories($currentCategory: String!){
        __type(name: $currentCategory) {
            name
              description
              fields {
              name
              type{
                name
                kind
                ofType {
                    name
                    kind
                }
              }
            }
          }
        }
    `;

    const GET_SUB_ATTR = gql`
    query subCategories($currentSubCategory: String!) {
        __type(name: $currentSubCategory){
            name
            description
            fields {
                name
                type{
                    name
                    kind
                }
            }
        }
    }
    `; 
    
    const resOne = useQuery(GET_ATTR, {
        variables: {currentCategory}
    });

    const resTwo = useQuery(GET_SUB_ATTR, {
        variables: {currentSubCategory}
    })

    {!resOne.loading && resOne.data.__type && console.log('resOne', resOne)}
    {!resTwo.loading && resTwo.data.__type && console.log('resTwo', resTwo)}
    
    useEffect(() => {
        setInitData(resOne.data)
        resOne.data.__type.fields.map(field => setCurrentSubCategory(field.type.ofType.name))
    }, [resOne.data])
    console.log(resTwo.data)
    const onCategoryToggle = isOpen => {
        setIsCategoryDropdownOpen(isOpen)
    };

    const onCategorySelect = event => {
        setCurrentCategory(event.target.innerText)
        setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
    };

    const onFilterToggle = isOpen => {
        setIsFilterDropdownOpen(isOpen);

    };
    const onFilterToggle2 = isOpen => {
        setIsFilterDropdownOpen2(isOpen);

    };

    const onFilterSelect = event => {
        setIsFilterDropdownOpen(!isFilterDropdownOpen);
    };

    const onInputChange = newValue => {
        setInputValue(newValue);
    };

    const onRowSelect = (event, isSelected, rowId) => {
        let rows;
        if (rowId === -1) {
            rows = rows.map(oneRow => {
                oneRow.selected = isSelected;
                return oneRow;
            });
        } else {
            rows = [...rows];
            rows[rowId].selected = isSelected;
        }
        this.setState({
            rows
        });
    };

    const onStatusSelect = (event, selection) => {
        const checked = event.target.checked;
        setFilters(prevState => {
            const prevSelections = prevState['status'];
            return {
                ...prevState,
                ['status']: checked ? [...prevSelections, selection] : prevSelections.filter(value => value !== selection)
            }
        });
    };

    const onNameInput = event => {
        if (event.key && event.key !== 'Enter') {
            return;
        }
        setFilters(prevState => {
            const prevFilters = prevState['name'];
            return {
                ...prevState,
                ['name']: prevFilters.includes(inputValue)
                    ? prevFilters.filter(value => value !== inputValue)
                    : [...prevFilters, inputValue]
            };
        });
    };

    const onLocationSelect = (event, selection) => {
        const filter = initData.__type.fields.filter((field) => {
            if(field.name === selection){
                return field;
            }
        })
        setCurrentSubCategory(filter[0].type.ofType.name)
        // setFilters(prevState => {
        //     return {
        //         ...prevState,
        //         ['location']: [selection]
        //     }
        // });
        // onFilterSelect(event);
    };
    const buildCategoryDropdown = () => {
        return (
            <DataToolbarItem>
                <Dropdown
                    onSelect={onCategorySelect}
                    position='left'
                    toggle={
                        <DropdownToggle onToggle={onCategoryToggle} style={{ width: '100%' }}>
                            <FilterIcon /> {currentCategory}
                        </DropdownToggle>
                    }
                    isOpen={isCategoryDropdownOpen}
                    dropdownItems={
                        [
                            <DropdownItem key="cat1">Travel</DropdownItem>,
                            <DropdownItem key="cat2">Visa application</DropdownItem>,
                        ]
                    }
                    style={{ width: '100%' }}
                />
            </DataToolbarItem>
        );
    }
    const onChange = () => {
        setIvalue(Ivalue)
    }
    const buildFilterDropdown = () => {
        // const schemaMenuItems = [];
        // const fieldMenuItems = [];
        const schemaMenuItems =
        <FormSelect value="any" onChange={onChange} aria-label="FormSelect Input">
        {!resOne.loading && resOne.data.__type && resOne.data.__type.fields.map((group, index) => (
          <FormSelectOptionGroup isDisabled={group.disabled} key={index} label={group.name}>
            {!resTwo.loading && resTwo.data.__type && resTwo.data.__type.fields.map((option, i) => (
              <FormSelectOption isDisabled={option.disabled} key={i} value={option.name} label={option.name} />
            ))}
          </FormSelectOptionGroup>
        ))}
        </FormSelect>
        // const schemaMenuItems = !resOne.loading && resOne.data.__type && resOne.data.__type.fields.map(type => (
        //     <SelectOption key={type.name} value={type.name} /> )) || [];

        //     const fieldMenuItems = !resTwo.loading && resTwo.data.__type && resTwo.data.__type.fields.map(type => {
        //         console.log(type)
        //         if(!resTwo.loading) {
        //             return <SelectOption key={type.name} value={type.name} />
        //         }
        //     }) || [];
        //     console.log('fieldMenu', fieldMenuItems)


        const statusMenuItems = [
            <SelectOption key="statusRunning" value="Running" />,
            <SelectOption key="statusStopped" value="Stopped" />,
            <SelectOption key="statusDown" value="Down" />,
            <SelectOption key="statusDegraded" value="Degraded" />,
            <SelectOption key="statusMaint" value="Needs Maintainence" />
        ];

        return (
            <React.Fragment>
                {!resOne.loading && !resTwo.loading && currentCategory === 'Travel' && <DataToolbarFilter
                    chips={filters.location}
                    deleteChip={onDelete}
                    categoryName="Travel"
                >
                    {/* <Select
                        aria-label="Location"
                        onToggle={onFilterToggle}
                        onSelect={onLocationSelect}
                        selections={filters.location[0]}
                        isExpanded={isFilterDropdownOpen}
                        placeholderText="Select types"
                    > */}
                        {schemaMenuItems}
                    {/* </Select> */}
                </DataToolbarFilter>}
            </React.Fragment>
        );
    }
    const renderToolbar = () => {
        return (
            <DataToolbar
                id="data-toolbar-with-chip-groups"
                clearAllFilters={onDelete}
                collapseListedFiltersBreakpoint="xl"
            >
                <DataToolbarContent>
                    <DataToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
                        <DataToolbarGroup variant="filter-group">
                            {buildCategoryDropdown()}
                            {buildFilterDropdown()}
                        </DataToolbarGroup>
                    </DataToolbarToggleGroup>
                </DataToolbarContent>
            </DataToolbar>
        );
    }

    const filteredRows =
        filters.name.length > 0 || filters.location.length > 0 || filters.status.length > 0
            ? rows.filter(row => {
                return (
                    (filters.name.length === 0 || filters.name.some(name => row.cells[0].toLowerCase().includes(name.toLowerCase()))) &&
                    (filters.location.length === 0 || filters.location.includes(row.cells[5])) &&
                    (filters.status.length === 0 || filters.status.includes(row.cells[4]))
                );
            })
            : rows;
    return (
        <React.Fragment>
            {renderToolbar()}
            {!resOne.loading && !resTwo.loading && !loading1 && filteredRows.length > 0 && (
                <Table cells={columns} rows={filteredRows} onSelect={onRowSelect} aria-label="Filterable Table Demo">
                    <TableHeader />
                    <TableBody />
                </Table>
            )}
            {!resOne.loading && !resTwo.loading && !loading1 && filteredRows.length === 0 && (
                <React.Fragment>
                    <Table cells={columns} rows={filteredRows} onSelect={onRowSelect} aria-label="Filterable Table Demo">
                        <TableHeader />
                        <TableBody />
                    </Table>
                    <Bullseye>
                        <EmptyState>
                            <EmptyStateIcon icon={SearchIcon} />
                            <Title headingLevel="h5" size="lg">
                                No results found
                </Title>
                            <EmptyStateBody>
                                No results match this filter criteria. Remove all filters or clear all filters to show results.
                </EmptyStateBody>
                            <EmptyStateSecondaryActions>
                                <Button variant="link" onClick={() => onDelete(null)}>
                                    Clear all filters
                  </Button>
                            </EmptyStateSecondaryActions>
                        </EmptyState>
                    </Bullseye>
                </React.Fragment>
            )}
            {resOne.loading && resTwo.loading && loading1 && (
                <Title size="3xl">Please wait while loading1 data</Title>
            )}
        </React.Fragment>
    )
}

export default DomainListPage;