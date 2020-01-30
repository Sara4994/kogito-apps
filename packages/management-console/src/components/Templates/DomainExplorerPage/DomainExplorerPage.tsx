import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  DataToolbar,
  DataToolbarContent,
  DataToolbarToggleGroup,
  DataToolbarGroup,
  DataToolbarFilter
} from '@patternfly/react-core/dist/esm/experimental';
import {
  Select,
  SelectOption,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  TextInput,
  SelectGroup,
  SelectVariant,
  Grid,
  GridItem,
  PageSection,
  Button,
  Bullseye,
  Chip,
  ChipGroup,
  ChipGroupToolbarItem
} from '@patternfly/react-core';
import { FilterIcon, CommentsDollarIcon } from '@patternfly/react-icons';
import * as gql from 'gql-query-builder';
import _ from 'lodash';
import axios from 'axios';

import DomainExplorerColumnPicker from '../../Organisms/DomainExplorerColumnPicker/DomainExplorerColumnPicker';
import DomainExplorerTable from '../../Organisms/DomainExplorerTable/DomainExplorerTable';
import SpinnerComponent from '../../Atoms/SpinnerComponent/SpinnerComponent';
import './DomainExplorerPage.css';

import {
  useGetQueryTypesQuery,
  useGetQueryQuery,
  useGetSchemaQuery,
  useGetTypesQuery
} from '../../../graphql/types';

