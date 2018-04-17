import React from 'react';

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

const parseLinkList = ({ id, isLink, action, text }) => (
  isLink ?
    <Link key={id} to={action}>{text}</Link> :
    <a key={id} href={action}>{text}</a>
);

const FooterSection = ({ header, list, children }) => (
  <div className="footer-section d-flex flex-column justify-content-start align-items-start">
    <span className="footer-section-header">{header}</span>
    {
      list ?
        list.map(parseLinkList) :
        children
    }
  </div>
);

const NewsletterSignup = props => (
  <FooterSection header="Stay in the Know">
    <span>Sign up for savings, news and updates.</span>
    <form action="#" className="form-inline newsletter">
      <input type="text" className="form-control mb-2" placeholder="Enter your e-mail address" />
      <button type="submit" className="btn mb-2">GO</button>
    </form>
  </FooterSection>
);

const MainFooter = props => (
  <div className="footer d-flex flex-row justify-content-around">
    <NewsletterSignup />
    <FooterSection header="Get to Know Us" list={GetToKnowUs} />
    <FooterSection header="Make Money with Us" list={MakeMoneyWithUs} />
    <FooterSection header="GoRead Children's Literacy Fund" list={GoReadChildren} />
    <FooterSection header="Let Us Help You" list={LetUsHelpYou} />
  </div>
);

export default MainFooter;
