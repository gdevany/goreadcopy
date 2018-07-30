import React from 'react';
import { Helmet } from 'react-helmet';
import { MainNavView } from '../../views';

const AdvertiseYourBusiness = () => (
  <MainNavView>
    <Helmet>
      <title>GoRead | Advertise Your Business</title>
    </Helmet>
    <div className="container advertise-your-business">
      <img className="title-image" src="/image/advertise-business.jpg" alt="" />
      <h4>
        Reach thousands of customers who find, discover and buy at GoRead!
      </h4>
      <p>
        Here at GoRead, you have an unparalleled oppoprtunity to reach people who love books.
        Whether you are an author hoping to connect your book with readers, or a publisher looking
        for your next super-star, let GoRead help you connect.
      </p>
      <h4 className="subtitle">
        Here&#39;s how it works!
      </h4>
      <div className="steps-container">
        <div className="step-one steps">
          <img className="step-image" src="http://via.placeholder.com/100x100" alt="" />
          <p className="center-text">
            Design a high impact advertisement box that is eye-catching and tells members, very
            easily, what you are offering. The ad must be a 180px X 150px .jpg.
          </p>
        </div>
        <div className="step-two steps">
          <img className="step-image" src="http://via.placeholder.com/100x100" alt="" />
          <p className="center-text">
            Click on the Support Link in the left menu, select Advertising, and enter your contact
            info, and attach your ad. We will contact you for payment.
          </p>
        </div>
      </div>
      <h4 className="subtitle">
        How much does it cost?
      </h4>
      <p>
        When you fill out the get started form, you will be asked to provide your credit card info.
        The fee for this services is twenty-five dollars USD ($25.00). Once the advertising begins,
        the fee becomes non-refundable. You will be charged another $25 thirty days later. Should
        you wish to discontinue advertising simply open a support ticket under the advertising tab
        and explain clearly that you wish the ad to stop.
      </p>
      <p>
        If you would like to start advertising. Click on the Support Link in the left menu, select
        Advertising and enter your contact info, and attach your ad. We will contact you for
        payment.
      </p>
      <h4 className="subtitle">
        GoRead Publicity Awareness Package
      </h4>
      <p>
        GoRead is a revolutionary social media site for authors, publisher and book lovers. As
        &#34;the largest book club in the world&#34;, and with over 3 million books for sale you
        WANT to get your book in front of these users.
      </p>
      <h5 className="subtitle">
        To take advantage of this offer contact GoRead at 1 (844) 878-2547.
      </h5>
    </div>
  </MainNavView>
);

export default AdvertiseYourBusiness;
