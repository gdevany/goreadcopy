import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import { debounce } from 'lodash'
import { Search } from '../../../services/api'
import R from 'ramda'
import Anchorify from 'react-anchorify-text'
import SuggestionList from '../../common/SuggestionList'

const mentionPattern = /\B@(?!Reader|Author|Publisher|Book)\w+\s?\w+/gi
const videoPattern = /((https?:\/\/)?(?:www\.)?(?:vimeo|youtu|dailymotion)[:=#\w\.\/\?\-]+)/gi
const mentionRegex = /(\@\[\d+\:\d+\])/gi
const { search } = Search

class TileEdit extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      body: props.editTileProps.description || '',
      mentions: '',
      activeContent: '',
      onProcessMentions: [],
      processedMentions: [],
      videoInfo: null,
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
    }
    this.props.updateTile(this.props.editTileProps.tileId, data)
  }

  handleTextChange(event) {
    event.preventDefault()
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

  render() {
    const {
      editTileProps: {
        tileId,
      },
      cancelTile,
    } = this.props

    return (
      <div className='edit-tile' key={tileId}>
        <textarea
          cols='30'
          rows='4'
          maxLength='10000'
          ref='statuspost'
          onChange={this.handleTextChange} value={this.state.body}
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
            onClick={cancelTile}
          >
            Cancel
          </a>
        </div>
      </div>
    )
  }
}

export default TileEdit
