import React, { PureComponent } from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router'
import Env from '../../constants/env'

class SignUpSpecialOffer extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleClickAccept = () => {
    window.open(Env.REDIRECT_BASE_URL + '/landing1/?tag=readers%2Dpitch', '_blank')
  }

  render() {
    return (
    <div className='signup-special-offer'>
      <h1 className='offer-title'>
        A Very Special Offer From The Founder Of GoRead.com, Ken Dunn.....
      </h1>
      <h3 className='offer-sub-title'>
        How Would You Like Get Paid For Writing Articles For GoRead?
      </h3>
      <div className='video-container'>
        <ReactPlayer
          className='video-player-special-offer'
          playing={true}
          controls={false}
          url='https://player.vimeo.com/video/231130096'
        />
      </div>
      <div className='accept-offer small-10 small-offset-1 large-3'>
        <Link
          to='/'
          onClick={this.handleClickAccept}
        >
          Yes, I want to learn more about getting paid to write articles
        </Link>
      </div>
      <div className='decline-offer small-6 small-offset-3'>
        <Link to='/'>
          No Thanks, Take Me To My New GoRead Page!
        </Link>
      </div>
    </div>
    )
  }
}

export default SignUpSpecialOffer
