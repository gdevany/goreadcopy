import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CameraIcon from 'material-ui/svg-icons/action/camera-enhance'
import { Posts, Images } from '../../services/api/currentReader'
import { Search } from '../../services/api'
import SuggestionList from './SuggestionList'
import { debounce } from 'lodash'
import Dropzone from 'react-dropzone'
import urlParser from 'js-video-url-parser'
import R from 'ramda'
import Promise from 'bluebird'

const { uploadImage } = Images
const { search } = Search
const { postNewMessage } = Posts
const mentionPattern = /\B@(?!Reader|Author|Publisher|Book)\w+\s?\w+/gi
const videoPattern = /((https?:\/\/)?(?:www\.)?(?:vimeo|youtu|dailymotion)[:=#\w\.\/\?\-]+)/gi
const styles = {
  shownPreview: {
    display: 'block',
    height: 100,
    width: 100
  },
  hiddenPreview: {
    display: 'none'
  }
}

class StatusPost extends PureComponent {
  constructor(props) {
    super(props)
    this.state = this.initialState()
    this.state['targetId'] = null
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
    this.onImageDrop = this.onImageDrop.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.targetId && !this.props.targetId && nextProps.targetId) {
      this.setState({ targetId: nextProps.targetId })
    }
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
      // Pending to render created tile
      // and handle error exceptions
      .then(res => {
        console.log(res.data)
        debugger
        this.props.addPostedTile(res.data)
      })
      .then(() => this.cleanStatusPost())
      .catch(err => {
        console.log(err)
        this.cleanStatusPost()
      })
  }

  initialState() {
    return {
      body: '',
      mentions: '',
      image: '',
      activeContent: '',
      onProcessMentions: [],
      processedMentions: [],
      videoInfo: null,
      imageInfo: null,
      suggestions: [],
      showSuggestions: false,
      showImagePreview: false,
      showVideoPreview: false,
      textareaOpen: false,
    }
  }

  cleanStatusPost() {
    this.setState(this.initialState())
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
    if (this.state.imageInfo) {
      return null
    }
    const videoUrls = latestBody.match(videoPattern)
    let activeContent = '', videoInfo = null, showVideoPreview = false
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

  handleImagePreviewDiscard = (event) => {
    event.preventDefault()
    this.setState({
      image: '',
      imageInfo: null
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
          className='video-embed-iframe'
          src={embedUrl}
          allowFullScreen
        />
      )
    }

    return null
  }

  onImageDrop(acceptedFiles, rejectedFiles, e) {
    this.setState({ imageInfo: true })
    this.getBase64AndUpdate(acceptedFiles[0], 'postImage')
      .then(res => this.setState({ imageInfo: {
        data: res.data,
        file: acceptedFiles[0]
      },
        image: res.data.imageId }))
      .catch(err => {
        console.log('Error on image drop ', err)
        this.setState({ imageInfo: null })
      })
  }

  getBase64AndUpdate = (file, imageType) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(`Error in getBase64: ${error}`)
    }).then(res => uploadImage({ imageType, file: res }))
  }

  render() {
    const { currentReader } = this.props
    return (
      <div className='statuspost'>
        <div className='status-post-text-container'>
          {
            !this.state.showVideoPreview && !this.state.imageInfo ? (
              <a
                className='status-post-upload-icon-container'
                href='javascript:void(0)'
                onClick={this.onUploadButtonClick}
              >
                <CameraIcon />
              </a>
            ) : null
          }
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
              alt='Profile Image'
            />
          </figure>
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
        <div className='statuspost-image-preview'>
          <Dropzone
            ref={(node) => { this.dropzone = node }}
            style={styles.hiddenPreview}
            onDrop={this.onImageDrop}
            multiple={false}
            maxSize={10485760}
          />
          {
            this.state.image ? (
              <div className='row'>
                <div className='columns small-6 centered'>
                  <img src={this.state.imageInfo.file.preview} alt='Preview Image'/>
                </div>
                <a
                  className='statuspost-image-preview-discard-btn'
                  href='javascript:void(0)'
                  onClick={this.handleImagePreviewDiscard}
                >
                  x
                </a>
              </div>
            ) : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader
}) => {
  return {
    currentReader
  }
}

export default connect(mapStateToProps, null)(StatusPost)
