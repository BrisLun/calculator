import React from 'react';
import Modal from 'react-modal';
import History from './History';

Modal.setAppElement('*')

function HistoryModal ({isOpen, onModalClose, history, onClickHistory}) {
    const modalStyle = {
        overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          content: {
            position: 'relative',
            listStyle: 'none',
            width: '33%',
            height: 'fit-content',
            maxHeight: '300px',
            top: '10%',
            left: '33%',
            right: '33%',
            bottom: '10%',
            border: '1px solid #ccc',
            textAlign: 'center',
            backgroundColor: 'white',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '10px',            
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
          }
      }

    return (    
        <Modal
            isOpen={isOpen}
            onRequestClose={onModalClose}
            style={modalStyle}
        >
            {history.map(
                (value, index) =>
                    (
                        <li key={index}>
                            <History className='history-line' onClick={onClickHistory}
                                formula={value.formula} result={value.result}/>
                        </li>
                    )
                )}
        </Modal>
    );
}

export default HistoryModal