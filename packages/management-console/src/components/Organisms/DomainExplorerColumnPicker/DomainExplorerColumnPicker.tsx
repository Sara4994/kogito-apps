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

import { GET_PICKER } from '../../../graphql/queries';

export interface IOwnProps {
  columnPickerType: any;
  setColumnFilters: any;
  setTableLoading: any;
  setPickedColumns: any;
}

const DomainExplorerColumnPicker: React.FC<IOwnProps> = ({
  columnPickerType,
  setColumnFilters,
  setTableLoading,
  setPickedColumns
}) => {
  const [selected, setSelected] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [parameters, setParameters] = useState([]);

  const fieldObject: any = {};

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
    fieldObject.value = Object.create({ parent });
    fieldObject.value[parent] = [selection];
    // console.log('fields', fieldObject);
    setParameters(prevState => [...prevState, fieldObject.value]);
    setPickedColumns(prevState => [...prevState, fieldObject.value]);
  };
  const onToggle = _isExpanded => {
    setIsExpanded(_isExpanded);
  };

  const getPicker = useQuery(GET_PICKER, {
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
              {selectionItems}
            </Select>
          </GridItem>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default React.memo(DomainExplorerColumnPicker);
