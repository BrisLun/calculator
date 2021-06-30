import React from 'react';
import Modal from 'react-modal';

// Modal.setAppElement('#app')

const HistoryModal = ({isOpen, onModalClose}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onModalClose}
  >
    <h3>Selected Option</h3>

  </Modal>
)

export default HistoryModal