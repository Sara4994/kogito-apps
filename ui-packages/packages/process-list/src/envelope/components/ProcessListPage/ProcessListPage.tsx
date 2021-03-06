/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  OrderBy,
  ProcessInstanceFilter,
  ProcessListDriver
} from '../../../api';
import React, { useEffect, useState } from 'react';
import {
  ProcessInstance,
  ProcessInstanceState
} from '@kogito-apps/management-console-shared';
import ProcessListTable from '../ProcessListTable/ProcessListTable';
import ProcessListToolbar from '../ProcessListToolbar/ProcessListToolbar';
import {
  KogitoEmptyState,
  KogitoEmptyStateType,
  ServerErrors,
  LoadMore,
  OUIAProps,
  componentOuiaProps
} from '@kogito-apps/components-common';
import { ISortBy, SortByDirection } from '@patternfly/react-table';
import _ from 'lodash';
import { alterOrderByObj } from '../utils/ProcessListUtils';
interface ProcessListPageProps {
  isEnvelopeConnectedToChannel: boolean;
  driver: ProcessListDriver;
}
const ProcessListPage: React.FC<ProcessListPageProps & OUIAProps> = ({
  driver,
  isEnvelopeConnectedToChannel,
  ouiaId,
  ouiaSafe
}) => {
  const [defaultPageSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(defaultPageSize);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [processInstances, setProcessInstances] = useState<ProcessInstance[]>(
    []
  );
  const [error, setError] = useState<string>(undefined);
  const [filters, setFilters] = useState<ProcessInstanceFilter>({
    status: [ProcessInstanceState.Active],
    businessKey: []
  });
  const [processStates, setProcessStates] = useState<ProcessInstanceState[]>([
    ProcessInstanceState.Active
  ]);
  const [expanded, setExpanded] = React.useState<{ [key: number]: boolean }>(
    {}
  );
  const [sortBy, setSortBy] = useState<ISortBy>({
    index: 3,
    direction: SortByDirection.desc
  });
  const [selectedInstances, setSelectedInstances] = useState<ProcessInstance[]>(
    []
  );
  const [selectableInstances, setSelectableInstances] = useState<number>(0);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  useEffect(() => {
    if (isEnvelopeConnectedToChannel) {
      initLoad();
    }
  }, [isEnvelopeConnectedToChannel]);

  const initLoad = async () => {
    const defaultState = {
      filters: {
        status: [ProcessInstanceState.Active],
        businessKey: []
      },
      sortBy: { lastUpdate: OrderBy.DESC }
    };
    setIsLoading(true);
    await driver.initialLoad(defaultState.filters, defaultState.sortBy);
    doQuery(0, 10, true);
  };

  const countExpandableRows = (instances: ProcessInstance[]): void => {
    instances.forEach((processInstance, index) => {
      expanded[index] = false;
      processInstance.isSelected = false;
      processInstance.isOpen = false;
      processInstance.childProcessInstances = [];
      if (
        processInstance.serviceUrl &&
        processInstance.addons.includes('process-management')
      ) {
        setSelectableInstances(prev => prev + 1);
      }
    });
  };

  const doQuery = async (
    _offset: number,
    _limit: number,
    _resetProcesses: boolean,
    _resetPagination: boolean = false,
    _loadMore: boolean = false
  ): Promise<void> => {
    setIsLoadingMore(_loadMore);
    setSelectableInstances(0);
    setSelectedInstances([]);
    try {
      const response: ProcessInstance[] = await driver.query(_offset, _limit);
      setLimit(response.length);
      if (_resetProcesses) {
        countExpandableRows(response);
        setProcessInstances(response);
      } else {
        const newData = processInstances.concat(response);
        countExpandableRows(newData);
        setProcessInstances(newData);
      }
      if (_resetPagination) {
        setOffset(_offset);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (
      selectedInstances.length === selectableInstances &&
      selectableInstances !== 0
    ) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [processInstances]);

  const applyFilter = async (filter: ProcessInstanceFilter): Promise<void> => {
    setIsLoading(true);
    await driver.applyFilter(filter);
    doQuery(0, defaultPageSize, true, true);
  };

  const applySorting = async (
    event,
    index: number,
    direction: 'asc' | 'desc'
  ) => {
    setIsLoading(true);
    setSortBy({ index, direction });
    let sortingColumn: string = event.target.innerText;
    sortingColumn = _.camelCase(sortingColumn);
    let sortByObj = _.set({}, sortingColumn, direction.toUpperCase());
    sortByObj = alterOrderByObj(sortByObj);
    await driver.applySorting(sortByObj);
    doQuery(0, defaultPageSize, true, true);
  };

  const doRefresh = async (): Promise<void> => {
    setIsLoading(true);
    doQuery(0, defaultPageSize, true, true);
  };

  const doResetFilters = (): void => {
    const defaultFilters: ProcessInstanceFilter = {
      status: [ProcessInstanceState.Active],
      businessKey: []
    };
    setIsLoading(true);
    setProcessStates([ProcessInstanceState.Active]);
    setFilters(defaultFilters);
    applyFilter(defaultFilters);
  };

  const mustShowLoadMore =
    (!isLoading || isLoadingMore) &&
    processInstances &&
    limit === pageSize &&
    filters.status.length > 0;

  if (error) {
    return <ServerErrors error={error} variant={'large'} />;
  }

  return (
    <div
      {...componentOuiaProps(
        ouiaId,
        'process-list-page',
        ouiaSafe ? ouiaSafe : !isLoading
      )}
    >
      <ProcessListToolbar
        applyFilter={applyFilter}
        refresh={doRefresh}
        filters={filters}
        setFilters={setFilters}
        processStates={processStates}
        setProcessStates={setProcessStates}
        selectedInstances={selectedInstances}
        setSelectedInstances={setSelectedInstances}
        processInstances={processInstances}
        setProcessInstances={setProcessInstances}
        isAllChecked={isAllChecked}
        setIsAllChecked={setIsAllChecked}
        driver={driver}
      />
      {filters.status.length > 0 ? (
        <>
          <ProcessListTable
            processInstances={processInstances}
            isLoading={isLoading}
            expanded={expanded}
            setExpanded={setExpanded}
            driver={driver}
            onSort={applySorting}
            sortBy={sortBy}
            setProcessInstances={setProcessInstances}
            selectedInstances={selectedInstances}
            setSelectedInstances={setSelectedInstances}
            selectableInstances={selectableInstances}
            setSelectableInstances={setSelectableInstances}
            setIsAllChecked={setIsAllChecked}
          />
          {mustShowLoadMore && (
            <LoadMore
              offset={offset}
              setOffset={setOffset}
              getMoreItems={(_offset, _limit) => {
                setPageSize(_limit);
                doQuery(_offset, _limit, false, true, true);
              }}
              pageSize={pageSize}
              isLoadingMore={isLoadingMore}
            />
          )}
        </>
      ) : (
        <KogitoEmptyState
          type={KogitoEmptyStateType.Reset}
          title="No filters applied."
          body="Try applying at least one filter to see results"
          onClick={doResetFilters}
        />
      )}
    </div>
  );
};

export default ProcessListPage;
