import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ExternalRoutes as routes } from '../../constants';
import AuthedRedirect from './AuthedRedirect';
import { AuthView } from './auth';

const styles = {
  columnUl: {
    fontSize: 14,
    listStyle: 'none',
  },

  footerContainer: {
    padding: '50px 0',
  },
};

const Footer = () => {
  const {
    support,
    authors,
    publishers,
    advertisers,
    media,
    childrensLiteracy,
    litcoins,
  } = routes;

  return (
    <div className="row footer-links" style={styles.footerContainer}>
      <div className="small-12 medium-3 medium-offset-1 columns">
        <AuthView forLoggedOut>
          <ul style={styles.columnUl}>
            <li>
              <Link to="/accounts/login">
                Log in
              </Link>
            </li>
            <li>
              <Link to="/accounts/signin">
                Sign up
              </Link>
            </li>
          </ul>
        </AuthView>
      </div>
      <div className="small-12 medium-3 medium-offset-1 columns">
        <ul style={styles.columnUl}>
          <li>
            <AuthedRedirect.Link
              href={authors()}
            >
              Authors
            </AuthedRedirect.Link>
          </li>
          <li>
            <AuthedRedirect.Link
              href={publishers()}
            >
              Publishers
            </AuthedRedirect.Link>
          </li>
          <li>
            <AuthedRedirect.Link
              href={advertisers()}
            >
              Advertisers
            </AuthedRedirect.Link>
          </li>
          <li>
            <AuthedRedirect.Link
              href={media()}
            >
              Media
            </AuthedRedirect.Link>
          </li>
          <li>
            <AuthedRedirect.Link
              href={childrensLiteracy()}
            >
              Children's Literacy
            </AuthedRedirect.Link>
          </li>
          <li>
            <AuthedRedirect.Link
              href={litcoins()}
            >
              Litcoins
            </AuthedRedirect.Link>
          </li>
        </ul>
      </div>
      <div className="small-12 medium-3 medium-offset-1 columns">
        <ul style={styles.columnUl}>
          <li>
            <AuthedRedirect.Link
              href={support()}
            >
              Support
            </AuthedRedirect.Link>
          </li>
          <li>
            <Link to="/privacy">
              Privacy
            </Link>
          </li>
          <li>
            <Link to="/terms">
              Terms
            </Link>
          </li>
          <li>
            <Link to="/antispam">
              Antispam
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  currentReader,
}) => (
  currentReader
);

export default connect(mapStateToProps, null)(Footer);
