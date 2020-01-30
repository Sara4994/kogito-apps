import React, { useState } from 'react';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import {
  Title,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  Bullseye,
  Button,
  Pagination,
  PaginationVariant
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import SpinnerComponent from '../../Atoms/SpinnerComponent/SpinnerComponent';
import DomainExplorerPagination from '../../Organisms/DomainExplorerPagination/DomainExplorerPagination';
import './DomainExplorerTable.css';

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
  const [page, setPate] = useState(1);
  const [perPage, setPerpage] = useState(20);

  const onSetPage = (_event, pageNumber) => {
    this.setState({
      page: pageNumber
    });
  };

  const onPerPageSelect = (_event, _perPage) => {
    this.setState({
      perPage
    });
  };
  return (
    <React.Fragment>
      {displayTable && (
        <>
          <Pagination
            itemCount={523}
            perPage={perPage}
            page={page}
            onSetPage={onSetPage}
            widgetId="pagination-options-menu-top"
            onPerPageSelect={onPerPageSelect}
            className="Domain-explorer-pagination"
          />
          <Table
            cells={finalKeys}
            rows={values}
            onSelect={onRowSelect}
            aria-label="Filterable Table Demo"
          >
            <TableHeader />
            <TableBody />
          </Table>
        </>
      )}
    </React.Fragment>
  );
};

export default DomainExplorerTable;
