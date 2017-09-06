import React, { PureComponent } from 'react'
import ReactPlayer from 'react-player'

class SignUpSpecialOffer extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleClickAccept = () => {
    window.open('https://wasbmasterclass.com/auto-webinar-registration-13174016', '_blank')
    window.location.href = '/'
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
        <a
          onClick={this.handleClickAccept}
        >
          Yes, I Want To Learn More About Writing A Book!
        </a>
      </div>
      <div className='decline-offer small-6 small-offset-3'>
        <a href='/'>
          No Thanks, Take Me To My New GoRead Page!
        </a>
      </div>
    </div>
    )
  }
}

export default SignUpSpecialOffer
