import React, { useState, useEffect } from 'react';
import {
  DataToolbar,
  DataToolbarContent,
  DataToolbarToggleGroup,
  DataToolbarGroup,
  Card,
  Bullseye,
  DataToolbarItem,
  DataToolbarFilter
} from '@patternfly/react-core';
import { FilterIcon } from '@patternfly/react-icons';
import DomainExplorerFilterOptions from '../../Molecules/DomainExplorerFilterOptions/DomainExplorerFilterOptions';
import DomainExplorerManageColumns from '../../Molecules/DomainExplorerManageColumns/DomainExplorerManageColumns';
import DomainExplorerTable from '../../Molecules/DomainExplorerTable/DomainExplorerTable';
import KogitoSpinner from '../../Atoms/KogitoSpinner/KogitoSpinner';
import LoadMore from '../../Atoms/LoadMore/LoadMore';
import ServerErrors from '../../Molecules/ServerErrors/ServerErrors';
import { deleteKey, clearEmpties } from '../../../utils/Utils';
import './DomainExplorer.css';

import { GraphQL } from '../../../graphql/types';
import useGetQueryTypesQuery = GraphQL.useGetQueryTypesQuery;
import useGetQueryFieldsQuery = GraphQL.useGetQueryFieldsQuery;
import useGetColumnPickerAttributesQuery = GraphQL.useGetColumnPickerAttributesQuery;
import useGetInputFieldsFromQueryQuery = GraphQL.useGetInputFieldsFromQueryQuery;
interface IOwnProps {
  domainName: string;
  rememberedParams: any;
  rememberedSelections: any;
  metaData: any;
  rememberedFilters: object;
  rememberedChips: any[];
  defaultChip: any[];
  defaultFilter: any;
}

