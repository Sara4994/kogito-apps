import React from 'react';
import { OUIAProps, componentOuiaProps, GraphQL } from '@kogito-apps/common';
import {
  Modal,
  Title,
  TitleSizes,
  TextContent,
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Text,
  TextVariants,
  ModalBoxBody,
  TextInput,
  ModalVariant,
  Form,
  FormGroup,
  Button
} from '@patternfly/react-core';
import { OutlinedClockIcon } from '@patternfly/react-icons';
import Moment from 'react-moment';
import DateTimePicker from 'react-datetime-picker';
import './JobsPanelDetailsModal.css';
interface JobsPanelDetailsModalProps {
  actionType: string;
  modalTitle: JSX.Element;
  isModalOpen: boolean;
  handleModalToggle: () => void;
  modalAction: JSX.Element[];
  job: GraphQL.Job;
  scheduleDate?: Date;
  setScheduleDate?: (scheduleDate: Date) => void;
}
const JobsPanelDetailsModal: React.FC<JobsPanelDetailsModalProps &
  OUIAProps> = ({
  actionType,
  modalTitle,
  isModalOpen,
  modalAction,
  handleModalToggle,
  job,
  scheduleDate,
  setScheduleDate,
  ouiaId,
  ouiaSafe
}) => {
  const handleTextInputChange1 = () => {
    return null;
  };

  const handleDateChange = e => {
    // console.log('change', e)
    setScheduleDate(e);
  };

  const handleTimeNow = () => {
    // console.log('date', new Date())
    setScheduleDate(new Date());
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        value={scheduleDate}
        minDate={scheduleDate}
        onChange={handleDateChange}
      />
    );
  };

  // React.useEffect(() => {
  //   renderDatePicker()
  // },[scheduleDate])

  // console.log('schecduleDate', scheduleDate)
  const modalContent = () => {
    if (actionType === 'Job Details') {
      return (
        <div style={{ padding: '30px' }}>
          <TextContent>
            <Flex direction={{ default: 'column' }}>
              <FlexItem>
                <Split hasGutter>
                  <SplitItem>
                    <Text component={TextVariants.h6}>Process Id: </Text>{' '}
                  </SplitItem>
                  <SplitItem>{job.processId}</SplitItem>
                </Split>
              </FlexItem>
              <FlexItem>
                <Split hasGutter>
                  <SplitItem>
                    {' '}
                    <Text component={TextVariants.h6}>
                      Process Instance Id:{' '}
                    </Text>{' '}
                  </SplitItem>
                  <SplitItem>{job.processInstanceId}</SplitItem>
                </Split>
              </FlexItem>
              <FlexItem>
                <Split hasGutter>
                  <SplitItem>
                    <Text component={TextVariants.h6}>Status: </Text>{' '}
                  </SplitItem>
                  <SplitItem>{job.status}</SplitItem>
                </Split>
              </FlexItem>
              <FlexItem>
                <Split hasGutter>
                  <SplitItem>
                    <Text component={TextVariants.h6}>Priority: </Text>{' '}
                  </SplitItem>
                  <SplitItem>{job.priority}</SplitItem>
                </Split>
              </FlexItem>
              {job.repeatInterval && (
                <FlexItem>
                  <Split hasGutter>
                    <SplitItem>
                      <Text component={TextVariants.h6}>RepeatInterval: </Text>
                    </SplitItem>
                    <SplitItem>{job.repeatInterval}</SplitItem>
                  </Split>
                </FlexItem>
              )}
              {job.repeatLimit && (
                <FlexItem>
                  <Split hasGutter>
                    <SplitItem>
                      <Text component={TextVariants.h6}>RepeatLimit: </Text>
                    </SplitItem>
                    <SplitItem>{job.repeatLimit}</SplitItem>
                  </Split>
                </FlexItem>
              )}
              <FlexItem>
                <Split hasGutter>
                  <SplitItem>
                    <Text component={TextVariants.h6}>ScheduledId: </Text>
                  </SplitItem>
                  <SplitItem>{job.scheduledId}</SplitItem>
                </Split>
              </FlexItem>
              <FlexItem>
                <Split hasGutter>
                  <SplitItem>
                    <Text component={TextVariants.h6}>Retries: </Text>
                  </SplitItem>
                  <SplitItem>{job.retries}</SplitItem>
                </Split>
              </FlexItem>
              <FlexItem>
                <Split hasGutter>
                  <SplitItem>
                    <Text component={TextVariants.h6}>Last Updated: </Text>
                  </SplitItem>
                  <SplitItem>
                    <Moment fromNow>{new Date(`${job.lastUpdate}`)}</Moment>
                  </SplitItem>
                </Split>
              </FlexItem>
              <FlexItem>
                <Split hasGutter>
                  <SplitItem>
                    <Text
                      component={TextVariants.h6}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Callback Endpoint:{' '}
                    </Text>
                  </SplitItem>
                  <SplitItem>{job.callbackEndpoint}</SplitItem>
                </Split>
              </FlexItem>
            </Flex>
          </TextContent>
        </div>
      );
    } else {
      return (
        <ModalBoxBody style={{ height: '400px' }}>
          <Form isHorizontal>
            <FormGroup label="Expiration Time" fieldId="horizontal-form-name">
              {renderDatePicker()}
              <Button style={{ marginTop: '10px' }} onClick={handleTimeNow}>
                <OutlinedClockIcon /> Now
              </Button>
            </FormGroup>
            <FormGroup label="Repeat Interval" fieldId="repeat-interval">
              <TextInput
                type="text"
                id="simple-form-name1"
                name="simple-form-name"
                aria-describedby="simple-form-name-helper"
                value={job.repeatInterval || 0}
                onChange={handleTextInputChange1}
                isDisabled={job.repeatInterval === null}
              />
            </FormGroup>
            <FormGroup label="Repeat Limit" fieldId="repeat-limit">
              <TextInput
                type="text"
                id="simple-form-name"
                name="simple-form-name"
                aria-describedby="simple-form-name-helper"
                value={job.repeatLimit || 0}
                onChange={handleTextInputChange1}
                isDisabled={job.repeatLimit === null}
              />
            </FormGroup>
          </Form>
        </ModalBoxBody>
      );
    }
  };

  return (
    <Modal
      variant={actionType === 'Job Details' ? 'large' : ModalVariant.small}
      aria-labelledby={actionType + 'modal'}
      aria-label={actionType + 'modal'}
      title=""
      header={
        <Title headingLevel="h1" size={TitleSizes['2xl']}>
          {modalTitle}
        </Title>
      }
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      actions={modalAction}
      {...componentOuiaProps(ouiaId, 'job-details-modal', ouiaSafe)}
    >
      {modalContent()}
    </Modal>
  );
};

export default JobsPanelDetailsModal;
