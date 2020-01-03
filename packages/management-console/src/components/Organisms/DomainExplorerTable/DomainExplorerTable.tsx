import React from 'react';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import {
  Title,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  Bullseye,
  Button
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import SpinnerComponent from '../../Atoms/SpinnerComponent/SpinnerComponent';

const DomainExplorerTable = ({ columnFilters, tableLoading, displayTable }) => {
  const getKeys = object => {
    const iter = (data, k = '') => {
      // tslint:disable-next-line: forin
      for (const i in data) {
        const rest = k.length ? ' < ' + i : i;
        if (typeof data[i] === 'object') {
          if (!Array.isArray(data[i])) {
            iter(data[i], k + rest);
          }
        } else {
          !tempKeys.includes(k + rest) && tempKeys.push(k + rest);
          if (rest.hasOwnProperty) {
            tempValue.push(data[i]);
          }
        }
      }
    };
    const tempKeys = [];
    const tempValue = [];
    iter(object);
    return { tempKeys, tempValue };
  };
  const firstKey = Object.keys(columnFilters)[0];
  const tableContent = columnFilters[firstKey];

  const keys = [];
  const values = [];
  if (tableContent) {
    const finalResult = tableContent.map(item => getKeys(item));
    finalResult.map(result => {
      keys.push(result.tempKeys);
      values.push({ cells: result.tempValue });
    });
    const rowObject: any = {};
    if (tableLoading) {
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
      values.push(rowObject);
    }
  }
  const finalKeys = keys[0];

  const onRowSelect = (event, isSelected, rowId) => {
    return null;
  };

  const onDelete = (type = '', id = '') => {
    return null;
  };

  return (
    <React.Fragment>
      {displayTable && (
        <Table
          cells={finalKeys}
          rows={values}
          onSelect={onRowSelect}
          aria-label="Filterable Table Demo"
        >
          <TableHeader />
          <TableBody />
        </Table>
      )}
    </React.Fragment>
  );
};

export default DomainExplorerTable;