const DomainExplorer: React.FC<IOwnProps> = ({
  domainName,
  rememberedParams,
  rememberedSelections,
  rememberedFilters,
  rememberedChips,
  metaData,
  defaultChip,
  defaultFilter
}) => {
  const [defaultPageSize] = useState(10);
  const [columnPickerType, setColumnPickerType] = useState('');
  const [columnFilters, setColumnFilters] = useState({});
  const [tableLoading, setTableLoading] = useState(true);
  const [displayTable, setDisplayTable] = useState(false);
  const [displayEmptyState, setDisplayEmptyState] = useState(false);
  const [selected, setSelected] = useState([]);
  const [limit, setLimit] = useState(defaultPageSize);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState();
  const [enableCache, setEnableCache] = useState(false);
  const [parameters, setParameters] = useState([metaData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [runFilter, setRunFilter] = useState(false);
  const [filterChips, setFilterChips] = useState(defaultChip);
  const [finalFilters, setFinalFilters] = useState<any>(defaultFilter);
  const [filterError, setFilterError] = useState('');
  const [reset, setReset] = useState(false);

  useEffect(() => {
    /* istanbul ignore else */
    if (domainName) {
      setColumnPickerType(domainName);
    }
  }, []);

  const getQuery = useGetQueryFieldsQuery();

  const getQueryTypes = useGetQueryTypesQuery();
  const getPicker = useGetColumnPickerAttributesQuery({
    variables: { columnPickerType: domainName }
  });
  const onAddColumnFilters = _columnFilter => {
    setColumnFilters(_columnFilter);
    setLimit(_columnFilter.length);
  };
  const domainArg =
    !getQuery.loading &&
    getQuery.data &&
    getQuery.data.__type.fields.find(item => {
      if (item.name === domainName) {
        return item;
      }
    });

  const argument = domainArg && domainArg.args[0].type.name;
  const getSchema = useGetInputFieldsFromQueryQuery({
    variables: {
      currentQuery: argument
    }
  });

  let data = [];
  const tempArray = [];
  let selections = [];
  let defaultParams = [];
  !getPicker.loading &&
    getPicker.data &&
    getPicker.data.__type &&
    getPicker.data.__type.fields.filter(i => {
      if (i.type.kind === 'SCALAR') {
        tempArray.push(i);
      } else {
        data.push(i);
      }
    });
  data = tempArray.concat(data);
  const fields: any = [];
  data.filter(field => {
    if (field.type.fields !== null) {
      const obj = {};
      obj[`${field.name}`] = field.type.fields;
      fields.push(obj);
    }
  });
  fields.map(obj => {
    let value: any = Object.values(obj);
    const key = Object.keys(obj);
    value = value.flat();
    value.filter(item => {
      /* istanbul ignore else */
      if (item.type.kind !== 'OBJECT') {
        const tempObj = {};
        selections.push(key + '/' + item.name);
        tempObj[`${key}`] = [item.name];
        defaultParams.push(tempObj);
      }
    });
  });

  selections = selections.slice(0, 5);
  defaultParams = defaultParams.slice(0, 5);

  useEffect(() => {
    if (rememberedParams.length > 0) {
      setEnableCache(true);
      setParameters(rememberedParams);
      setSelected(rememberedSelections);
      setFinalFilters(rememberedFilters);
      setFilterChips(rememberedChips);
    } else {
      setParameters(prev => [...defaultParams, ...prev]);
      setSelected(selections);
    }
  }, [columnPickerType, selections.length > 0]);

  const onDeleteChip = (type = '', id = '') => {
    if (type) {
      setFilterChips(prev => prev.filter(item => item !== id));
      const chipText = id.split(':');
      let removeString = chipText[0].split('/');
      removeString = removeString.map(stringEle => stringEle.trim());
      let tempObj = finalFilters;
      tempObj = deleteKey(tempObj, removeString);
      const FinalObj = clearEmpties(tempObj);
      setFinalFilters(FinalObj);
      setRunFilter(true);
    } else {
      setFinalFilters({
        metadata: {
          processInstances: {
            state: {
              equal: 'ACTIVE'
            }
          }
        }
      });
      setFilterChips(['metadata / processInstances / state: ACTIVE']);
      setReset(true);
    }
  };
  const renderToolbar = () => {
    return (
      <DataToolbar
        id="data-toolbar-with-chip-groups"
        className="pf-m-toggle-group-container"
        collapseListedFiltersBreakpoint="md"
        clearAllFilters={onDeleteChip}
        clearFiltersButtonText="Reset to default"
      >
        <DataToolbarContent>
          {!getPicker.loading && (
            <>
              <DataToolbarToggleGroup
                toggleIcon={<FilterIcon />}
                breakpoint="xl"
              >
                {!getQuery.loading && !getQueryTypes.loading && (
                  <DataToolbarFilter
                    categoryName="Filters"
                    chips={filterChips}
                    deleteChip={onDeleteChip}
                  >
                    <DataToolbarItem>
                      <DomainExplorerFilterOptions
                        argument={argument}
                        currentDomain={domainName}
                        filterChips={filterChips}
                        finalFilters={finalFilters}
                        getQueryTypes={getQueryTypes}
                        getSchema={getSchema}
                        parameters={parameters}
                        reset={reset}
                        runFilter={runFilter}
                        setColumnFilters={setColumnFilters}
                        setDisplayTable={setDisplayTable}
                        setDisplayEmptyState={setDisplayEmptyState}
                        setFilterError={setFilterError}
                        setFilterChips={setFilterChips}
                        setFinalFilters={setFinalFilters}
                        setRunFilter={setRunFilter}
                        setReset={setReset}
                        setTableLoading={setTableLoading}
                      />
                    </DataToolbarItem>
                  </DataToolbarFilter>
                )}
              </DataToolbarToggleGroup>
              <DataToolbarGroup>
                <DataToolbarItem>
                  <DomainExplorerManageColumns
                    columnPickerType={columnPickerType}
                    setColumnFilters={onAddColumnFilters}
                    setTableLoading={setTableLoading}
                    getQueryTypes={getQueryTypes}
                    setDisplayTable={setDisplayTable}
                    parameters={parameters}
                    setParameters={setParameters}
                    selected={selected}
                    setSelected={setSelected}
                    data={data}
                    getPicker={getPicker}
                    setError={setError}
                    setDisplayEmptyState={setDisplayEmptyState}
                    rememberedParams={rememberedParams}
                    enableCache={enableCache}
                    setEnableCache={setEnableCache}
                    pageSize={pageSize}
                    offsetVal={offset}
                    setOffsetVal={setOffset}
                    setPageSize={setPageSize}
                    setIsLoadingMore={setIsLoadingMore}
                    isLoadingMore={isLoadingMore}
                    metaData={metaData}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    finalFilters={finalFilters}
                    argument={argument}
                  />
                </DataToolbarItem>
              </DataToolbarGroup>
            </>
          )}
        </DataToolbarContent>
      </DataToolbar>
    );
  };

  if (!getQuery.loading && getQuery.error) {
    return <ServerErrors error={getQuery.error} variant="large" />;
  }

  if (!getQueryTypes.loading && getQueryTypes.error) {
    return <ServerErrors error={getQueryTypes.error} variant="large" />;
  }

  if (!getPicker.loading && getPicker.error) {
    return <ServerErrors error={getPicker.error} variant="large" />;
  }

  const onGetMoreInstances = (initVal, _pageSize) => {
    setOffset(initVal);
    setPageSize(_pageSize);
    setIsLoadingMore(true);
  };
  const handleRetry = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      {!error ? (
        <>
          {renderToolbar()}

          {!tableLoading || isLoadingMore ? (
            <div className="kogito-common--domain-explorer__table-OverFlow">
              <DomainExplorerTable
                columnFilters={columnFilters}
                tableLoading={tableLoading}
                displayTable={displayTable}
                displayEmptyState={displayEmptyState}
                parameters={parameters}
                selected={selected}
                offset={offset}
                setRows={setRows}
                rows={rows}
                isLoadingMore={isLoadingMore}
                handleRetry={handleRetry}
                filterError={filterError}
                finalFilters={finalFilters}
                filterChips={filterChips}
                onDeleteChip={onDeleteChip}
              />
              {!displayEmptyState &&
                !filterError &&
                (limit === pageSize || isLoadingMore) && (
                  <LoadMore
                    offset={offset}
                    setOffset={setOffset}
                    getMoreItems={onGetMoreInstances}
                    pageSize={pageSize}
                    isLoadingMore={isLoadingMore}
                  />
                )}
            </div>
          ) : (
            <Card>
              <Bullseye>
                <KogitoSpinner spinnerText="Loading domain data..." />
              </Bullseye>
            </Card>
          )}
        </>
      ) : (
        <ServerErrors error={error} variant="large" />
      )}
    </>
  );
};

export default DomainExplorer;
