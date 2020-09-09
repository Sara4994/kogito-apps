import React, { useState } from 'react';
import {
  DropdownItem,
  Dropdown,
  KebabToggle,
  Button
} from '@patternfly/react-core';
import JobsPanelDetailsModal from '../JobsPanelDetailsModal/JobsPanelDetailsModal';
import { OUIAProps, componentOuiaProps, GraphQL } from '@kogito-apps/common';
import { setTitle } from '../../../utils/Utils';
import axios from 'axios';
interface JobActionsProps {
  job: GraphQL.Job;
}

const JobActionsKebab: React.FC<JobActionsProps & OUIAProps> = ({
  job,
  ouiaId,
  ouiaSafe
}) => {
  const [isKebabOpen, setIsKebabOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rescheduleClicked, setRescheduleClicked] = useState<boolean>(false);
  const [scheduleDate, setScheduleDate] = useState(
    new Date(job.expirationTime)
  );
  const RescheduleJobs = ['SCHEDULED', 'ERROR'];
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSelect = () => {
    setIsKebabOpen(!isKebabOpen);
  };

  const onToggle = isOpen => {
    setIsKebabOpen(isOpen);
  };

  const onDetailsClick = () => {
    handleModalToggle();
  };

  const handleRescheduleAction = () => {
    setRescheduleClicked(!rescheduleClicked);
  };

  const onRescheduleClick = () => {
    handleRescheduleAction();
  };
  // console.log('endpoint', job.endpoint, job.id)
  const onApplyReschedule = () => {
    try {
      // tslint:disable-next-line: no-floating-promises
      axios
        .patch(`${job.endpoint}/${job.id}`, {
          expirationTime: new Date(scheduleDate)
        })
        .then(res => {
          // console.log('success', res)
          setRescheduleClicked(!rescheduleClicked);
          return res;
        });
    } catch (error) {
      // console.log(error)
      setRescheduleClicked(!rescheduleClicked);
      return error;
    }
    return null;
  };
  const detailsAction = [
    <Button
      key="confirm-selection"
      variant="primary"
      onClick={handleModalToggle}
    >
      OK
    </Button>
  ];

  const rescheduleActions = [
    <Button key="apply-selection" variant="primary" onClick={onApplyReschedule}>
      Apply
    </Button>,
    <Button
      key="cancel-reschedule"
      variant="secondary"
      onClick={handleRescheduleAction}
    >
      Cancel
    </Button>
  ];
  const dropdownItems = () => {
    if (RescheduleJobs.includes(job.status)) {
      return [
        <DropdownItem key="details" component="button" onClick={onDetailsClick}>
          Details
        </DropdownItem>,
        <DropdownItem
          key="reschedule"
          component="button"
          onClick={onRescheduleClick}
        >
          Reschedule
        </DropdownItem>
      ];
    } else {
      return [
        <DropdownItem key="details" component="button" onClick={onDetailsClick}>
          Details
        </DropdownItem>
      ];
    }
  };
  // console.log('job', job)
  return (
    <>
      <JobsPanelDetailsModal
        actionType="Job Details"
        modalTitle={setTitle('success', 'Job Details')}
        isModalOpen={isModalOpen}
        handleModalToggle={handleModalToggle}
        modalAction={detailsAction}
        job={job}
      />
      <JobsPanelDetailsModal
        actionType="Job Reschedule"
        modalTitle={setTitle('success', 'Job Reschedule')}
        isModalOpen={rescheduleClicked}
        handleModalToggle={handleRescheduleAction}
        modalAction={rescheduleActions}
        job={job}
        scheduleDate={scheduleDate}
        setScheduleDate={setScheduleDate}
      />
      <Dropdown
        onSelect={onSelect}
        toggle={<KebabToggle onToggle={onToggle} id="kebab-toggle" />}
        isOpen={isKebabOpen}
        isPlain
        aria-label="Job actions dropdown"
        aria-labelledby="Job actions dropdown"
        dropdownItems={dropdownItems()}
        {...componentOuiaProps(ouiaId, 'job-actions-kebab', ouiaSafe)}
      />
    </>
  );
};

export default JobActionsKebab;
