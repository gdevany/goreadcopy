import React from 'react';
import { animateScroll as scroller } from 'react-scroll';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp';
import FooterColumn from './FooterColumn';

const GetToKnowUs = [
  { id: 0, isLink: false, action: "#", text: "About" },
  { id: 1, isLink: false, action: "#", text: "Careers" },
  { id: 2, isLink: false, action: "#", text: "Investor Relations" },
  { id: 3, isLink: false, action: "#", text: "Our Mission" },
];

const MakeMoneyWithUs = [
  { id: 0, isLink: false, action: "#", text: "GoRead for Authors" },
  { id: 1, isLink: false, action: "#", text: "Sell Your Books" },
  { id: 2, isLink: false, action: "#", text: "Publish Your Book" },
  { id: 3, isLink: false, action: "#", text: "Promote Your Business" },
  { id: 4, isLink: false, action: "#", text: "Promote Your Products" },
];

const GoReadChildren = [
  { id: 0, isLink: false, action: "#", text: "Help Us Help Kids" },
];

const LetUsHelpYou = [
  { id: 0, isLink: false, action: "#", text: "Your Account" },
  { id: 1, isLink: false, action: "#", text: "Your Orders" },
  { id: 2, isLink: false, action: "#", text: "Returns" },
  { id: 3, isLink: false, action: "#", text: "Help" },
];

const MainFooter = props => (
  <div className="footer d-flex flex-column justify-content-center flex-sm-row justify-content-sm-around">
    <FooterColumn header="Stay in the Know">
      <span>Sign up for savings, news and updates.</span>
      <form action="#" className="form-inline newsletter">
        <input type="text" className="form-control mb-2" placeholder="Enter your e-mail address" />
        <button type="submit" className="btn mb-2">GO</button>
      </form>
    </FooterColumn>
    <FooterColumn header="Get to Know Us" list={GetToKnowUs} />
    <FooterColumn header="Make Money with Us" list={MakeMoneyWithUs} />
    <FooterColumn header="GoRead Children's Literacy Fund" list={GoReadChildren} />
    <FooterColumn header="Let Us Help You" list={LetUsHelpYou} />
    <div className="footer-action-scroll d-none d-sm-block">
      <FontAwesomeIcon onClick={() => scroller.scrollToTop()} icon={faArrowUp} size="lg" />
    </div>
  </div>
);

export default MainFooter;
