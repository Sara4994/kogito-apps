import { TimeAgo } from '@n1ru4l/react-time-ago';
import { Card, CardBody, CardFooter, CardHeader } from '@patternfly/react-core';
import { ServicesIcon, UserIcon } from '@patternfly/react-icons'
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';
import React from 'react';
import './ProcessDetailsTimeline.css';

export interface IOwnProps {
  loading: boolean,
  data: any
}

const ProcessDetailsTimeline: React.FC<IOwnProps> = ({ loading, data }) => {

  return (
    <Card>
      <CardHeader>Timeline</CardHeader>
      <CardBody>
      {loading ? 
        <div className="timeline-container">
          {data[0].nodes.map(content => {
              return (
                <div className="timeline-item" key={content.id}>
                  <div className="timeline-item-content">
                    <TimeAgo date={new Date(`${content.exit}`)} render={({ error, value }) => <span>{value}</span>} />
                    <p>{content.name}</p>
                    <span className="circle">
                      {content.type === 'HumanTaskNode' ? (
                        <UserIcon className="processdetailstimetine-iconstyle" />
                      ) : (
                        <ServicesIcon className="processdetailstimetine-iconstyle" />
                      )}{' '}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
         : <Spinner />}
      </CardBody>
    </Card>
  );
};

export default ProcessDetailsTimeline;
