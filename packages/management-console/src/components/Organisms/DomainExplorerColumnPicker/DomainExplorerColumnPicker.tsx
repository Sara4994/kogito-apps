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

import { GET_PICKER } from './Queries';

export interface IOwnProps {
  columnPickerType: any;
  setColumnFilters: any;
}

const DomainExplorerColumnPicker: React.FC<IOwnProps> = ({
  columnPickerType,
  setColumnFilters
}) => {
  const [selected, setSelected] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [parameters, setParameters] = useState([]);

  //   const [child, setChild] = useState([])
  const fieldObject: any = {};

  const onSelect = (event, selection) => {
    //   console.log('selection', selection)
    //   console.log('event', event) //event.nativeEvent.target.parentElement.parentElement.getAttribute('aria-labelledby')
    if (selected.includes(selection)) {
      setSelected(prevState => prevState.filter(item => item !== selection));
    } else {
      setSelected(prevState => [...prevState, selection]);
    }
    filterColumnSelection(event, selection);
  };
  //   console.log('selected', selected);
  const filterColumnSelection = (event, selection) => {
    const parent = event.nativeEvent.target.parentElement.parentElement.getAttribute(
      'aria-labelledby'
    );
    fieldObject.value = Object.create({ parent });
    fieldObject.value[parent] = [selection];
    // fields.push(fieldObject.value)
    setParameters(prevState => [...prevState, fieldObject.value]);
  };
  const onToggle = _isExpanded => {
    setIsExpanded(_isExpanded);
  };

  //   let user = ["id",{"traveller":["nationality"]},{"traveller":["firstName"]},{"hotel": ["address"]}]
  const getPicker = useQuery(GET_PICKER, {
    variables: { columnPickerType }
  });
  async function sampleQuery() {
    try {
      const response = await axios.post(
        'http://localhost:4000/graphql',
        query({
          operation: columnPickerType,
          fields: parameters
        })
      );
      // console.log('response', response);

      setColumnFilters(response.data.data);
      return response;
    } catch (error) {
      //   console.log('error', error);
    }
  }

  // user.find([{"traveller":["nationality", "firstName"]}])
  // console.log('user', user.bodyS)
  const data = [];
  !getPicker.loading &&
    getPicker.data.__type &&
    getPicker.data.__type.fields.filter(i => {
      if (i.type.kind !== 'SCALAR') {
        return data.push(i);
      }
    });

  const selectionItems =
    !getPicker.loading &&
    data.map((group, index) => {
      return (
        <SelectGroup label={group.name} key={index}>
          {group.type.fields &&
            group.type.fields.map((item, _index) => {
              return <SelectOption key={_index} value={item.name} />;
            })}
        </SelectGroup>
      );
    });
  // console.log('filters', filters)

  return (
    <React.Fragment>
      {!getPicker.loading && columnPickerType && (
        <Grid>
          <GridItem span={3}>
            <Button variant="primary" onClick={sampleQuery}>
              Filter
            </Button>
          </GridItem>
          <GridItem span={9}>
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
              style={{ maxHeight: '80vh', overflow: 'scroll' }}
              maxHeight="60vh"
            >
              {selectionItems}
            </Select>
          </GridItem>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default React.memo(DomainExplorerColumnPicker);
