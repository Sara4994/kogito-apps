import React from 'react';
import {
  Card,
  CardHeader,
  Title,
  CardBody,
  TextContent,
  Text,
  TextVariants,
  Label
} from '@patternfly/react-core';
import { InfoCircleIcon } from '@patternfly/react-icons';

const ProcessDetailsProcessMilestones = ({ data }) => {
  const handleStatus = status => {
    switch (status) {
      case 'AVAILABLE':
        return <Label icon={<InfoCircleIcon />}>Available</Label>;
      case 'ACTIVE':
        return (
          <Label color="blue" icon={<InfoCircleIcon />}>
            Active
          </Label>
        );
      case 'COMPLETED':
        return (
          <Label color="green" icon={<InfoCircleIcon />}>
            Completed
          </Label>
        );
      case 'TERMINATED':
        return (
          <Label color="orange" icon={<InfoCircleIcon />}>
            Terminated
          </Label>
        );
      default:
        break;
    }
  };
  return (
    <Card>
      <CardHeader>
        <Title headingLevel="h3" size="xl">
          Milestones
        </Title>
      </CardHeader>
      <CardBody>
        <TextContent>
          {data.milestones.map((milestone, index) => {
            return (
              <Text component={TextVariants.p} key={index}>
                {milestone.name} {handleStatus(milestone.status)}
              </Text>
            );
          })}
        </TextContent>
      </CardBody>
    </Card>
  );
};

export default ProcessDetailsProcessMilestones;
