import React, { useState, useEffect } from 'react';
import { DataList, PageSection, Card } from '@patternfly/react-core';
import ScrollArea from 'react-scrollbar';
import './DataList.css';
import DataListTitleComponent from '../../Molecules/DataListTitleComponent/DataListTitleComponent';
import DataListToolbarComponent from '../../Molecules/DataListToolbarComponent/DataListToolbarComponent';
import DataListItemComponent from '../../Molecules/DataListItemComponent/DataListItemComponent';
import gql from 'graphql-tag';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';

export interface IOwnProps {}

const DataListComponent: React.FC<IOwnProps> = () => {
  const [isActiveChecked, setIsActiveChecked] = useState<boolean>(false);
  const [isCompletedChecked, setIsCompletedChecked] = useState<boolean>(false);
  const [isAbortChecked, setisAbortChecked] = useState<boolean>(false);
  const [initData, setInitData] = useState<any>([]);
  const [checkedArray, setCheckedArray] = useState<any>([]);
  const [filterArray, setFilterArray] = useState<any>([]);
/* tslint:disable:no-string-literal */
  const GET_INSTANCES = gql`
    query getInstances($parentProcessId: [String]) {
      ProcessInstances(filter: { parentProcessInstanceId: $parentProcessId }) {
        id
        processId
        parentProcessInstanceId
        roles
        state
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_INSTANCES, {
    variables: {
      parentProcessId: [null]
    },
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    setInitData(data);
    setFilterArray(data);
  }, [data]);

  const handleChange = (checked, event) => {
    if (event.target.name === 'isActiveChecked') {
      setIsActiveChecked(isActiveChecked ? false : true);
      if (!isActiveChecked === true) {
        setCheckedArray([...checkedArray, 'ACTIVE']);
      } else if (!isActiveChecked === false) {
        const tempArr = checkedArray.slice();
        const temp = 'ACTIVE';
        _.remove(tempArr, temp => {
          return temp === 'ACTIVE';
        });
        setCheckedArray(tempArr);
      }
    }

    if (event.target.name === 'isCompletedChecked') {
      setIsCompletedChecked(isCompletedChecked ? false : true);
      if (!isCompletedChecked === true) {
        setCheckedArray([...checkedArray, 'COMPLETED']);
      } else if (!isCompletedChecked === false) {
        const tempArr = checkedArray.slice();
        const temp = 'COMPLETED';
        _.remove(tempArr, temp => {
          return temp === 'COMPLETED';
        });
        setCheckedArray(tempArr);
      }
    }
    if (event.target.name === 'isAbortChecked') {
      setisAbortChecked(isAbortChecked ? false : true);
      if (!isAbortChecked === true) {
        setCheckedArray([...checkedArray, 'ABORTED']);
      } else if (!isAbortChecked === false) {
        const tempArr = checkedArray.slice();
        const temp = 'ABORTED';
        _.remove(tempArr, temp => {
          return temp === 'ABORTED';
        });
        setCheckedArray(tempArr);
      }
    }
  };

  const onFilterClick = () => {
    const tempArr = [];
    checkedArray.map(check => {
      initData['ProcessInstances'].map(data => {
        if (data.state.toString().toLowerCase() === check.toString().toLowerCase()) {
          tempArr.push(data);
        }
      });
    });
    const processInstanceObject = { ProcessInstances: tempArr };
    setFilterArray(processInstanceObject);
  };

  const removeChecked = id => {
    if (id.toString().toLowerCase() === 'active') {
      setIsActiveChecked(false);
    } else if (id.toString().toLowerCase() === 'completed') {
      setIsCompletedChecked(false);
    } else if (id.toString().toLowerCase() === 'aborted') {
      setisAbortChecked(false);
    }
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p>oops.. some error</p>;

  return (
    <React.Fragment>
      <PageSection variant="light">
        <DataListTitleComponent />
      </PageSection>
      <PageSection>
        <Card className="dataList">
          <DataListToolbarComponent
            isActive={isActiveChecked}
            isComplete={isCompletedChecked}
            isAborted={isAbortChecked}
            handleChange={handleChange}
            checkedArray={checkedArray}
            filterClick={onFilterClick}
            removeCheck={removeChecked}
          />
          <DataList aria-label="Expandable data list example">
            <ScrollArea smoothScrolling={true} className="scrollArea">
              {!loading &&
                filterArray !== undefined &&
                filterArray['ProcessInstances'].map((item, index) => {
                  return (
                    <DataListItemComponent
                      id={index}
                      key={index}
                      instanceState={item.state}
                      instanceID={item.id}
                      processID={item.processId}
                      parentInstanceID={item.parentProcessInstanceId}
                    />
                  );
                })}
            </ScrollArea>
          </DataList>
        </Card>
      </PageSection>
    </React.Fragment>
  );
};

export default DataListComponent;