const DomainExplorerPage = () => {
  const [initData2, setInitData2] = useState<any>({
    __schema: { queryType: [] }
  });
  const [schemaDropdown, setSchemaDropDown] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('Query');
  const [currentArgument, setCurrentArgument] = useState('');
  const [currentArgumentScalar, setCurrentArgumentScalar] = useState('');
  const [currentSchema, setCurrentSchema] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectTypes, setSelectTypes] = useState('');
  const [typesDropdown, setTypesDropdown] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [columnPickerType, setColumnPickerType] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [columnFilters, setColumnFilters] = useState({});
  const [tableLoading, setTableLoading] = useState(true);
  const [FilterLoading, setFilterLoading] = useState(true);
  const [schemaChips, setSchemaChips] = useState([]);
  const [typeChips, setTypeChips] = useState([]);
  const [textValue, setTextValue] = useState('');
  const [typeParent, setTypeParent] = useState('');
  const [pickedColumns, setPickedColumns] = useState([]);
  const [pickedColumnsData, setPickedColumnsData] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const [displayChips, setDisplayChips] = useState(false);
  const [filters, setFilters] = useState([]);
  const [tempObj, setTempObj] = useState<any>({});

  const temp = [];
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

  const getQuery = useGetQueryQuery();

  const getQueryTypes = useGetQueryTypesQuery();

  useEffect(() => {
    setInitData2(getQueryTypes.data);
  }, [getQueryTypes.data]);

  const getSchema: any = useGetSchemaQuery({
    variables: { currentQuery }
  });

  useEffect(() => {
    setCurrentSchema(temp);
  }, [getSchema.data]);

  const samp =
    !getQueryTypes.loading &&
    !getSchema.loading &&
    initData2.__schema.queryType.filter(item =>
      currentSchema.includes(item.name)
    );

  const getTypes = useGetTypesQuery({
    variables: { currentArgument }
  });

  const onCategoryToggle = _isOpen => {
    setIsCategoryDropdownOpen(_isOpen);
  };

  const onDeleteSchemaChip = (event, selection) => {
    setSchemaChips(prev => prev.filter(s => s !== selection));
    setSelected('');
  };

  const onDeleteTypeChip = () => {
    setTypeChips([]);
    setSelectTypes('');
  };

  const clearAllFilters = () => {
    setSchemaChips([]);
    setTypeChips([]);
    setSelectTypes('');
    setSelected('');
    setCurrentCategory('Query');
    setSchemaDropDown(false);
    setTypesDropdown(false);
  };

  const onCategorySelect = event => {
    setCurrentCategory(event.target.innerText);
    const tempChip = [];
    tempChip.push(event.target.innerText);
    const _a =
      !getQuery.loading &&
      getQuery.data.__type.fields.find(item => {
        if (item.name === event.target.innerText) {
          return item;
        }
      });
    setCurrentQuery(_a.args[0].type.name);
    setColumnPickerType(_a.type.ofType.name);
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    setSchemaDropDown(true);
  };

  const onChange = (event, selection) => {
    setTypesDropdown(true);
    setSelected(selection);
    !schemaChips.includes(selection) &&
      setSchemaChips(prev => [...prev, selection]);
    const parent = event.nativeEvent.target.parentElement.parentElement.getAttribute(
      'value'
    );
    setTypeParent(parent);
    const x = samp.find(item =>
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

  const onToggle = _isOpen => {
    setIsFilterDropdownOpen(_isOpen);
  };

  const onFieldToggle = _isExpanded => {
    setIsExpanded(_isExpanded);
  };

  const onSelect = event => {
    setSelectTypes(event.target.innerText);
    const _temp = event.target.innerText;
    setTypeChips([_temp]);
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

  const onToggleBoolean = _isOpen => {
    setIsOpen(_isOpen);
  };

  const onSelectBoolean = event => {
    setIsOpen(!isOpen);
  };

  const textBoxChange = value => {
    setTextValue(value);
  };

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

  const tempObject: any = {};

  useEffect(() => {
    async function genQuery() {
      const Query = gql.query({
        operation: columnPickerType,
        fields: ['id'],
        variables: { where: { value: tempObj, type: currentQuery } }
      });

      try {
        await axios
          .post(
            'http://localhost:4000/graphql',
            gql.query({
              operation: columnPickerType,
              fields: ['id'],
              variables: { where: { value: tempObj, type: currentQuery } }
            })
          )
          .then(res => {
            setPickedColumnsData(res.data.data);
            setFilterLoading(false);
          });
      } catch (error) {
        return error;
      }
    }
    displayChips && genQuery();
  }, [tempObj]);

  const onApplyFilter = async () => {
    const chipsArray = [];

    setDisplayChips(true);
    chipsArray.push(typeParent, selected, selectTypes, textValue);
    tempObject.chips = chipsArray;
    setFilters(prevState => [...prevState, tempObject]);

    const n = `${typeParent}.${selected}.${selectTypes}`;
    set(obj, n, textValue);
    setTempObj(() => {
      if (tempObj.hasOwnProperty(typeParent)) {
        const te: any = Object.values(obj)[0];
        tempObj[typeParent] = { ...tempObj[typeParent], ...te };
        return tempObj;
      } else {
        return { ...tempObj, ...obj };
      }
    });
  };

  let colsTemp: any = [];
  const tableRows: any = [];
  let rows = [];
  const rowObject: any = {};
  const temps: any = {};
  useEffect(() => {
    const firstKey = Object.keys(pickedColumnsData)[0];
    const tableContent = pickedColumnsData[firstKey];

    if (tableContent) {
      const tableObjects: any = [];
      tableContent.filter(items => tableObjects.push(Object.values(items)));
      const tableData = tableObjects.flat();
      tableData.filter(item => {
        colsTemp.push(Object.keys(item));
        temps.cells = Object.values(item);
        tableRows.push(temps);
      });
      colsTemp = colsTemp[0];
      if (FilterLoading) {
        rowObject.cells = [
          {
            props: { colSpan: 8 },
            title: (
              <Bullseye>
                <SpinnerComponent spinnerText="Loading Domain Explorer..." />
              </Bullseye>
            )
          }
        ];
        rows.push(rowObject);
      } else {
        rows = tableRows;
      }
    }
    // console.log('rows', rows);
    // console.log('cols', colsTemp);
  }, [pickedColumnsData]);
  const buildCategoryDropdown = () => {
    const queryDropDown =
      !getQuery.loading && getQuery.data.__type.fields.slice(2);
    const dropdownItems =
      !getQuery.loading &&
      queryDropDown.map((item, index) => (
        <DropdownItem key={index}>{item.name}</DropdownItem>
      ));
    return (
      <DataToolbarFilter categoryName="Category">
        <Dropdown
          onSelect={onCategorySelect}
          position="left"
          toggle={
            <DropdownToggle
              onToggle={onCategoryToggle}
              style={{ width: '100%' }}
            >
              <FilterIcon /> {currentCategory}
            </DropdownToggle>
          }
          isOpen={isCategoryDropdownOpen}
          dropdownItems={dropdownItems}
          style={{ width: '100%' }}
        />
      </DataToolbarFilter>
    );
  };

  const buildFilterDropdown = () => {
    !getSchema.loading &&
      getSchema.data.__type &&
      getSchema.data.__type.inputFields.map((field, index) => {
        if (field.type.kind !== 'LIST') {
          temp.push(field.type.name);
        }
      });

    const typesMenuItems =
      !getTypes.loading &&
      getTypes.data.__type &&
      getTypes.data.__type.inputFields.map((data, index) => (
        <SelectOption key={index} value={data.name} />
      ));
    let v: any = [];
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
                          v = item;
                        }
                      });
                    return (
                      <SelectGroup
                        key={i}
                        label={option.name}
                        value={option.name}
                      >
                        {v.inputFields.map((field, _i) => {
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

    return (
      <React.Fragment>
        {schemaDropdown
          ? !getSchema.loading && (
              <DataToolbarFilter
                chips={schemaChips}
                deleteChip={onDeleteSchemaChip}
                categoryName="Schema"
              >
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
                </Select>
              </DataToolbarFilter>
            )
          : ''}

        {!getTypes.loading && typesDropdown && (
          <DataToolbarFilter
            chips={typeChips}
            deleteChip={onDeleteTypeChip}
            categoryName="Types"
          >
            <Select
              aria-label="Location"
              onToggle={onToggle}
              onSelect={onSelect}
              selections={selectTypes}
              isExpanded={isFilterDropdownOpen}
              placeholderText="Types"
            >
              {typesMenuItems}
            </Select>
          </DataToolbarFilter>
        )}

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
      </React.Fragment>
    );
  };

  const renderToolbar = () => {
    return (
      <Grid>
        <GridItem span={columnPickerType ? 9 : 12}>
          <DataToolbar
            id="data-toolbar-with-chip-groups"
            className="pf-m-toggle-group-container"
            collapseListedFiltersBreakpoint="xl"
            clearAllFilters={clearAllFilters}
          >
            <DataToolbarContent>
              <DataToolbarToggleGroup
                toggleIcon={<FilterIcon />}
                breakpoint="xl"
              >
                <DataToolbarGroup variant="filter-group">
                  {buildCategoryDropdown()}
                  {buildFilterDropdown()}
                </DataToolbarGroup>
              </DataToolbarToggleGroup>
            </DataToolbarContent>
          </DataToolbar>
        </GridItem>
        <GridItem span={3} rowSpan={2} style={{ backgroundColor: 'white' }}>
          {!getSchema.loading && (
            <DomainExplorerColumnPicker
              columnPickerType={columnPickerType}
              setColumnFilters={setColumnFilters}
              setTableLoading={setTableLoading}
              getQueryTypes={getQueryTypes}
              setDisplayTable={setDisplayTable}
            />
          )}
        </GridItem>
      </Grid>
    );
  };
  const deleteCategory = () => {
    return null;
  };
  const deleteItem = () => {
    return null;
  };

  // console.log('before return', filters)
  return (
    <PageSection isFilled>
      <Grid>
        <GridItem span={12}>{renderToolbar()}</GridItem>
        <GridItem span={12}>
          {displayChips && (
            <ChipGroup withToolbar className="chipToolBar">
              {filters.map(filter => {
                return (
                  <ChipGroupToolbarItem
                    key={Math.random()}
                    categoryName=""
                    onClick={() => deleteCategory()}
                    className="chipToolBar"
                  >
                    {filter.chips.map(chip => (
                      <Chip key={chip} onClick={() => deleteItem()}>
                        {chip}
                      </Chip>
                    ))}
                  </ChipGroupToolbarItem>
                );
              })}
            </ChipGroup>
          )}
        </GridItem>
        <GridItem span={12}>
          <DomainExplorerTable
            columnFilters={columnFilters}
            tableLoading={tableLoading}
            displayTable={displayTable}
          />
        </GridItem>
      </Grid>
    </PageSection>
  );
};

export default React.memo(DomainExplorerPage);
