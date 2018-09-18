import React from 'react';
import { BaseNavView } from '../views';

const PublisherEnrollment = () => (
  <BaseNavView>
    <div className="publisher-enrollment-container">
      <div className="title-container">
        <h1>
          Publisher Pages
        </h1>
      </div>
      <div className="context-container">
        <div className="text-container">
          <h5>
            Why be a publisher on GR
          </h5>
          <p>
            GoRead was created to give people who love books, around the world,
            a chance to build a virtual version of their home libraries and earn
            Litcoin credits that they can redeem to purchase real physical books.
            In creating goread.com, we realized that it would be important to have
            data on every book, every author and every publisher on the planet.
            As a result, we have strategic partnerships that give us access to all
            this data.  You will see that your company already has a page!
          </p>
        </div>
        <div className="text-container">
          <h5>
            Why would you want to take control of the page?
          </h5>
          <p>
            GoRead is quickly turning into the largest community of readers & authors
            on the planet.  As you know, the vast majority of avid readers also dream
            of, one day, becoming an author.  They are already scanning through the
            publisher’s pages, looking for info.
          </p>
          <p>
            If you decide, set up your publisher’s page, you are drastically increasing
            the chances of someone noticing you.  As well, your author’s will appreciate
            it, if you take the time to link their profiles to your page and give them
            even more publicity.  Part of the plan here at GoRead is to make it easier
            to help authors and readers to find publishers.  We will be releasing an
            index of all the publishers here.  Publishing companies will be ranked by
            the number of fans, number of authors & how active you are here on the platform.
          </p>
          <p>
            The most active publishers will be invited to join our steering committee
            and also be given free Litcoins for advertising.
          </p>
          <p>
            Once you have claimed your page, you are free to add video, stories, articles
            and anything else you think may help bring more attention to you. Just
            remember, we reserve the right to review all content to ensure that it
            reflects the mission that we all have here.
          </p>
          <p>
            If you already have a page here, then find your page and click the Claim Link
            under the Publishers name to begin the process to claim it. It’s looking
            pretty ugly right now and is begging for you to spruce it up.
          </p>
          <p>
            If you don’t have a publisher’s page yet, click the link below and get the
            process started.
          </p>
        </div>
      </div>
      <div className="button-container">
        <a className="apply-button" href="/submission/new_publisher/">
          Apply to Publisher Program
        </a>
      </div>
    </div>
  </BaseNavView>
);

export default PublisherEnrollment;
