import React from 'react';
import Modal from 'react-modal';
function MessageModal({ modalIsOpen, closeModal, modalMessage }) {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Message Modal"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50%',
                    height: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }}
        >
            <h2>Message</h2>
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Close</button>
        </Modal>
    );
}

export default MessageModal;