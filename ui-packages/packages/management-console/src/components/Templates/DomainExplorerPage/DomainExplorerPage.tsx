import React, { useEffect } from 'react';
import {
  PageSection,
  Breadcrumb,
  BreadcrumbItem,
  InjectedOuiaProps,
  withOuiaContext
} from '@patternfly/react-core';
import { DomainExplorer, ouiaPageTypeAndObjectId } from '@kogito-apps/common';
import { Link } from 'react-router-dom';
import { Redirect, RouteComponentProps } from 'react-router';
import './DomainExplorerPage.css';
import PageTitle from '../../Molecules/PageTitle/PageTitle';

interface IOwnProps {
  domains: string[];
  loadingState: boolean;
}

interface MatchProps {
  domainName: string;
}

interface LocationProps {
  parameters?: object[];
  selected?: string[];
  finalFilters?: object;
  filterChips?: string[];
}

const DomainExplorerPage: React.FC<
  IOwnProps &
    RouteComponentProps<MatchProps, {}, LocationProps> &
    InjectedOuiaProps
> = ({ ouiaContext, ...props }) => {
  const rememberedParams =
    (props.location.state && props.location.state.parameters) || [];
  const rememberedSelections =
    (props.location.state && props.location.state.selected) || [];
  const rememberedFilters =
    (props.location.state && props.location.state.finalFilters) || [];
  const rememberedChips =
    (props.location.state && props.location.state.filterChips) || [];
  const domainName = props.match.params.domainName;
  let BreadCrumb = props.location.pathname.split('/');
  BreadCrumb = BreadCrumb.filter(item => {
    if (item !== '') {
      return item;
    }
  });
  const [pathName] = BreadCrumb.slice(-1);

  const metaData = {
    metadata: [
      {
        processInstances: [
          'id',
          'processName',
          'state',
          'start',
          'lastUpdate',
          'businessKey',
          'serviceUrl'
        ]
      }
    ]
  };

  const defaultChip = ['metadata / processInstances / state: ACTIVE'];

  const defaultFilter = {
    metadata: {
      processInstances: {
        state: {
          equal: 'ACTIVE'
        }
      }
    }
  };

  useEffect(() => {
    return ouiaPageTypeAndObjectId(ouiaContext, 'domain-explorer', domainName);
  });
  return (
    <>
      {!props.loadingState &&
        !props.domains.includes(domainName) &&
        !props.domains.includes(pathName) && (
          <Redirect
            to={{
              pathname: '/NoData',
              state: {
                prev: location.pathname,
                title: 'Domain not found',
                description: `Domain with the name ${domainName} not found`,
                buttonText: 'Go to domain explorer'
              }
            }}
          />
        )}
      <PageSection variant="light">
        <PageTitle title="Domain Explorer" />
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={'/'}>Home</Link>
          </BreadcrumbItem>
          {BreadCrumb.map((item, index) => {
            if (index === BreadCrumb.length - 1) {
              return (
                <BreadcrumbItem isActive key={index}>
                  {item}
                </BreadcrumbItem>
              );
            } else {
              return (
                <BreadcrumbItem key={index}>
                  <Link to={'/DomainExplorer'}>
                    {item.replace(/([A-Z])/g, ' $1').trim()}
                  </Link>
                </BreadcrumbItem>
              );
            }
          })}
        </Breadcrumb>
      </PageSection>
      <PageSection>
        <DomainExplorer
          rememberedParams={rememberedParams}
          rememberedSelections={rememberedSelections}
          rememberedFilters={rememberedFilters}
          rememberedChips={rememberedChips}
          domainName={domainName}
          metaData={metaData}
          defaultChip={defaultChip}
          defaultFilter={defaultFilter}
        />
      </PageSection>
    </>
  );
};

export default React.memo(withOuiaContext(DomainExplorerPage));
