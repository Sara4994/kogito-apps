import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant
} from '@patternfly/react-table';
import {
  Title,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  Bullseye,
  Card,
  CardBody
} from '@patternfly/react-core';
import {
  EllipsisVIcon,
  ExternalLinkAltIcon,
  InProgressIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  SyncIcon,
  BanIcon,
  OnRunningIcon,
  SearchIcon,
  ErrorCircleOIcon,
  PausedIcon
} from "@patternfly/react-icons";
import Moment from 'react-moment';
import './DomainExplorerTable.css';
import SpinnerComponent from '../../Atoms/SpinnerComponent/SpinnerComponent';

const DomainExplorerTable = ({ columnFilters, tableLoading, displayTable }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const stateIcon = (state) => {
    switch (state) {
      case 'ACTIVE':
        return (
          <>
            <OnRunningIcon className="pf-u-mr-sm" />
            Active
          </>
        );
      case 'COMPLETED':
        return (
          <>
            <CheckCircleIcon
              className="pf-u-mr-sm"
              color="var(--pf-global--success-color--100)"
            />
            Completed
          </>
        );
      case 'ABORTED':
        return (
          <>
            <BanIcon className="pf-u-mr-sm" />
            Aborted
          </>
        );
      case 'SUSPENDED':
        return (
          <>
            <PausedIcon className="pf-u-mr-sm" />
            Suspended
          </>
        );
      case 'PENDING':
        return (
          <>
            <PausedIcon className="pf-u-mr-sm" />
            Suspended
            </>
        );
      case 'ERROR':
        return (
          <>
            <ErrorCircleOIcon
              className="pf-u-mr-sm"
              color="var(--pf-global--danger-color--100)"
            />
            Error
          </>
        );
    }
  }

  const getKeys = object => {
    const iter = (data, k = '') => {
      // tslint:disable-next-line: forin
      for (const i in data) {
        const rest = k.length ? ' / ' + i : i;

        if (typeof data[i] === 'object') {
          if (!Array.isArray(data[i])) {
            iter(data[i], k + rest);
          }
        } else {
          if (rest !== '__typename' && !rest.match('/ __typename')) {
            !tempKeys.includes(k + rest) && tempKeys.push(k + rest);
            if (rest.hasOwnProperty) {
              if (rest === 'start') {
                const ele = {
                  title: (
                    <>
                      <SyncIcon
                        className="pf-u-mr-sm"
                        color="var(--pf-global--disabled-color--100)"
                      />
                      <Moment fromNow>{data[i].toString()}</Moment>
                    </>
                  )
                }
                tempValue.push(ele)
              } else if (rest === 'state') {
                console.log('state', data[i].toString())
                const ele = {
                  title:
                    stateIcon(data[i].toString())
                }
                tempValue.push(ele)
              } else {
                tempValue.push(data[i].toString());
              }
            }
          }
        }
      }
    };
    const tempKeys = [];
    const tempValue = [];
    iter(object);
    console.log('tempValue', tempValue)
    return { tempKeys, tempValue };
  };
  const firstKey = Object.keys(columnFilters)[0];
  const tableContent = columnFilters[firstKey];

  const keys = [];
  let values = [];
  let parentIndex = 0;

  const initLoad = () => {
    if (tableContent) {
      tableContent.map(item => {
        let metaArray = [];
        const metaKeys = [];
        const metaValues = [];
        metaArray = item.metadata.processInstances;
        const tempParents = getKeys(item);
        keys.push(tempParents.tempKeys);
        values.push({
          isOpen: false,
          cells: tempParents.tempValue,
          rowKey: Math.random().toString()
        });
        metaArray.map(data => {
          const tempMeta = getKeys(data);
          metaKeys.push(tempMeta.tempKeys);
          metaValues.push({
            cells: tempMeta.tempValue,
            rowKey: Math.random().toString()
          });
        });
        const finalMetaKeys = metaKeys[0];
        const innerTable = [
          {
            parent: parentIndex,
            rowKey: Math.random().toString(),
            cells: [
              {
                title: (
                  <Table
                    aria-label="Process Instances"
                    variant={TableVariant.compact}
                    cells={finalMetaKeys}
                    rows={metaValues}
                    className="kogito-management-console__embedded-table"
                  >
                    <TableHeader />
                    <TableBody />
                  </Table>
                )
              }
            ]
          }
        ];
        values = values.concat(innerTable);
        parentIndex = parentIndex + 2;
      });

      const rowObject: any = {};
      if (tableLoading) {
        rowObject.cells = [
          {
            props: { colSpan: 8 },
            title: (
              <Bullseye>
                <SpinnerComponent spinnerText="Loading domain explorer" />
              </Bullseye>
            )
          }
        ];
        values.push(rowObject);
      }
    }
    setRows([...values]);
    const finalKeys = keys[0];
    setColumns(finalKeys);
  };

  useEffect(() => {
    initLoad();
  }, [tableContent]);

  const onCollapse = (event, rowKey, isOpen) => {
    rows[rowKey].isOpen = isOpen;
    setRows([...rows]);
  };

  const onDelete = (type = '', id = '') => {
    return null;
  };

  return (
    <React.Fragment>
      {displayTable && columns.length > 0 && (
        <Table
          cells={columns}
          rows={rows}
          aria-label="Domain Explorer Table"
          className="kogito-management-console--domain-explorer__table"
          onCollapse={onCollapse}
        >
          <TableHeader />
          <TableBody rowKey="rowKey" />
        </Table>
      )}
      {!displayTable && (
        <Card component={'div'}>
          <CardBody>
            <Bullseye>
              <EmptyState>
                <EmptyStateIcon icon={SearchIcon} />
                <Title headingLevel="h5" size="lg">
                  No domain data to display
                </Title>
                <EmptyStateBody>
                  Select columns from the dropdown to see content
                </EmptyStateBody>
              </EmptyState>
            </Bullseye>
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  );
};

export default DomainExplorerTable;
