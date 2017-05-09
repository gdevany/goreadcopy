import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { Images } from '../../../services/api/currentReader'
import { Search } from '../../../services/api'
import Dropzone from 'react-dropzone'
import CameraIcon from 'material-ui/svg-icons/action/camera-enhance'
import R from 'ramda'
import Anchorify from 'react-anchorify-text'
import SuggestionList from '../../common/SuggestionList'

const mentionPattern = /\B@(?!Reader|Author|Publisher|Book)\w+\s?\w+/gi
const videoPattern = /((https?:\/\/)?(?:www\.)?(?:vimeo|youtu|dailymotion)[:=#\w\.\/\?\-]+)/gi
const mentionRegex = /(\@\[\d+\:\d+\])/gi
const { search } = Search
const { uploadImage } = Images
const styles = {
  hiddenPreview: {
    display: 'none'
  },
}

class TileEdit extends PureComponent {
  constructor(props) {
    super(props)

    const {
      body,
      activeContent,
      imageUrl,
    } = this.handleStates(this.props.id, this.props.profile)
    this.state = {
      body: body || '',
      mentions: body || '',
      imageUrl: imageUrl || '',
      imageId: null,
      activeContent: activeContent || '',
      onProcessMentions: [],
      processedMentions: [],
      videoInfo: null,
      imageInfo: null,
      hasImage: false,
      hasVideo: false,
      showVideoPreview: false,
      showSuggestions: false,
      showErrorOnPost: false,
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.checkMentions = this.checkMentions.bind(this)
    this.getMentions = debounce(this.getMentions, 250)
    this.refreshMentions = this.refreshMentions.bind(this)
    this.replaceMention = this.replaceMention.bind(this)
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
    this.handleUpdateTile = this.handleUpdateTile.bind(this)
    this.handleCancelTile = this.handleCancelTile.bind(this)
    this.handleStates = this.handleStates.bind(this)
    this.onImageDrop = this.onImageDrop.bind(this)
    this.onUploadButtonClick = this.onUploadButtonClick.bind(this)
  }

  componentDidMount = () => {
    const hasImageUrl = this.state.imageUrl !== '' && this.state.imageUrl
    const { activeContent, videoInfo, showVideoPreview } = this.checkVideoUrl(this.state.body)
    activeContent !== '' || activeContent ?
    this.setState({
      activeContent,
      videoInfo,
      showVideoPreview,
      hasVideo: true,
      hasImage: false,
    }) : this.setState({
      activeContent,
      videoInfo,
      showVideoPreview,
      hasVideo: false,
      hasImage: hasImageUrl,
    })
  }

  splitContent(content) {
    return content.split(mentionRegex)
  }

  splitMention(content) {
    return content.split('/')
  }

  renderContentWithMentions(entry, index, mentionList) {
    if (mentionRegex.test(entry)) {
      for (let i = 0; i < mentionList.length; i++) {
        if (mentionList[i].mention === entry) {
          const splitResult = this.splitMention(mentionList[i].url)
          if (splitResult && splitResult[3] === 'profile') {
            return (
              <Link key={index} to={`profile/${splitResult[splitResult.length - 2]}`}>
                {mentionList[i].name}
              </Link>
            )
          }
          return (
            <a key={index} href={mentionList[i].url}>
              {mentionList[i].name}
            </a>
          )
        }
      }
    }
    return (
      <span key={index}>
        <Anchorify
          text={entry}
          target='_blank'
        />
      </span>)
  }

  handleUpdateTile() {
    const data = {
      comment: this.state.body,
      mentions: this.state.mentions,
      activeContent: this.state.activeContent,
      attachedImage: this.state.imageId,
    }
    this.props.updateTile(this.props.id, data)
  }

  handleCancelTile() {
    this.props.cancelTile(this.props.id)
  }

  handleTextChange(event) {
    event.preventDefault()
    const { hasImage } = this.state
    const body = event.target.value
    const { showSuggestions, onProcessMentions } = this.checkMentions(body)
    const { activeContent, videoInfo, showVideoPreview } =
    hasImage === false ? this.checkVideoUrl(body) : this.state
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
      showErrorOnPost: false,
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

  replaceMention(type, display, contentType, id) {
    const { body, onProcessMentions } = this.state
    const lastMention = R.last(onProcessMentions)
    const updatedBody = body.replace(lastMention, `@${type}:${display} `)
    return updatedBody
  }

  checkVideoUrl(latestBody) {
    const videoUrls = latestBody.match(videoPattern)
    let activeContent = '', videoInfo = '', showVideoPreview = false
    if (videoUrls && videoUrls.length > 0 && !this.state.imageInfo) {
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

  renderVideoPreview() {
    let embedUrl = ''

    if (this.state.showVideoPreview && this.state.videoInfo) {
      const { provider, id } = this.state.videoInfo
      switch (provider) {
        case 'vimeo':
          embedUrl = `https://player.vimeo.com/video/${id}`
          break
        case 'youtube':
          embedUrl = `https://www.youtube.com/embed/${id}`
          break
        case 'dailymotion':
          embedUrl = `https://www.dailymotion.com/embed/video/${id}`
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

  handleStates = (id, tiles) => {
    let body, activeContent, imageUrl
    tiles.map(function (t) {
      if (t.id === id) {
        body = t.content.mentions
        activeContent = t.content.activeUrl.url
        imageUrl = t.content.imageUrl ? t.content.imageUrl.url : ''
      }
    })
    return {
      body,
      activeContent,
      imageUrl
    }
  }

  onImageDrop(acceptedFiles, rejectedFiles, e) {
    this.setState({ imageInfo: true })
    this.getBase64AndUpdate(acceptedFiles[0], 'postImage')
      .then(res => this.setState({ imageInfo: {
        data: res.data,
        file: acceptedFiles[0]
      },
        imageId: res.data.imageId,
        hasImage: true }))
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
    //  .then(() => this.setState({ hasImage: true }))
  }

  onUploadButtonClick(event) {
    event.preventDefault()
    this.setState({
      textareaOpen: true,
    })
    this.dropzone.open()
  }

  handleImagePreviewDiscard = (event) => {
    event.preventDefault()
    this.setState({
      imageUrl: '',
      imageId: null,
      imageInfo: null,
      hasImage: false,
    })
  }

  render() {
    const {
      id
    } = this.props
    return (
      <div className='edit-tile' key={id}>
        <div className='edit-video'>
          { this.renderVideoPreview() }
        </div>
        <div className='edit-image'>
          <Dropzone
            ref={(node) => { this.dropzone = node }}
            style={styles.hiddenPreview}
            onDrop={this.onImageDrop}
            multiple={false}
            maxSize={10485760}
          />
          {
            this.state.imageId ? (
              <div className='row'>
                <div className='edit-image-preview columns'>
                  <img src={this.state.imageInfo.file.preview} alt='Preview Image'/>
                  <a
                    className='edit-image-preview-discard-btn'
                    href='javascript:void(0)'
                    onClick={this.handleImagePreviewDiscard}
                  >
                    x
                  </a>
                </div>
              </div>
            ) : this.state.imageUrl ? (
            <div className='edit-image-preview columns'>
              <img src={this.state.imageUrl}/>
              <a
                className='edit-image-preview-discard-btn'
                href='javascript:void(0)'
                onClick={this.handleImagePreviewDiscard}
              >
                x
              </a>
            </div>
            ) : !this.state.hasVideo ? (
            <div className='image-placeholder'>
              <a
                className='edit-image-upload-icon-container'
                href='javascript:void(0)'
                onClick={this.onUploadButtonClick}
              >
                <CameraIcon />
              </a>
            </div>
            ) : null
          }
        </div>
        <div className='edit-area'>
          <textarea
            cols='30'
            rows='4'
            maxLength='10000'
            ref='statuspost'
            value={this.state.body}
            onChange={this.handleTextChange}
          />
          {this.state.showSuggestions ?
            (<SuggestionList
              entries={this.state.suggestions}
              onMentionListClick={this.handleSuggestionClick}
             />
            ) : null
          }
          <div className='edit-controls'>
            <a
              className='updateButton'
              onClick={this.handleUpdateTile}
            >
              Update
            </a>
            <a
              className='cancelButton'
              onClick={this.handleCancelTile}
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  tiles: {
    profile,
  },
}) => {
  return {
    profile,
  }
}

export default connect(mapStateToProps)(TileEdit)
