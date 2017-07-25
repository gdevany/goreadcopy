import React from 'react'
import { Link } from 'react-router'
const Antispam = () => {
  return (
    <div>
      <h1>Antispam Policy</h1>
      <p>
        Here at <Link to='/'>GoRead.com</Link>, we are strongly against spam,
        junk mail, or unsolicited commercial emails. You don’t want them and we
        don’t want them.
      </p>
      <p>
        Spam is a waste of everyone’s time and it is an offense to the entire
        Internet Community.  In order to avoid spamming people we obey and comply
        with the CAN-SPAM Act of 2003 (Controlling the Assault of Non-Solicited
        Pornography and Marketing Act). We also comply with all other applicable
        unsolicited commercial email laws.
      </p>
      <p>
        So how do we do that?  By making sure you want to learn more about what
        we are sharing.  When you subscribe or opt-in to one of our lists via a
        webinar or one of our websites to get access to our content you are making
        an agreement to receive messaging from either <Link to='/'>GoRead.com</Link>,
        <a href='https://nextcenturypublishing.com'> NextCenturyPublishing.com</a>,
        or The Authority Factory.
        You always have the option to unsubscribe.  You can do that automatically by
        clicking the “unsubscribe” button that is included in every email we send out,
        or logging into GoRead, and updating your notification
        <Link to='/profile/settings'> settings</Link>.
        This even works for past emails from us.
        If you have questions, concerns or feedback about this anti-spam policy, just ask.
        Send an email to <a href='mailto:customerservice@goread.com'>
        customerservice@goread.com </a>
        and let us know what's on your mind.
      </p>
    </div>
  )
}

export default Antispam
