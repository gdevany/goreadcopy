import React from 'react';
import { animateScroll as scroller } from 'react-scroll';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp';
import FooterColumn from './FooterColumn';

const FooterColumns = [
  {
    key: 1,
    title: 'Get to Know Us',
    items: [
      { id: 0, isLink: false, action: '#', text: 'About' },
      { id: 1, isLink: false, action: '#', text: 'Careers' },
      { id: 2, isLink: false, action: '#', text: 'Investor Relations' },
      { id: 3, isLink: false, action: '#', text: 'Our Mission' },
    ],
  },
  {
    key: 2,
    title: 'Make Money with Us',
    items: [
      { id: 0, isLink: false, action: '#', text: 'GoRead for Authors' },
      { id: 1, isLink: false, action: '#', text: 'Sell Your Books' },
      { id: 2, isLink: false, action: '#', text: 'Publish Your Book' },
      { id: 3, isLink: false, action: '#', text: 'Promote Your Business' },
      { id: 4, isLink: false, action: '#', text: 'Promote Your Products' },
    ],
  },
  {
    key: 3,
    title: 'GoRead Children\'s Literacy Fund',
    items: [
      { id: 0, isLink: false, action: '#', text: 'Help Us Help Kids' },
    ],
  },
  {
    key: 4,
    title: 'Let Us Help You',
    items: [
      { id: 0, isLink: false, action: '#', text: 'Your Account' },
      { id: 1, isLink: false, action: '#', text: 'Your Orders' },
      { id: 2, isLink: false, action: '#', text: 'Returns' },
      { id: 3, isLink: false, action: '#', text: 'Help' },
    ],
  },
];

const MainFooter = props => (
  <div className="footer d-flex flex-column justify-content-center flex-sm-row justify-content-sm-around">
    <FooterColumn title="Stay in the Know">
      <div className="footer-form">
        <span>Sign up for savings, news and updates.</span>
        <form action="#" className="form-inline newsletter">
          <input type="text" className="form-control mb-2" placeholder="Enter your e-mail address" />
          <button type="submit" className="btn mb-2">GO</button>
        </form>
      </div>
    </FooterColumn>
    { FooterColumns.map(column => <FooterColumn {...column} />) }
    <div className="footer-action-scroll d-none d-sm-block">
      <FontAwesomeIcon onClick={() => scroller.scrollToTop()} icon={faArrowUp} size="lg" />
    </div>
  </div>
);

export default MainFooter;
