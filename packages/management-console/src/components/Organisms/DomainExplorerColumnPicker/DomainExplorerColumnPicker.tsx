import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Select,
  SelectOption,
  SelectVariant,
  SelectGroup,
  Button,
  Grid,
  GridItem
} from '@patternfly/react-core';
import { query } from 'gql-query-builder';
import axios from 'axios';

import { useGetPickerQuery } from '../../../graphql/types';

export interface IOwnProps {
  columnPickerType: any;
  setColumnFilters: any;
  setTableLoading: any;
  setPickedColumns: any;
  getQueryTypes: any;
  setDisplayTable: any;
}

const DomainExplorerColumnPicker: React.FC<IOwnProps> = ({
  columnPickerType,
  setColumnFilters,
  setTableLoading,
  setPickedColumns,
  getQueryTypes,
  setDisplayTable
}) => {
  const [selected, setSelected] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [parameters, setParameters] = useState([]);

  const fieldObject: any = {};
  const nullTypes = [null, 'String', 'Boolean', 'Int', 'DateTime'];
  const onSelect = (event, selection) => {
    if (selected.includes(selection)) {
      setSelected(prevState => prevState.filter(item => item !== selection));
    } else {
      setSelected(prevState => [...prevState, selection]);
    }
    filterColumnSelection(event, selection);
  };

  const filterColumnSelection = (event, selection) => {
    const parent = event.nativeEvent.target.parentElement.parentElement.getAttribute(
      'aria-labelledby'
    );
    let res = {};
    const tempParents = parent.split('-');

    for (let i = tempParents.length - 1; i >= 0; i--) {
      if (i === tempParents.length - 1) {
        res = { [tempParents[i]]: [selection] }; // assign the value
      } else {
        res = { [tempParents[i]]: [res] }; // put the prev object
      }
    }

    fieldObject.value = Object.create({ parent });
    fieldObject.value[parent] = [selection];
    setParameters(prevState => [...prevState, res]);
    setPickedColumns(prevState => [...prevState, res]);
  };
  const onToggle = _isExpanded => {
    setIsExpanded(_isExpanded);
  };

  const getPicker = useGetPickerQuery({
    variables: { columnPickerType }
  });

  async function sampleQuery() {
    try {
      await axios
        .post(
          'http://localhost:4000/graphql',
          query({
            operation: columnPickerType,
            fields: parameters
          })
        )
        .then(response => {
          setTableLoading(false);
          setColumnFilters(response.data.data);
          setDisplayTable(true);
          return response;
        });
    } catch (error) {
      return error;
    }
  }

  const data = [];
  !getPicker.loading &&
    getPicker.data.__type &&
    getPicker.data.__type.fields.filter(i => {
      if (i.type.kind !== 'SCALAR') {
        return data.push(i);
      }
    });
  const fetchSchema = option => {
    return (
      !getQueryTypes.loading &&
      getQueryTypes.data.__schema &&
      getQueryTypes.data.__schema.queryType.find(item => {
        if (item.name === option.type.name) {
          return item;
        }
      })
    );
  };

  let b;
  let finalResult: any = [];
  let a: any;

  const childSelectionItems = (_data, title, ...attr) => {
    let nestedTitles = '';
    b = _data.map(group => {
      const label = title + '-' + attr.join();
      const childEle = (
        <SelectGroup
          label={label.replace(/\,/g, '')}
          key={Math.random()}
          id={group.name}
          value={title + group.name}
        >
          {group.fields
            .filter((item, _index) => {
              if (!nullTypes.includes(item.type.name)) {
                const tempData = [];
                const n = fetchSchema(item);
                tempData.push(n);
                nestedTitles = nestedTitles + '-' + item.name;
                childSelectionItems(tempData, title, attr, nestedTitles);
              } else {
                return item;
              }
            })
            .map(item => (
              <SelectOption key={Math.random()} value={item.name} />
            ))}
        </SelectGroup>
      );
      return childEle;
    });
    finalResult.push(b);
  };

  const selectionItems = _data => {
    a =
      !getPicker.loading &&
      _data.map((group, index) => {
        const ele = (
          <SelectGroup
            label={group.name}
            key={index}
            id={group.name}
            value={group.name}
          >
            {group.type.fields &&
              group.type.fields
                .filter((item, _index) => {
                  if (!nullTypes.includes(item.type.name)) {
                    const tempData = [];
                    const _v = fetchSchema(item);
                    tempData.push(_v);
                    childSelectionItems(tempData, group.name, item.name);
                  } else {
                    return item;
                  }
                })
                .map((item, _index) => (
                  <SelectOption key={_index} value={item.name} />
                ))}
          </SelectGroup>
        );
        !finalResult.includes(ele) && finalResult.push(ele);
      });
  };
  columnPickerType && selectionItems(data);

  finalResult = finalResult.flat();

  function getAllChilds(arr, comp) {
    const unique = arr
      .map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e])
      .map(e => arr[e]);

    return unique;
  }
  return (
    <React.Fragment>
      {!getPicker.loading && columnPickerType && (
        <Grid style={{ padding: '16px 16px' }}>
          <GridItem span={5}>
            <Button variant="primary" onClick={sampleQuery}>
              Apply Columns
            </Button>
          </GridItem>
          <GridItem span={7}>
            <Select
              variant={SelectVariant.checkbox}
              aria-label="Select Input"
              onToggle={onToggle}
              onSelect={onSelect}
              selections={selected}
              isExpanded={isExpanded}
              placeholderText="Pick Columns"
              ariaLabelledBy="Column Picker dropdown"
              isGrouped
              maxHeight="60vh"
            >
              {getAllChilds(finalResult, 'props')}
            </Select>
          </GridItem>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default React.memo(DomainExplorerColumnPicker);
