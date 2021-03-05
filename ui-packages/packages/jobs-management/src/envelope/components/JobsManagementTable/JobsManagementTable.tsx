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

import React from 'react';
import {
  Table,
  TableHeader,
  TableBody
  // sortable,
  // wrappable,
  // cellWidth,
  // info
} from '@patternfly/react-table';

const JobsManagementTable = () => {
  const defaultColumn = [
    'Repositories',
    'Branches',
    'Pull requests',
    'Workspaces',
    'Last commit'
  ];
  const defaultRow = [
    ['Repository one', 'Branch one', 'PR one', 'Workspace one', 'Commit one'],
    ['Repository two', 'Branch two', 'PR two', 'Workspace two', 'Commit two'],
    [
      'Repository three',
      'Branch three',
      'PR three',
      'Workspace three',
      'Commit three'
    ]
  ];
  return (
    <Table
      cells={defaultColumn}
      rows={defaultRow}
      aria-label="Jobs management Table"
    >
      <TableHeader />
      <TableBody />
    </Table>
  );
};

export default JobsManagementTable;
