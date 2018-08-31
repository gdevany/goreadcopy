import React from 'react';
import { BaseNavView } from '../views';

const Litcoins = () => (
  <BaseNavView>
    <div className="litcoins-page-container">
      <div className="video-container">
        <iframe
          src="https://player.vimeo.com/video/155396214?api=1&autoplay=1"
          width="816"
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <div className="litcoins-content-container">
        <div className="litcoins-paragraph">
          <div className="litcoins-text-container">
            <h5>
              Litcoin Credits Affinity Program
            </h5>
            <p>
              Litcoin credits are a virtual currency created exclusively
              to incentivize users to engage in goread.com.  The
              program is based on a cash equivalent points program that is
              detailed herein.   Litcoin credits carry no value outside of
              this virtual community and there is no cash equivalent.
            </p>
          </div>
          <div className="litcoins-text-container">
            <h5>
              How Does It work?
            </h5>
            <p>
              The idea is simple:  Its like a fun game of engagement.
              As you add books to your virtual library, follow your
              friends, become fans of your favourite authors, share
              interesting posts on our social media channels, link your
              other social media channels to your goread.com
              account, make posts, etc you will be awarded badges of
              recognition.  For every badge your earn, you will also be
              given Litcoins.  You can grow your Litcoin bank account as
              large as you want to and there is no limit to the amount of
              Litcoin credits you can accumulate, but you must redeem the
              credits within 12 months.
            </p>
          </div>
          <div className="litcoins-text-container">
            <h5>
              What can you use Litcoin credits for?
            </h5>
            <p>
              Well books, of course! You can use your Litcoins to buy physical books,
              you can redeem your Litcoins for almost any item that is sold in the
              book store. Although Litcoin credits are actually a fictitious currency
              outside of our community, in goread.com Litcoin credits are as good as
              money when buying books.
            </p>
          </div>
          <div className="litcoins-text-container">
            <h5>
              Earning Litcoin credits by buying books.
            </h5>
            <p>
              You will earn Litcoin credits for every book you buy.  At
              goread.com we allow independent authors to create
              their own book pages and offer their self-published works
              for sale.  As a result of this Indy book program and special
              relationships that goread.com has with it’s publisher
              partners, the amount of Litcoins you will receive for a book
              purchase will vary depending on the title, but you can be
              assured that the more books your buy, the more Litcoins you
              will accumulate.
            </p>
          </div>
          <div className="litcoins-text-container">
            <h5>
              How do you earn Litcoins for your activities in the community?
            </h5>
            <p>
              It is really simple, the more you engage the more credits
              you accumulate.  Follow the chart below to see what
              activities will earn you the most Litcoin credits.
            </p>
          </div>
        </div>
        <div className="litcoins-image-container">
          <img src="/image/litcoins.jpg" alt="" />
        </div>
      </div>
      <div className="litcoins-table-container">
        <table className="litcoins-table-activity">
          <thead>
            <tr>
              <td width="50%">
                <h5 className="title">
                  Activity
                </h5>
              </td>
              <td>
                <h5 className="title">
                  # of Litcoins credits
                </h5>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                each book added
              </td>
              <td>
                1
              </td>
            </tr>
            <tr>
              <td>
                5th book added
              </td>
              <td>
                5
              </td>
            </tr>
            <tr>
              <td>
                10th book added
              </td>
              <td>
                10
              </td>
            </tr>
            <tr>
              <td>
                15th book added
              </td>
              <td>
                15
              </td>
            </tr>
            <tr>
              <td>
                20th book added
              </td>
              <td>
                20
              </td>
            </tr>
            <tr>
              <td>
                25th book added
              </td>
              <td>
                25
              </td>
            </tr>
            <tr>
              <td>
                50th book added
              </td>
              <td>
                50
              </td>
            </tr>
            <tr>
              <td>
                100th book added
              </td>
              <td>
                100
              </td>
            </tr>
            <tr>
              <td>
                150th book added
              </td>
              <td>
                150
              </td>
            </tr>
            <tr>
              <td>
                200th book added
              </td>
              <td>
                200
              </td>
            </tr>
            <tr>
              <td>
                every 50th book added after
              </td>
              <td>
                50
              </td>
            </tr>
          </tbody>
        </table>
        <table className="litcoins-table-fan-follows">
          <thead>
            <tr>
              <td width="50%">
                <h5 className="title">
                  New Fans following you
                </h5>
              </td>
              <td>
                <h5 className="title">
                  # of Litcoins credits
                </h5>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                50
              </td>
              <td>
                50
              </td>
            </tr>
            <tr>
              <td>
                100
              </td>
              <td>
                100
              </td>
            </tr>
            <tr>
              <td>
                500
              </td>
              <td>
                500
              </td>
            </tr>
            <tr>
              <td>
                1000
              </td>
              <td>
                1000
              </td>
            </tr>
            <tr>
              <td>
                every 500 after
              </td>
              <td>
                an additional 500
              </td>
            </tr>
          </tbody>
        </table>
        <table className="litcoins-table-author-follows">
          <thead>
            <tr>
              <td width="50%">
                <h5 className="title">
                  Number of authors you are following
                </h5>
              </td>
              <td>
                <h5 className="title">
                  # of Litcoins credits
                </h5>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                each author followed
              </td>
              <td>
                1
              </td>
            </tr>
            <tr>
              <td>
                10th author
              </td>
              <td>
                10
              </td>
            </tr>
            <tr>
              <td>
                20th author
              </td>
              <td>
                20
              </td>
            </tr>
            <tr>
              <td>
                every additional 10th author
              </td>
              <td>
                10
              </td>
            </tr>
          </tbody>
        </table>
        <table className="litcoins-table-shared-links">
          <thead>
            <tr>
              <td width="50%">
                <h5 className="title">
                  Shared Links onto other social media pages
                </h5>
              </td>
              <td>
                <h5 className="title">
                  # of Litcoins credits
                </h5>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                each link shared
              </td>
              <td>
                2
              </td>
            </tr>
            <tr>
              <td>
                10th shared link
              </td>
              <td>
                20
              </td>
            </tr>
            <tr>
              <td>
                20th shared link
              </td>
              <td>
                40
              </td>
            </tr>
            <tr>
              <td>
                50th shared link
              </td>
              <td>
                100
              </td>
            </tr>
            <tr>
              <td>
                100th shared link
              </td>
              <td>
                200
              </td>
            </tr>
            <tr>
              <td>
                every additional 50th shared link
              </td>
              <td>
                100
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="litcoins-content-container">
        <div className="litcoins-paragraph">
          <div className="litcoins-text-container">
            <h5>
              How do you use your Litcoins?
            </h5>
            <p>
              We have tried to make this as simple as possible, as you are
              shopping in the store, buying books or selecting your adds.
              Your total due will be displayed in US dollars.  Directly
              beside the US dollar total will be your total in Litcoins.
              Adjacent to your total will be the total of Litcoins in
              your account.  If you would like to pay for your purchase
              with your Litcoins, simply hit the “use my Litcoins” button.
            </p>
          </div>
          <div className="litcoins-text-container">
            <h5>
              Doing more with your Litcoins!!!!
            </h5>
            <p>
              At goread.com, we are committed to changing the way
              people write, read and experience books.  We are also
              committed to giving back with our GoRead Gives
              program.    We will donate the cash equivalent of 5% of all
              the Litcoins that are redeemed on an annual basis and donate
              them to worthy “book-related” causes.  If 1 million Litcoins
              are redeemed at goread.com, we will donate $50,000
              USD to these causes.  The more Litcoins that are spent, the
              more funds we donate.
            </p>
            <p>
              On an annual basis, GoRead will receive
              applications for funding support from worthy organizations
              that are running not-for-profit causes that are related to
              books.  Our private review panel will decide who the worthy
              groups will be and how much of the cash they will receive.
              The lucky recipients will be invited to attend the annual
              GoRead Choice Awards and Writer’s Conference where
              they will be awarded their funding.
            </p>
          </div>
          <div className="litcoins-text-container">
            <h5>
              Terms & conditions
            </h5>
            <p>
              Litcoin credits can be redeemed for book purchases,
              pay-per-click advertising, GoRead Buzz subscription and
              other products and service that may be introduced at later
              times.
            </p>
            <p>
              Litcoin credits are a trademarked program of
              GoRead and are not transferable to other programs.
            </p>
            <p>
              Litcoin credits may not be accumulated for more than 12
              months.
            </p>
            <p>
              goread.com reserves the right to cancel the
              participation of any user in the Litcoin affinity program
              if they are found to be manipulating the program or created
              fake results/purchases.
            </p>
            <p>
              When litcoin credits are redeemed for purchases, these
              points are subject to deduction in event of a return of
              goods purchased.
            </p>
            <p>
              goread.com reserves the right to change, cancel,
              amend, or  enhance this program at their sole discretion.
            </p>
          </div>
        </div>
      </div>
    </div>
  </BaseNavView>
);

export default Litcoins;
