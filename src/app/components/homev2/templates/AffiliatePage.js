import React from 'react';
import { Helmet } from 'react-helmet';
import { MainNavView } from '../../views';

const AffiliatePage = () => (
  <MainNavView>
    <Helmet>
      <title>GoRead | Affiliate</title>
    </Helmet>
    <div className="container affiliate-page">
      <img className="title-image" src="/image/become-affiliate.jpg" alt="" />
      <h4 className="subtitle">
        Join our affiliate program!
      </h4>
      <p>
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
        sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua.
      </p>
      <h4 className="subtitle">
        Why partner with GoRead.com?
      </h4>
      <p>
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
        sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
      <h4 className="subtitle">
        How to join the GoRead Affiliate Program
      </h4>
      <p>
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
        sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam
        dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet
        clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est
        Lorem ipsum dolor sit amet.
      </p>
    </div>
  </MainNavView>
);

export default AffiliatePage;
