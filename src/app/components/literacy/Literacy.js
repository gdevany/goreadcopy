import React from 'react';
import { Link } from 'react-router';
import { MainNavView } from '../views';

const Literacy = () => (
  <MainNavView>
    <div className="container">
      <div className="literacy-main-container row">
        <div className="literacy-title">
          <p>
            Buy A Book,
            <strong>
              &nbsp;Give A Book!
            </strong>
          </p>
        </div>
        <div className="literacy-content">
          <div className="literacy-facts">
            <p className="literacy-facts-title">
              Did you know?
            </p>
            <p>
              For each book you purchase in our online bookstore,
              <strong>
                &nbsp;we match your purchase&nbsp;
              </strong>
              by providing a book to a child to promote literacy.
            </p>
            <div className="literacy-picture literacy-mobile">
              <img src="/image/literacy-children.jpg" alt="" />
            </div>
            <p className="literacy-facts-focus">
              Shockingly, even in our prosperous society,
               we have an illiteracy crisis:
            </p>
            <ul className="literacy-facts-list">
              <li>
                14 percent of Americans are considered illiterate.
              </li>
              <li>
                36 percent of people worlwide can&#39;t read at an 8th grade level
                 in their native language.
              </li>
              <li>
                85 percent of people who commit criminal offenses in the
                 United States are considered to be illiterate.
              </li>
              <li>
                Over 19 percent of all high school graduates in the
                 United States cannot read.
              </li>
              <li>
                There is a direct link between literacy, crime, poverty and divorce.
              </li>
              <li>
                And.. these stadistics have not changed in the past 10 years!
              </li>
            </ul>
          </div>
          <div className="literacy-picture literacy-desktop">
            <img src="/image/literacy-children.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid mx-0 px-0">
      <div className="literacy-main-container mx-0 px-0">
        <div className="literacy-division">
          GoRead&#39;s mission is to eliminate illiteracy... one book at a time
        </div>
        <section className="literacy-background">
          <div className="literacy-content vertical">
            <span className="literacy-goread">
              GoRead
            </span>
            <div className="literacy-subtitle">
              LET&#39;S FIX THIS TOGETHER!
            </div>
            <div className="literacy-lines">
              <div className="outer-line">
                <div className="inner-line" />
              </div>
            </div>
            <div className="literacy-subcontent">
              <p>
                The mission of the GoRead team is to give children the motivation
                to read, the desire to read and the ability to read.
              </p>
              <p>
                You love reading. You love books. Help us share that love with
                kids who need it the most!
              </p>
              <p>
                <strong>
                  BUY a book, GIVE a book.&nbsp;
                </strong>
                See our counter at the top of our page where we&#39;ve started
                counting how many books we are providing.
              </p>
              <p>
                Let&#39;s kick illiteracy to the curb and show kids that reading
                is COOL!
              </p>
              <p>
                Join us in our mission-- you don&#39;t have to change a thing!
                 Just keep buying the books you already love, and we&#39;ll
                 make your purchase count.
              </p>
            </div>
            <Link to="/store" className="literacy-button">
              CLICK HERE TO BUY A BOOK/GIVE A BOOK
            </Link>
          </div>
        </section>
      </div>
    </div>
  </MainNavView>
);

export default Literacy;
