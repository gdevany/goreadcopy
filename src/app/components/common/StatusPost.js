import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CameraIcon from 'material-ui/svg-icons/action/camera-enhance'
import { Posts } from '../../services/api/currentReader'
import SuggestionList from './SuggestionList'
import { Search } from '../../services/api'
import { debounce } from 'lodash'
import Dropzone from 'react-dropzone'

const { search } = Search
const { postNewMessage } = Posts
const mentionPattern = /\B@(?!Reader|Author|Publisher|Book)\w+\s?\w+/gi

class StatusPost extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      body: '',           // Plain text string
      mentions: '',       // String with mentions
      image: '',          // ID of the image
      targetId: '',       // ID of the profile
      activeContent: '',  // Filled by liveUrl
      mentionsArray: [],
      suggestions: [],
      showSuggestions: false,
      showImagePreview: false,
      showVideoPreview: false,
      textareaOpen: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.checkMentions = this.checkMentions.bind(this)
    this.replaceMention = this.replaceMention.bind(this)
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
    this.onPostButtonClick = this.onPostButtonClick.bind(this)
    this.handleTextAreaClick = this.handleTextAreaClick.bind(this)
    this.handleTextAreaClose = this.handleTextAreaClose.bind(this)
    this.onUploadButtonClick = this.onUploadButtonClick.bind(this)
    this.getMentions = debounce(this.getMentions, 250)
  }

  onUploadButtonClick(event) {
    event.preventDefault()
    this.dropzone.open()
  }

  onPostButtonClick(event) {
    const {
      body,
      mentions,
      image,
      targetId,
      activeContent,
    } = this.state
    postNewMessage({
      body,
      mentions,
      image,
      targetId,
      activeContent
    })
  }

  handleChange(event) {
    const { value } = event.target
    const mentions = this.checkMentions(value)
    this.setState({
      body: value,
      mentions: value,
      mentionsArray: mentions
    })
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

  handleSuggestionClick(event) {
    event.stopPropagation()
    const { type, display, contenttype, id } = event.target.dataset
    this.replaceMention(type, display, contenttype, id)
  }

  replaceMention(type, display, contentType, id) {
    const { body, mentionsArray } = this.state
    const lastMention = mentionsArray[mentionsArray.length - 1]
    const updatedBody = body.replace(lastMention, `@${type}:${display} `)
    const updatedMentions = body.replace(lastMention, `@[${contentType}:${id}] `)
    this.checkMentions(updatedBody)
    this.setState({
      body: updatedBody,
      mentions: updatedMentions,
    })
    this.refs.statuspost.focus()
  }
  handleTextAreaClick = (event) => {
    event.preventDefault()
    this.setState({
      textareaOpen: true
    })
  }

  handleTextAreaClose = (event) => {
    event.preventDefault()
    this.setState({
      textareaOpen: false
    })
  }
  render() {
    const { currentReader } = this.props
    return (
      <div className='statuspost'>
        <div className='status-post-text-container'>
          <a
            className='status-post-upload-icon-container'
            href='javascript:void(0)'
            onClick={this.onUploadButtonClick}
          >
            <CameraIcon />
          </a>
          { this.state.textareaOpen ? (
            <div>
              <a
                className='statuspost-action-btn'
                onClick={this.onPostButtonClick}
              >
                Post
              </a>
              <a
                className='statuspost-close-btn'
                onClick={this.handleTextAreaClose}
              >
                x
              </a>
            </div>
          ) : null }
          <figure className='current-reader-badge'>
            <img className='current-reader-image'
              src={currentReader.profileImage}
              alt=''
            />
          </figure>
          <Dropzone
            ref={(node) => { this.dropzone = node }}
            style={{ display: 'none' }}
          />
          <textarea
            cols='30'
            rows='4'
            ref='statuspost'
            className={this.state.textareaOpen ?
              'status-post-textarea-open' : 'status-post-textarea'}
            placeholder='Type inside me'
            onClick={this.handleTextAreaClick}
            onChange={this.handleChange} value={this.state.body}
          />
          {this.state.showSuggestions ?
            (<SuggestionList
              entries={this.state.suggestions}
              onMentionListClick={this.handleSuggestionClick}
             />
            ) : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentReader: state.currentReader
  }
}

export default connect(mapStateToProps, null)(StatusPost)
