import React from 'react';
import { Dialog } from 'material-ui';
import { Link } from 'react-router';

const styles = {
  modalBody: {
    marginTop: -80,
  },
  modalContent: {
    maxWidth: '100%',
  },
};

const RegisterSignInModal = () => {
  const {
    modalOpen,
    handleClose,
  } = this.props;
  return (
    <div>
      <Dialog
        bodyClassName="register-sign-in-modal"
        bodyStyle={styles.modalBody}
        contentStyle={styles.modalContent}
        modal
        open={modalOpen}
        onRequestClose={handleClose}
        autoDetectWindowHeight={false}
        autoScrollBodyContent
      >
        <img
          src="/image/close.png"
          alt=""
          className="general-font center-text search-modal-x"
          onClick={handleClose}
        />
        <div className="register-sign-in-modal-container">
          <figure className="logo-container-figure">
            <img src="/image/logo.png" alt="" />
          </figure>
          <p>Where readers and authors come together</p>
          <div className="register-sign-btns-container">
            <div className="register-sign-in-buttons-container">
              <Link
                className="sign-in-button"
                to="/accounts/signin"
              >
                Log In
              </Link>
            </div>
            <div className="register-sign-in-buttons-container">
              <Link
                className="register-button"
                to="/accounts/login"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default RegisterSignInModal;
