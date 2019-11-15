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

const DomainExplorerTable = ({ columnFilters, tableLoading }) => {
  const firstKey = Object.keys(columnFilters)[0];
  const tableContent = columnFilters[firstKey];
  let colsTemp: any = [];
  const tableRows: any = [];
  let rows = [];
  const rowObject: any = {};
  const temp: any = {};
  if (tableContent) {
    const tableObjects: any = [];
    tableContent.filter(items => tableObjects.push(Object.values(items)));
    const tableData = tableObjects.flat();
    tableData.filter(item => {
      colsTemp.push(Object.keys(item));
      temp.cells = Object.values(item);
      tableRows.push(temp);
    });
    colsTemp = colsTemp[0];
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
      rows.push(rowObject);
    } else {
      rows = tableRows;
    }
  }
  const onRowSelect = (event, isSelected, rowId) => {
    return null;
  };

  const onDelete = (type = '', id = '') => {
    return null;
  };

  return (
    <React.Fragment>
      {colsTemp.length > 0 && (
        <Table
          cells={colsTemp}
          rows={rows}
          onSelect={onRowSelect}
          aria-label="Filterable Table Demo"
        >
          <TableHeader />
          <TableBody />
        </Table>
      )}
      {colsTemp.length > 0 && rows.length === 0 && (
        <Bullseye>
          <EmptyState>
            <EmptyStateIcon icon={SearchIcon} />
            <Title headingLevel="h5" size="lg">
              No results found
            </Title>
            <EmptyStateBody>
              No results match this filter criteria.
            </EmptyStateBody>
            <EmptyStateSecondaryActions>
              <Button variant="link" onClick={() => onDelete(null)}>
                Clear all filters
              </Button>
            </EmptyStateSecondaryActions>
          </EmptyState>
        </Bullseye>
      )}
    </React.Fragment>
  );
};

export default DomainExplorerTable;
