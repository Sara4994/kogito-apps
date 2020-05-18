/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
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

package org.kie.kogito.index;

import java.util.Arrays;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.common.QuarkusTestResourceLifecycleManager;

public interface QuarkusTestResourceWithCleanupLifecycleManager extends QuarkusTestResourceLifecycleManager {

    @Override
    default void inject(Object testInstance) {
        QuarkusTestResource[] testResourceAnnotations = testInstance.getClass().getAnnotationsByType(QuarkusTestResource.class);
        if (testResourceAnnotations.length > 0) {
            if (Arrays.stream(testResourceAnnotations)
                    .anyMatch(it -> getClass().isAssignableFrom(it.value()))) {
                cleanup();
            }
        }
    }

    void cleanup();
}