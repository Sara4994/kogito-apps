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

import { QueryFilter, Job } from '@kogito-apps/jobs-management';
import { JobsManagementQueries } from './JobsManagementQueries';

export interface JobsManagementGatewayApi {
  applyFilter: (filter: QueryFilter) => Promise<Job[]>;
  bulkCancel: () => Promise<void>;
  cancelJob: () => Promise<void>;
  rescheduleJob: () => Promise<void>;
  query(offset: number, limit: number): Promise<Job[]>;
}

export class JobsManagementGatewayApiImpl implements JobsManagementGatewayApi {
  private readonly queries: JobsManagementQueries;
  private _JobsManagementState: any;
  // private jobs: Job;

  constructor(queries: JobsManagementQueries) {
    this.queries = queries;
  }

  applyFilter = (filter: QueryFilter): Promise<Job[]> => {
    this._JobsManagementState.filter = filter;
    return Promise.resolve(this._JobsManagementState);
  };

  bulkCancel = () => {
    return Promise.resolve();
  };

  cancelJob = () => {
    return Promise.resolve();
  };

  rescheduleJob = () => {
    return Promise.resolve();
  };

  query(offset: number, limit: number): Promise<Job[]> {
    return new Promise<Job[]>((resolve, reject) => {
      this.queries
        .getJobs(
          offset,
          limit,
          this._JobsManagementState.filters,
          this._JobsManagementState.sortBy
        )
        .then(value => {
          this._JobsManagementState.currentPage = { offset, limit };
          resolve(value);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }
}
