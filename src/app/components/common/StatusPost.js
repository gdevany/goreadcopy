import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PrimaryButton } from './'
import CameraIcon from 'material-ui/svg-icons/image/camera'
import { Posts } from '../../services/api/currentReader'
import SuggestionList from './SuggestionList'
import { Search } from '../../services/api'

const { search } = Search
const { postNewMessage } = Posts
const mentionPattern = /\B@(?!Reader|Author|Publisher|Book)\w+\s?\w+/gi

class StatusPost extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      post: {
        body: '',           // Plain text post string
        mentions: '',       // String with mentions
        image: '',          // ID of the image
        targetId: '',       // ID of the profile
        activeContent: '',  // Filled by liveUrl
      },
      mentionsArray: [],
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
    this.replaceMention = this.replaceMention.bind(this)
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
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
    const mentions = this.checkMentions(value)
    this.setState({
      post: {
        body: value,
        mentions: value,
      },
      mentionsArray: mentions
    })
  }

  getMentionsArray() {
    return this
  }

  getMentions(query) {
    const body = {
      author: query,
      reader: query,
      book: query,
      publisher: query
    }
    console.log('searching')
    search(body)
      .then((res) => this.setState({ suggestions: res.data }))
      .then(() => this.setState({ showSuggestions: true }))
  }

  checkMentions(value) {
    const mentions = value.match(mentionPattern)
    if (mentions && mentions.length > 0) {
      this.getMentions(mentions[mentions.length - 1].replace('@', ''))
      return mentions
    }
    this.setState({ showSuggestions: false })
    return []
  }

  getPostParams() {
    const answer = {
      body,
      mentions,
      image,
      targetId,
      activeContent
    } = this.state.post

    return answer
  }

  handleSuggestionClick(e) {
    e.stopPropagation()
    const { type, display } = e.target.dataset
    this.replaceMention(type, display)
  }

  replaceMention(type, display) {
    const lastMention = this.state.mentionsArray[this.state.mentionsArray.length - 1]
    const newString = this.state.post.body.replace(lastMention, `@${type}:${display} `)
    this.checkMentions(newString)
    this.setState({
      post: {
        body: newString
      }
    })
    this.refs.statuspost.focus()
  }

  render() {
    return (
      <div className='statuspost'>
        <div className='row'>
          <textarea
            cols='30'
            rows='4'
            ref='statuspost'
            onChange={this.handleChange} value={this.state.post.body}
          />
          {this.state.showSuggestions ?
            (<SuggestionList
              entries={this.state.suggestions}
              onMentionListClick={this.handleSuggestionClick}
             />
            ) : null
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
