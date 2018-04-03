import React from 'react';
import { Dialog } from 'material-ui';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const styles = {
  modalBody: {
    marginTop: -80,
  },
  modalContent: {
    maxWidth: '100%',
  },
};

const RegisterSignInModal = (props) => {
  const {
    modalOpen,
    handleClose,
  } = props;
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

RegisterSignInModal.propTypes = {
  modalOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

RegisterSignInModal.defaultProps = {
  modalOpen: false,
  handleClose: null,
};

export default RegisterSignInModal;
