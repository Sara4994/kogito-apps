import React from 'react';
import { Bullseye } from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

const DomainExplorerTable = ({ columnFilters }) => {
  const firstKey = Object.keys(columnFilters)[0];
  const tableContent = columnFilters[firstKey];
  let colsTemp: any = [];
  let tableRows: any = [];
  const rows = [];
  const rowObject: any = {};
  if (tableContent) {
    const tableObjects = Object.values(tableContent[0]);
    tableObjects.filter(item => {
      colsTemp.push(Object.keys(item));
      tableRows.push(Object.values(item));
    });
    colsTemp = colsTemp.flat();
    tableRows = tableRows.flat();
    rowObject.cells = tableRows;
    rows.push(rowObject);
  }

  const onRowSelect = (event, isSelected, rowId) => {
    let _rows;
    if (rowId === -1) {
      _rows = _rows.map(oneRow => {
        oneRow.selected = isSelected;
        return oneRow;
      });
    } else {
      _rows = [..._rows];
      _rows[rowId].selected = isSelected;
    }
    this.setState({
      rows
    });
  };

  const onDelete = (type = '', id = '') => {
    // if (type) {
    //   setFilters(prevState => {
    //     prevState[type.toLowerCase()] = prevState[type.toLowerCase()].filter(
    //       s => s !== id
    //     );
    //     return {
    //       ...prevState
    //     };
    //   });
    // } else {
    //   setFilters({
    //     location: [],
    //     name: [],
    //     status: []
    //   });
    // }
  };

  return (
    <React.Fragment>
      <Table
        cells={colsTemp}
        rows={rows}
        onSelect={onRowSelect}
        aria-label="Filterable Table Demo"
      >
        <TableHeader />
        <TableBody />
      </Table>
      <Bullseye>
        {/* <EmptyState>
          <EmptyStateIcon icon={SearchIcon} />
          <Title headingLevel="h5" size="lg">
            No results found
          </Title> */}
        {/* <EmptyStateBody>
            No results match this filter criteria. Remove all filters or clear
            all filters to show results.
          </EmptyStateBody>
          <EmptyStateSecondaryActions>
            <Button variant="link" onClick={() => onDelete(null)}>
              Clear all filters
            </Button>
          </EmptyStateSecondaryActions> */}
        {/* </EmptyState>  */}
      </Bullseye>
    </React.Fragment>
    //    { loading1 && <Title size="3xl">Please wait while loading1 data</Title> }
  );
};

export default DomainExplorerTable;
