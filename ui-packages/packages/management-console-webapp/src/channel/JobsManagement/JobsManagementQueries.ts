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

import { ApolloClient } from 'apollo-client';
import { SortBy, QueryFilter, Job } from '@kogito-apps/jobs-management';
import { GraphQL } from '@kogito-apps/consoles-common';
import {
  buildJobsManagementWhereArgument,
  getOrderByObject
} from '../../utils/QueryUtils';

export interface JobsManagementQueries {
  getJobs(
    start: number,
    end: number,
    filters: QueryFilter,
    sortBy: SortBy
  ): Promise<Job[]>;
}

export class GraphQLJobsManagementQueries implements JobsManagementQueries {
  private readonly client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  getJobs(
    offset: number,
    limit: number,
    filters: QueryFilter,
    sortBy: SortBy
  ): Promise<Job[]> {
    return new Promise<Job[]>((resolve, reject) => {
      this.client
        .query({
          query: GraphQL.GetTasksForUserDocument,
          variables: {
            whereArgument: buildJobsManagementWhereArgument(),
            offset: offset,
            limit: limit,
            orderBy: getOrderByObject(sortBy)
          }
        })
        .then(value => {
          resolve(value.data);
        })
        .catch(reason => reject(reason));
    });
  }
}
