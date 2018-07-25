import React from 'react';
import { animateScroll as scroller } from 'react-scroll';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp';
import FooterColumn from './FooterColumn';
import { NewsletterSignUpForm } from '../data/forms';

const FooterColumns = [
  {
    key: 1,
    title: 'Get to Know Us',
    items: [
      { id: 0, isLink: true, action: '/about-us', text: 'About' },
      { id: 1, isLink: true, action: '/career', text: 'Careers' },
      { id: 2, isLink: true, action: '/investor-relations', text: 'Investor Relations' },
      { id: 3, isLink: true, action: '/our-mission', text: 'Our Mission' },
    ],
    show: {
      whenLogged: true,
      whenAnon: true,
    },
  },
  {
    key: 2,
    title: 'Make Money with Us',
    items: [
      { id: 0, isLink: false, action: 'https://go.earnmoneybywriting.com/', text: 'GoRead for Authors', target: '_blank' },
      { id: 1, isLink: false, action: 'https://go.earnmoneybywriting.com/', text: 'Sell Your Books', target: '_blank' },
      { id: 2, isLink: false, action: 'https://rebelpress.com/', text: 'Publish Your Book', target: '_blank' },
      { id: 3, isLink: false, action: 'https://go.earnmoneybywriting.com/', text: 'Promote Your Business', target: '_blank' },
      { id: 4, isLink: false, action: 'https://go.earnmoneybywriting.com/', text: 'Promote Your Products', target: '_blank' },
    ],
    show: {
      whenLogged: true,
      whenAnon: true,
    },
  },
  {
    key: 3,
    title: 'GoRead Children\'s Literacy Fund',
    items: [
      { id: 0, isLink: true, action: '/literacy', text: 'Help Us Help Kids' },
    ],
    show: {
      whenLogged: true,
      whenAnon: true,
    },
  },
  {
    key: 4,
    title: 'Let Us Help You',
    items: [
      { id: 0, isLink: true, action: '/profile/settings', text: 'Your Account' },
      { id: 1, isLink: true, action: '/store/orders', text: 'Your Orders' },
      { id: 2, isLink: false, action: 'https://support.goread.com/', text: 'Help', target:'_blank' },
    ],
    show: {
      whenLogged: true,
      whenAnon: false,
    },
  },
];

const MainFooter = props => (
  <div className="footer d-flex flex-column justify-content-center flex-lg-row justify-content-lg-around">
    <FooterColumn title="Stay in the Know">
      <div className="footer-form">
        <span>Sign up for savings, news and updates.</span>
        <NewsletterSignUpForm />
      </div>
    </FooterColumn>
    { FooterColumns.map(column => <FooterColumn {...column} />) }
    <div className="footer-action-scroll d-none d-lg-block">
      <FontAwesomeIcon onClick={() => scroller.scrollToTop()} icon={faArrowUp} size="lg" />
    </div>
  </div>
);

export default MainFooter;
