import React, { useState } from 'react';
import {
  Button,
  Select,
  SelectOption,
  SelectVariant,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import { componentOuiaProps, OUIAProps } from '@kogito-apps/components-common';
import { GraphQL } from '@kogito-apps/consoles-common';

interface JobsManagementToolbarProps {
  chips: GraphQL.JobStatus[];
  onDelete: any;
  onReset: any;
}
const JobsManagementToolbar: React.FC<JobsManagementToolbarProps &
  OUIAProps> = ({ chips, onDelete, onReset, ouiaId, ouiaSafe }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const statusMenuItems: JSX.Element[] = [
    <SelectOption key="CANCELED" value="CANCELED" />,
    <SelectOption key="ERROR" value="ERROR" />,
    <SelectOption key="EXECUTED" value="EXECUTED" />,
    <SelectOption key="RETRY" value="RETRY" />,
    <SelectOption key="SCHEDULED" value="SCHEDULED" />
  ];

  const onStatusToggle = (): void => {
    setIsExpanded(!isExpanded);
  };

  const onApplyFilter = () => {
    return null;
  };

  const onSelect = (event, selection: GraphQL.JobStatus): void => {
    let selectionText = event.target.id;
    selectionText = selectionText.split('pf-random-id-')[1].split('-')[1];
    if (selectedStatus.includes(selectionText)) {
      setSelectedStatus(prev => prev.filter(item => item !== selectionText));
    } else {
      setSelectedStatus(prev => [...prev, selectionText]);
    }
  };
  return (
    <Toolbar
      id="data-toolbar-with-chip-groups"
      className="pf-m-toggle-group-container"
      collapseListedFiltersBreakpoint="md"
      clearAllFilters={() => {
        onReset();
      }}
      clearFiltersButtonText="Reset to default"
    >
      <ToolbarContent>
        <ToolbarGroup
          variant="filter-group"
          {...componentOuiaProps(ouiaId, 'job-filters', ouiaSafe)}
        >
          <ToolbarFilter
            chips={chips}
            deleteChip={onDelete}
            categoryName="Status"
            className="kogito-management-console__state-dropdown-list"
          >
            <Select
              variant={SelectVariant.checkbox}
              aria-label="Status"
              onToggle={onStatusToggle}
              onSelect={onSelect}
              selections={selectedStatus}
              isOpen={isExpanded}
              placeholderText="Status"
              id="status-select"
            >
              {statusMenuItems}
            </Select>
          </ToolbarFilter>
        </ToolbarGroup>
        <ToolbarGroup
          {...componentOuiaProps(ouiaId, 'job-filters/button', ouiaSafe)}
        >
          <ToolbarItem>
            <Button
              variant="primary"
              onClick={onApplyFilter}
              id="apply-filter"
              isDisabled={!(selectedStatus.length > 0)}
            >
              Apply Filter
            </Button>
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
};

export default JobsManagementToolbar;
