import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectVariant,
    SelectGroup,
    SelectOption,
    TextInput,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownItem
} from '@patternfly/react-core';
import {
    useGetQueryTypesQuery,
    useGetQueryFieldsQuery,
    useGetInputFieldsFromQueryQuery,
    useGetInputFieldsFromTypeQuery,
    useGetColumnPickerAttributesQuery
} from '../../../graphql/types';
import gql from 'graphql-tag';
import {query, mutation} from 'gql-query-builder';
import { useApolloClient } from 'react-apollo';
import './DomainExplorerFilterOptions.css';
import axios from 'axios';

const DomainExplorerFilterOptions = ({ currentDomain, getQuery, parameters }) => {
    const client = useApolloClient();
    const [initData2, setInitData2] = useState<any>({
        __schema: { queryType: [] }
    });
    const [columnPickerType, setColumnPickerType] = useState('');
    const [requiredArgs, setRequiredArgs] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [selected, setSelected] = useState('');
    const [selectTypes, setSelectTypes] = useState('');
    const [textValue, setTextValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currentArgument, setCurrentArgument] = useState('');
    const [currentArgumentScalar, setCurrentArgumentScalar] = useState('');
    const [typeParent, setTypeParent] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const nullTypes = [
        null,
        'String',
        'Boolean',
        'StringArgument',
        'DateArgument',
        'IdArgument',
        'BooleanArgument',
        'NumericArgument',
        'DateRange',
        'NumericRange'
    ];
    const temp = []

    const domainArg =
        !getQuery.loading &&
        getQuery.data.__type.fields.find(item => {
            if (item.name === currentDomain) {
                return item;
            }
        });

    const getQueryTypes = useGetQueryTypesQuery();

    useEffect(() => {
        setInitData2(getQueryTypes.data);
    }, [getQueryTypes.data]);

    const getSchema = useGetInputFieldsFromQueryQuery({
        variables: {
            currentQuery: domainArg.args[0].type.name 
        }
    })
    !getSchema.loading &&
        getSchema.data.__type &&
        getSchema.data.__type.inputFields.map((field, index) => {
            if (field.type.kind !== 'LIST') {
                temp.push(field.type.name);
            }
        });

    useEffect(() => {
        setRequiredArgs(temp);
    }, [getSchema.data]);

    const filteredArgs =
        !getQueryTypes.loading &&
        !getSchema.loading &&
        initData2.__schema.queryType.filter(item =>
            requiredArgs.includes(item.name)
        );


    const onChange = (event, selection) => {
        setSelected(selection);
        const parent = event.nativeEvent.target.parentElement.parentElement.getAttribute(
            'value'
        );
        setTypeParent(parent);
        const x = filteredArgs.find(item =>
            item.inputFields.find(option => {
                if (option.name === selection) {
                    return option;
                }
            })
        );
        const y = x.inputFields.find(data => {
            if (data.name === selection) {
                return data;
            }
        });
        if (y.type.kind === 'INPUT_OBJECT') {
            setCurrentArgument(y.type.name);
        } else {
            setCurrentArgumentScalar(y.type.name);
        }
        setIsExpanded(false);
    };

    const onFieldToggle = _isExpanded => {
        setIsExpanded(_isExpanded);
    };


    let elements: any = [];
    const options =
        !getSchema.loading &&
        getSchema.data.__type &&
        getSchema.data.__type.inputFields
            .filter((group, index) => {
                if (group.type.name !== null) {
                    return group;
                }
            })
            .map((group, index) => {
                return (
                    <SelectGroup label={group.name} key={index} value={group.name}>
                        {group.type.inputFields &&
                            group.type.inputFields.map((option, i) => {
                                if (!nullTypes.includes(option.type.name)) {
                                    !getQueryTypes.loading &&
                                        getQueryTypes.data.__schema &&
                                        getQueryTypes.data.__schema.queryType.find(item => {
                                            if (item.name === option.type.name) {
                                                elements = item;
                                            }
                                        });
                                    return (
                                        <SelectGroup
                                            key={i}
                                            label={option.name}
                                            value={option.name}
                                        >
                                            {elements.inputFields.map((field, _i) => {
                                                return <SelectOption key={_i} value={field.name} />;
                                            })}
                                        </SelectGroup>
                                    );
                                } else {
                                    return <SelectOption key={i} value={option.name} />;
                                }
                            })}
                    </SelectGroup>
                );
            });


    //Second dropdown

    const getTypes = useGetInputFieldsFromTypeQuery({
        variables: {
            type: currentArgument
        }
    })

    const onToggle = _isOpen => {
        setIsFilterDropdownOpen(_isOpen);
    };

    const onSelect = event => {
        setSelectTypes(event.target.innerText);
        const _temp = event.target.innerText;
        // setTypeChips([_temp]);
        setIsFilterDropdownOpen(false);
        const typeName =
            getTypes.data.__type &&
            getTypes.data.__type.inputFields.find(item => {
                if (item.name === event.target.innerText) {
                    return item;
                }
            });
        setCurrentArgumentScalar(typeName.type.name);
    };

    const typesMenuItems =
        !getTypes.loading &&
        getTypes.data.__type &&
        getTypes.data.__type.inputFields.map((data, index) => (
            <SelectOption key={index} value={data.name} />
        ));

    // Third dropdown

    const textBoxChange = value => {
        setTextValue(value);
    };

    const onSelectBoolean = event => {
        setIsOpen(!isOpen);
    };

    const onToggleBoolean = _isOpen => {
        setIsOpen(_isOpen);
    };

    const dropdownItems = [
        <DropdownItem key="true" component="button">
            {' '}
            true{' '}
        </DropdownItem>,
        <DropdownItem key="false" component="button">
            {' '}
            false{' '}
        </DropdownItem>
    ];


    // Generate Query

    const obj: any = {};
    const set = (_obj, path, val) => {
        const keys = path.split('.');
        const lastKey = keys.pop();
        // tslint:disable-next-line: no-shadowed-variable
        const lastObj = keys.reduce(
            // tslint:disable-next-line: no-shadowed-variable
            (_obj, key) => (_obj[key] = _obj[key] || {}),
            _obj
        );
        lastObj[lastKey] = val;
    };

    const onApplyFilter = async () => {
        const n = `${typeParent}.${selected}.${selectTypes}`;
        set(obj, n, textValue);
        const arg = 'TravelsArgument';
        try {
            const Query = query({
                operation: currentDomain,
                variables: { where: { value: obj, type: arg } },
                fields: parameters
            })
            await client
          .query({
            query: gql`
              ${Query.query}
            `,
            variables: Query.variables,
            fetchPolicy: 'no-cache'
          })
                .then(res => {
                    setFilteredData(res.data);
                });
        } catch (error) {
            return error;
        }
    };

    return (
        <>
            {!getSchema.loading && (
            <Select
                variant={SelectVariant.single}
                onToggle={onFieldToggle}
                onSelect={onChange}
                selections={selected}
                isExpanded={isExpanded}
                placeholderText="Select a field"
                ariaLabelledBy="Select a field"
                maxHeight="60vh"
                isGrouped
            >
                {options}
            </Select>)}
            {!getTypes.loading && (
                <Select
                    aria-label="Location"
                    onToggle={onToggle}
                    onSelect={onSelect}
                    selections={selectTypes}
                    isExpanded={isFilterDropdownOpen}
                    placeholderText="Types"
                >
                    {typesMenuItems}
                </Select>)}
            {selectTypes.length > 0 && currentArgumentScalar === 'String' && (
                <>
                    <TextInput
                        type="text"
                        aria-label="text input example"
                        onChange={textBoxChange}
                    />
                    <Button variant="primary" onClick={onApplyFilter}>
                        Apply Filter
                    </Button>
                </>
            )}
            {selectTypes.length > 0 && currentArgumentScalar === 'Boolean' && (
                <>
                    <Dropdown
                        onSelect={onSelectBoolean}
                        toggle={
                            <DropdownToggle id="toggle-id" onToggle={onToggleBoolean}>
                                Boolean
                            </DropdownToggle>
                        }
                        isOpen={isOpen}
                        dropdownItems={dropdownItems}
                    />
                    <Button variant="primary" onClick={onApplyFilter}>
                        Apply Filter
                    </Button>
                </>
            )}
        </>
    )
}

export default DomainExplorerFilterOptions