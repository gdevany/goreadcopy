import React from 'react';
import { Link } from 'react-router';
import ReactPlayer from 'react-player';
import { Helmet } from 'react-helmet';
import { MainNavView } from '../../views';

const AboutUs = () => (
  <MainNavView>
    <Helmet>
      <title>GoRead | About Us</title>
    </Helmet>
    <div className="container aboutUs">
      <img className="title-image" src="/image/about-us.jpg" alt="" />
      <h4 className="subtitle center-text">
        Uniting Readers Around The World To Eliminate Illiteracy in Children!
      </h4>
      <ReactPlayer
        className="video-player-landing"
        playing
        controls={false}
        url="https://player.vimeo.com/video/222335035"
      />
      <p>
        GoRead is a social network for people who love to read. It is also one of the largest book
        retailers on the Internet.
      </p>
      <p className="subtitle">
        The best part:
      </p>
      <p>
        Every day, thousands of readers are joining GoRead. When they join, they build libraries of
        books that they have read. They are also creating wishlists of books they want to read in
        the future.
      </p>
      <p>
        Just like other social networks; you make posts, like posts, follow other readers, follow
        other readers, follow your favorite authors, write reviews and so much more...
      </p>
      <p>
        For every one of these activities, you collect LitCoins. LitCoins are a points program.
        You can collect LitCoins and use them to buy your next book. When you join, we will
        award you up to 40,000 LitCoins, if you take the time to complete your profile and add
        some books to your library. Joining is FREE, and it&#39;s like a game. As you go through
        the joining process, you are awarded LitCoins every step of the way: when you choose your
        password, tell us your favorite book genres, follow your first authors, add your first
        books to your library, and so much more.
      </p>
      <p>
        40,000 LitCoins is enough to get your first book for FREE! You also get LitCoins when you
        buy your books here!
      </p>
      <p className="subtitle">
        Why buy your books here?
      </p>
      <p>
        Because it feels good!
      </p>
      <p>
        Buy A Book, Give A Book!
      </p>
      <p>
        Every time a book is bought at GoRead, we give a book to a child who needs it. The
        children&#39;s illiteracy statics are scary. We believe that if every child in the world
        could read, it would make the world a better place. So, we created GoRead days, where we
        go out to schools with books, and authors, and a lot of fun. You can even help us with
        GoRead days, if you want to.
      </p>
      <p>
        Well thats enough for now. What are you waiting for?
      </p>
      <p>
        If you love to read, join our social network, meet other readers around the world, follow
        your favorite authors and help us kick illiteracy in the butt!
      </p>
      <p>
        If you are going to buy books, why not make a difference in the life of a child?
      </p>
      <div className="button-container">
        <Link className="create-button" to="/accounts/signup">
          Create an account now
        </Link>
      </div>
    </div>
  </MainNavView>
);

export default AboutUs;
