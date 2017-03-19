import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CameraIcon from 'material-ui/svg-icons/action/camera-enhance'
import { Posts } from '../../services/api/currentReader'
import SuggestionList from './SuggestionList'
import { Search } from '../../services/api'
import { debounce } from 'lodash'
import Dropzone from 'react-dropzone'
import urlParser from 'js-video-url-parser'
import R from 'ramda'

const { search } = Search
const { postNewMessage } = Posts
const mentionPattern = /\B@(?!Reader|Author|Publisher|Book)\w+\s?\w+/gi
const videoPattern = /((https?:\/\/)?(?:www\.)?(?:vimeo|youtu|dailymotion)[:=#\w\.\/\?\-]+)/gi

class StatusPost extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      body: '',           // Plain text string
      mentions: '',       // String with mentions
      image: '',          // ID of the image
      targetId: '',       // ID of the profile
      activeContent: '',  // Filled by liveUrl
      onProcessMentions: [],
      processedMentions: [],
      videoInfo: null,
      suggestions: [],
      showSuggestions: false,
      showImagePreview: false,
      showVideoPreview: false,
      textareaOpen: false,
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.checkMentions = this.checkMentions.bind(this)
    this.replaceMention = this.replaceMention.bind(this)
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
    this.onPostButtonClick = this.onPostButtonClick.bind(this)
    this.handleTextAreaClick = this.handleTextAreaClick.bind(this)
    this.handleTextAreaClose = this.handleTextAreaClose.bind(this)
    this.onUploadButtonClick = this.onUploadButtonClick.bind(this)
    this.refreshMentions = this.refreshMentions.bind(this)
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

  handleTextChange(event) {
    const body = event.target.value
    const { showSuggestions, onProcessMentions } = this.checkMentions(body)
    const { activeContent, videoInfo, showVideoPreview } = this.checkVideoUrl(body)
    const {
      processedMentions,
      mentions
    } = this.refreshMentions(body, this.state.processedMentions)
    this.setState({
      body,
      mentions,
      activeContent,
      onProcessMentions,
      processedMentions,
      videoInfo,
      showVideoPreview,
      showSuggestions,
    })
  }

  checkMentions(latestBody) {
    const result = {
      showSuggestions: false,
      onProcessMentions: latestBody.match(mentionPattern)
    }
    if (result.onProcessMentions && result.onProcessMentions.length > 0) {
      this.getMentions(R.last(result.onProcessMentions).replace('@', ''))
    }
    return result
  }

  checkVideoUrl(latestBody) {
    const videoUrls = latestBody.match(videoPattern)
    let activeContent = '', videoInfo = {}, showVideoPreview = false
    if (videoUrls && videoUrls.length > 0) {
      activeContent = R.last(videoUrls)
      videoInfo = urlParser.parse(activeContent)
      showVideoPreview = true
    }
    return {
      activeContent,
      videoInfo,
      showVideoPreview
    }
  }

  getMentions(query) {
    search({
      author: query,
      reader: query,
      book: query,
      publisher: query
    }).then((res) => this.setState({
      suggestions: res.data,
      showSuggestions: true
    }))
  }

  handleSuggestionClick(event) {
    event.stopPropagation()
    const { type, display, contenttype, id } = event.target.dataset
    const body = this.replaceMention(type, display, contenttype, id)
    const { showSuggestions, onProcessMentions } = this.checkMentions(body)
    const { processedMentions, mentions } = this.refreshMentions(body, R.concat(
      this.state.processedMentions,
      [{
        display: `@${type}:${display}`,
        mention: `@[${contenttype}:${id}]`
      }]
    ))
    this.setState({
      body,
      mentions,
      processedMentions,
      showSuggestions,
      onProcessMentions,
    })
    this.refs.statuspost.focus()
  }

  refreshMentions(updatedBody, updatedProcessedMentions) {
    let processedMentions = R.clone(updatedProcessedMentions)
    let mentions = updatedBody
    // Beware of indexOf 0 in the next line
    processedMentions = processedMentions.filter((el) => mentions.indexOf(el.display) >= 0)
    processedMentions.map(function (el) {
      mentions = mentions.replace(el.display, el.mention)
    })
    return {
      processedMentions,
      mentions
    }
  }

  replaceMention(type, display, contentType, id) {
    const { body, onProcessMentions } = this.state
    const lastMention = R.last(onProcessMentions)
    const updatedBody = body.replace(lastMention, `@${type}:${display} `)
    return updatedBody
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

  renderVideoPreview() {
    let embedUrl = ''

    if (this.state.showVideoPreview && this.state.videoInfo) {
      const { provider, id } = this.state.videoInfo
      switch (provider) {
        case 'vimeo':
          embedUrl = `https://player.vimeo.com/video/${id}`
          break
        case 'youtube':
          embedUrl = `http://www.youtube.com/embed/${id}`
          break
        case 'dailymotion':
          embedUrl = `http://www.dailymotion.com/embed/video/${id}`
          break
        default:
          embedUrl = ''
      }
    }

    if (embedUrl !== '') {
      return (
        <iframe
          frameBorder='0'
          width='400'
          height='190'
          src={embedUrl}
          allowFullScreen
        />
      )
    }

    return null
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
            onChange={this.handleTextChange} value={this.state.body}
          />
          {this.state.showSuggestions ?
            (<SuggestionList
              entries={this.state.suggestions}
              onMentionListClick={this.handleSuggestionClick}
             />
            ) : null
          }
        </div>
        { this.renderVideoPreview() }
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
