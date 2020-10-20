import React from 'react';
import {
  Modal,
  Title,
  TitleSizes,
  ModalVariant,
  Button,
  ModalBoxBody,
  TextContent,
  Text
} from '@patternfly/react-core';
import { OUIAProps, componentOuiaProps } from '@kogito-apps/common';

interface IOwnProps {
  errorString: string;
  errorModalOpen: boolean;
  handleErrorModal: () => void;
  label: string;
  title: JSX.Element;
}
const ProcessDetailsErrorModal: React.FC<IOwnProps & OUIAProps> = ({
  errorString,
  errorModalOpen,
  handleErrorModal,
  label,
  title,
  ouiaId,
  ouiaSafe
}) => {
  const errorModalContent = (): JSX.Element => {
    return (
      <ModalBoxBody>
        <TextContent>
          <Text>{errorString}</Text>
        </TextContent>
      </ModalBoxBody>
    );
  };
  const errorModalAction: JSX.Element[] = [
    <Button
      key="confirm-selection"
      variant="primary"
      onClick={handleErrorModal}
    >
      OK
    </Button>
  ];

  return (
    <Modal
      variant={ModalVariant.small}
      aria-labelledby={label}
      aria-label={label}
      title=""
      header={
        <Title headingLevel="h1" size={TitleSizes['2xl']}>
          {title}
        </Title>
      }
      isOpen={errorModalOpen}
      onClose={handleErrorModal}
      actions={errorModalAction}
      {...componentOuiaProps(ouiaId, 'process-details-error-modal', ouiaSafe)}
    >
      {errorModalContent()}
    </Modal>
  );
};

export default ProcessDetailsErrorModal;
