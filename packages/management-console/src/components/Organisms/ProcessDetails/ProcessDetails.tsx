import {TimeAgo} from '@n1ru4l/react-time-ago';
import {Button, Card, CardBody, CardHeader, Form, FormGroup, Text, TextVariants} from '@patternfly/react-core';
import React from 'react';
import {Link} from "react-router-dom";
import Skeleton from 'react-skeleton-loader';

const ProcessDetails = ({loading, data}) => {
    return (
        <Card>
            <CardHeader>Details</CardHeader>
            <CardBody>
                <Form>
                    <FormGroup label="Name" fieldId="name">
                        {loading ?  <Text component={TextVariants.p}>{data.ProcessInstances[0].processName}</Text> : <div><Skeleton height="25px" width="200px"/></div>}
                    </FormGroup> 
                    
                    <FormGroup label="State" fieldId="state">
                        {loading ? <Text component={TextVariants.p}>{data.ProcessInstances[0].state}</Text>  : <div><Skeleton height="25px" width="200px"/></div> }
                    </FormGroup>
                    <FormGroup label="Id" fieldId="id">
                        {loading ? <Text component={TextVariants.p}>{data.ProcessInstances[0].id}</Text> : <div><Skeleton height="25px" width="200px"/></div> }
                    </FormGroup>
                    {data.ProcessInstances[0].endpoint ?
                    <FormGroup label="Endpoint" fieldId="endpoint">
                        {loading ? <Text component={TextVariants.p}>{data.ProcessInstances[0].endpoint}</Text> : <div><Skeleton height="25px" width="200px"/></div> }
                    </FormGroup> : '' }
                    {data.ProcessInstances[0].start ?
                    <FormGroup label="Start" fieldId="start">
                        {loading ? <Text component={TextVariants.p}>
                            <TimeAgo date={new Date(`${data.ProcessInstances[0].start}`)} render={({error, value}) =>
                                    <span>{value}</span>}/>
                        </Text> : <div><Skeleton height="25px" width="200px"/></div>}
                    </FormGroup> : ''}
                    {data.ProcessInstances[0].end ?
                    <FormGroup label="End" fieldId="end">
                        {loading ? <Text component={TextVariants.p}>
                            <TimeAgo date={new Date(`${data.ProcessInstances[0].end}`)} render={({error, value}) =>
                                <span>{value}</span>}/>
                        </Text> : <div><Skeleton height="25px" width="200px"/></div> }
                    </FormGroup> : ''}
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
                        </FormGroup> : <Skeleton height="25px" width="200px"/>}
                </Form>
            </CardBody>
        </Card>
    );
};

export default ProcessDetails;
