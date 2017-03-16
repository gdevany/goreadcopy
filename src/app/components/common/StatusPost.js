import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PrimaryButton } from './'
import CameraIcon from 'material-ui/svg-icons/image/camera'
import { Posts } from '../../services/api/currentReader'

const { postNewMessage } = Posts
const mentionPattern = /\B@(User|)[a-z0-9_-]+/gi

class StatusPost extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      body: '',          // Plain text post string
      mentions: '',      // String with mentions
      image: '',         // ID of the image
      targetId: '',      // ID of the profile
      activeContent: '',  // Filled by liveUrl
      suggestions: [{
        id: 'walter',
        display: 'Walter White',
        image: 'url',
        type: 'User'
      }, {
        id: 'jesse',
        display: 'Jesse Pinkman',
        image: 'url',
        type: 'User'
      }],
      showSuggestions: false,
      showImagePreview: false,
      showVideoPreview: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.getPostParams = this.getPostParams.bind(this)
    this.checkMentions = this.checkMentions.bind(this)
  }

  onUploadButtonClick(e) {
    console.log('Upload image')
    e.preventDefault()
  }

  onPostButtonClick(e) {
    postNewMessage(getPostParams())
  }

  handleChange(event) {
    const { value } = event.target
    this.checkMentions(value)
    this.setState({
      body: value,
      mentions: value
    })
  }

  checkMentions(value) {
    const mentions = value.match(mentionPattern)
    if (mentions && mentions.length > 0) {
      this.setState({ showSuggestions: true })
    } else {
      this.setState({ showSuggestions: false })
    }
  }

  getPostParams() {
    const answer = {
      body,
      mentions,
      image,
      targetId,
      activeContent
    } = this.state

    return answer
  }

  handleSuggestionClick(e) {
    console.log(this)
    console.log('Clicked on ', e.target)
  }

  handleRenderSuggestion(entry) {
    // Create a new component SuggestionItem and pass item as a prop
    // Also, pass a handler to change the value of the state.body
    return (
      <li
        key={entry.id}
        item={entry}
        className='suggestion'
        onClick={this.handleSuggestionClick}
      >
        <img src={entry.image} alt='User image'/>
        <span>{entry.type}: { entry.display }</span>
      </li>
    )
  }

  render() {
    /*const url = 'https://staging2.readerslegacy.com/media/' +
      'cache/39/39/39392dda558224b808b480e31c768bee.jpg'
    const users = [
      {
        id: 'walter',
        display: 'Walter White',
        image: url,
        type: 'User'
      },
      {
        id: 'jesse',
        display: 'Jesse Pinkman',
        image: url,
        type: 'User'
      },
      {
        id: 'gus',
        display: 'Gustavo "Gus" Fring',
        image: url,
        type: 'User'
      },
      {
        id: 'saul',
        display: 'Saul Goodman',
        image: url,
        type: 'User'
      },
      {
        id: 'hank',
        display: 'Hank Schrader',
        image: url,
        type: 'User'
      },
      {
        id: 'skyler',
        display: 'Skyler White',
        image: url,
        type: 'User'
      },
      {
        id: 'mike',
        display: 'Mike Ehrmantraut',
        image: url,
        type: 'User'
      },
    ]*/

    return (
      <div className='statuspost'>
        <div className='row'>
          <textarea cols='30' rows='4' onChange={this.handleChange} value={this.state.body} />
          {this.state.showSuggestions ? (
            <ul className='suggestion-list'>
              {this.state.suggestions.map((entry, index)=>this.handleRenderSuggestion(entry))}
            </ul>) : null
          }
        </div>
        <div className='row'>
          <div className='small-4 column'>
            <a href='javascript:void(0)' onClick={this.onUploadButtonClick}>
              <CameraIcon />
            </a>
          </div>
          <div className='small-4 column'>
            <PrimaryButton label='Post' onClick={this.onPostButtonClick}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, null)(StatusPost)
