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

import { Divider } from '@patternfly/react-core';
import React, { useState } from 'react';
import { JobsManagementDriver } from '../../../api';
import JobsManagementTable from '../JobsManagementTable/JobsManagementTable';
import JobsManagementToolbar from '../JobsManagementToolbar/JobsManagementToolbar';

interface JobsManagementProps {
  isEnvelopeConnectedToChannel: boolean;
  driver: JobsManagementDriver;
}

const JobsManagement: React.FC<JobsManagementProps> = () => {
  const [chips, setChips] = useState([]);

  const onDelete = () => {
    setChips([]);
    return null;
  };

  const onReset = () => {
    return null;
  };

  return (
    <>
      <JobsManagementToolbar
        chips={chips}
        onDelete={onDelete}
        onReset={onReset}
      />
      <Divider />
      <JobsManagementTable />
    </>
  );
};

export default JobsManagement;
