import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';
import './ErrorModal.css'
const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="!!! שגיאה"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>אוקי</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
