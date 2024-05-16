import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

interface GenericModalProps {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  toggle,
  title,
  children,
  onConfirm,
  confirmText = 'Enviar',
  cancelText = 'Cancelar'
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onConfirm}>
          {confirmText}
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          {cancelText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default GenericModal;