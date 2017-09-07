import React, { PureComponent } from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router'
import Env from '../../constants/env'

class SignUpSpecialOffer extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleClickAccept = () => {
    window.open(Env.REDIRECT_BASE_URL + '/wasb_masterclass', '_blank')
  }

  render() {
    return (
    <div className='signup-special-offer'>
      <h1 className='offer-title'>
        A Very Special Offer....
      </h1>
      <h3 className='offer-sub-title'>
        Have You Ever Thought About Writing A Book?
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
          Yes, I Want To Learn More About Writing A Book!
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
