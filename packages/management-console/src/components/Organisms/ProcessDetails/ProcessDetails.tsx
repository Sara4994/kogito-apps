import {TimeAgo} from '@n1ru4l/react-time-ago';
import {Button, Card, CardBody, CardHeader, Form, FormGroup, Text, TextVariants} from '@patternfly/react-core';
import React from 'react';
import {Link} from "react-router-dom";

<<<<<<< HEAD
const ProcessDetails = ({ loading, data }) => {
  const DetailsStyle = {
    marginLeft: '2em',
    height: '25em'
  };
  return (
    <Card style={DetailsStyle}>
      <CardHeader>Details</CardHeader>
      <CardBody>
        <Grid gutter="md">
          <GridItem span={6}>
            <TextContent>
              <Text component={TextVariants.h4}>
                Defintion Id
              </Text>
              <Text component={TextVariants.h4}>Instance State</Text>
            </TextContent>
          </GridItem>
          <GridItem span={6}>
            <TextContent>
              {!loading ? (
                data.ProcessInstances.map(item => {
                  return (
                    <div key={item.id}>
                      <Text component={TextVariants.h4}>{item.processId}</Text>
                      <Text component={TextVariants.h4}>{item.state}</Text>
                    </div>
                  );
                })
              ) : (
                <Text component={TextVariants.h4}>Loading...</Text>
              )}
            </TextContent>
          </GridItem>
        </Grid>
      </CardBody>
      <CardFooter>
        <Button variant="primary" style={{ float: 'right' }}>
          Primary
        </Button>
      </CardFooter>
    </Card>
  );
=======
const ProcessDetails = ({loading, data}) => {
    return (
        <Card>
            <CardHeader>Details</CardHeader>
            <CardBody>
                <Form>
                    <FormGroup label="Name" fieldId="name">
                        <Text component={TextVariants.p}>{data.ProcessInstances[0].processName}</Text>
                    </FormGroup>
                    <FormGroup label="State" fieldId="state">
                        <Text component={TextVariants.p}>{data.ProcessInstances[0].state}</Text>
                    </FormGroup>
                    <FormGroup label="Id" fieldId="id">
                        <Text component={TextVariants.p}>{data.ProcessInstances[0].id}</Text>
                    </FormGroup>
                    <FormGroup label="Endpoint" fieldId="endpoint">
                        <Text component={TextVariants.p}>{data.ProcessInstances[0].endpoint}</Text>
                    </FormGroup>
                    <FormGroup label="Start" fieldId="start">
                        <Text component={TextVariants.p}>
                            {data.ProcessInstances[0].start ?
                                <TimeAgo date={new Date(`${data.ProcessInstances[0].start}`)} render={({error, value}) =>
                                    <span>{value}</span>}/>
                                : ''}
                        </Text>
                    </FormGroup>
                    <FormGroup label="End" fieldId="end">
                        <Text component={TextVariants.p}>
                            {data.ProcessInstances[0].end ?
                                <TimeAgo date={new Date(`${data.ProcessInstances[0].end}`)} render={({error, value}) =>
                                    <span>{value}</span>}/>
                                : ''}
                        </Text>
                    </FormGroup>
                    {data.ProcessInstances[0].parentProcessInstanceId ?
                        <FormGroup label="Parent Process" fieldId="parent">
                            <Text component={TextVariants.p}>
                                <Link to={'/ProcessInstances/' + data.ProcessInstances[0].parentProcessInstanceId}>
                                    <Button variant="secondary">{data.ProcessInstances[0].parentProcessInstanceId}</Button>
                                </Link>
                            </Text>
                        </FormGroup> : ''}
                    {data.ProcessInstances[0].childProcessInstanceId.length>0 ?
                        <FormGroup label="Sub Processes" fieldId="parent">
                            {data.ProcessInstances[0].childProcessInstanceId.map((child, index) =>
                                <Text component={TextVariants.p} key={child} style={{marginTop: '5px'}}>
                                    <Link to={'/ProcessInstances/' + child}>
                                        <Button variant="secondary">{child}</Button>
                                    </Link>
                                </Text>)
                            }
                        </FormGroup> : ''}
                </Form>
            </CardBody>
        </Card>
    );
>>>>>>> 56b1a579d538bf04b73145e896e9e73b9d06d2c3
};

export default ProcessDetails;
