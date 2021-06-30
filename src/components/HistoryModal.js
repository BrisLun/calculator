import React from 'react';
import Modal from 'react-modal';

// Modal.setAppElement('#app')

const HistoryModal = ({open_history, onModalClose}) => (
  <Modal
    isOpen={!!open_history}
    contentLabel="history"
    onRequestClose={onModalClose}
  >
    <h3>Selected Option</h3>
    {/* {props.selectedTodo && <p>{props.selectedTodo}</p>}
    <button onClick={props.onModalClose}>Okay</button> */}
  </Modal>
)

export default HistoryModal