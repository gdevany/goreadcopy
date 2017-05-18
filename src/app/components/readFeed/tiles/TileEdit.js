import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { Images } from '../../../services/api/currentReader'
import { Search } from '../../../services/api'
import Dropzone from 'react-dropzone'
import CameraIcon from 'material-ui/svg-icons/action/camera-enhance'
import { Colors } from '../../../constants/style'
import R from 'ramda'
import SuggestionList from '../../common/SuggestionList'
import RefreshIndicator from 'material-ui/RefreshIndicator'

const mentionPattern = /\B@(?!Reader|Author|Publisher|Book)\w+\s?\w+/gi
const videoPattern = /((https?:\/\/)?(?:www\.)?(?:vimeo|youtu|dailymotion)[:=#\w\.\/\?\-]+)/gi
const { search } = Search
const { uploadImage } = Images
const styles = {
  hiddenPreview: {
    display: 'none'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

class TileEdit extends PureComponent {
  constructor(props) {
    super(props)

    const {
      body,
      activeContent,
      imageUrl,
    } = this.handleStates(this.props.id, this.props.profile || this.props.readFeed)
    this.state = {
      body: body || '',
      mentions: body || '',
      imageUrl: imageUrl || '',
      imageId: 'fake_id',
      activeContent: activeContent || '',
      onProcessMentions: [],
      processedMentions: [],
      videoInfo: null,
      imageInfo: null,
      hasImage: false,
      hasVideo: false,
      isEditLoading: false,
      isEditUpdating: false,
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
    const { body, imageUrl } = this.state
    const hasImage = imageUrl !== '' && imageUrl
    const { activeContent, videoInfo, showVideoPreview } =
    !hasImage ? this.checkVideoUrl(body) : this.state
    const hasVideo = (activeContent !== '' || activeContent)
    this.setState({
      activeContent,
      videoInfo,
      showVideoPreview,
      hasVideo,
      hasImage,
    })
  }

  handleUpdateTile() {
    const {
      body,
      mentions,
      activeContent,
      imageId,
     } = this.state
    const {
      updateTile,
      id,
    } = this.props
    const data = {
      comment: body,
      mentions: mentions,
      activeContent: activeContent,
      attachedImage: imageId,
    }
    this.setState({ isEditUpdating: true })
    updateTile(id, data)
  }

  handleCancelTile() {
    const {
      cancelTile,
      id,
    } = this.props
    cancelTile(id)
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
    const hasVideo = activeContent !== ''
    this.setState({
      body,
      mentions,
      activeContent,
      onProcessMentions,
      processedMentions,
      videoInfo,
      showVideoPreview,
      showSuggestions,
      hasVideo,
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
      .then(res => this.setState({
        imageInfo: {
          data: res.data,
          file: acceptedFiles[0]
        },
        imageId: res.data.imageId,
        hasImage: true,
        isEditLoading: false,
      }))
      .catch(err => {
        console.log('Error on image drop ', err)
        this.setState({
          imageInfo: null,
          showErrorOnPost: true,
        })
      })
  }

  getBase64AndUpdate = (file, imageType) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadstart = () => this.setState({ isEditLoading: true })
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(`Error in getBase64: ${error}`)
    }).then(res => uploadImage({ imageType, file: res }))
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
    const { body } = this.state
    const { activeContent, videoInfo, showVideoPreview } = this.checkVideoUrl(body)
    this.setState({
      imageUrl: '',
      imageId: '',
      imageInfo: null,
      hasImage: false,
      activeContent,
      videoInfo,
      showVideoPreview,
    })
  }

  setLoading = (size) => {
    return (
      <RefreshIndicator
        size={size}
        left={0}
        top={0}
        loadingColor={Colors.blue}
        status='loading'
        style={styles.refresh}
        className='loader'
      />
    )
  }

  render() {
    const {
      body,
      imageId,
      imageUrl,
      imageInfo,
      suggestions,
      showSuggestions,
      showErrorOnPost,
      isEditLoading,
      isEditUpdating,
      hasVideo,
    } = this.state
    const {
      id,
    } = this.props
    return (
      <div className='edit-tile' key={id}>
        <div className='edit-load'>
          { isEditLoading ? this.setLoading(50) : null }
        </div>
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
            imageId !== 'fake_id' && imageId !== '' ? (
              <div className='row'>
                <div className='edit-image-preview columns'>
                  <img src={imageInfo.file.preview} alt='Preview Image'/>
                  <a
                    className='edit-image-preview-discard-btn'
                    href='javascript:void(0)'
                    onClick={this.handleImagePreviewDiscard}
                  >
                    x
                  </a>
                </div>
              </div>
            ) : imageUrl ? (
            <div className='edit-image-preview columns'>
              <img src={imageUrl}/>
              <a
                className='edit-image-preview-discard-btn'
                href='javascript:void(0)'
                onClick={this.handleImagePreviewDiscard}
              >
                x
              </a>
            </div>
            ) : !hasVideo ? (
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
            value={body}
            placeholder={showErrorOnPost ? 'Something happend, please try again' : 'Comment here'}
            onChange={this.handleTextChange}
          />
          {showSuggestions ?
            (<SuggestionList
              entries={suggestions}
              onMentionListClick={this.handleSuggestionClick}
             />
            ) : null
          }
          <div className='edit-controls'>
            <div className='edit-update'>
              { isEditUpdating ? this.setLoading(28) : null }
            </div>
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
    readFeed,
  },
}) => {
  return {
    profile,
    readFeed,
  }
}

export default connect(mapStateToProps)(TileEdit)
