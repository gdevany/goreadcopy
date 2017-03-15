import React, { PureComponent } from 'react'
import { PrimaryButton } from './'
import CameraIcon from 'material-ui/svg-icons/image/camera'
import { MentionsInput, Mention } from 'react-mentions'

class StatusPost extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handlePostChange = this.handlePostChange.bind(this)
  }

  onUploadButtonClick(e) {
    console.log('Upload image')
    e.preventDefault()
  }

  onPostButtonClick(e) {
    console.log('Post button')
  }

  handlePostChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleRenderSuggestion(entry, search, highlightedDisplay, index) {
    return (
      <div className='suggestion'>
        <img src={entry.image} alt='User image'/>
        <span>{entry.type}: { highlightedDisplay }</span>
      </div>
    )
  }

  displayMention(id, display, type) {
    console.log(id, display, type)
    return `@${type}: ${display}`
  }

  render() {
    const url = 'https://staging2.readerslegacy.com/media/' +
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
    ]

    return (
      <div className='statuspost'>
        <div className='row'>
          <MentionsInput
            value={this.state.text}
            onChange={this.handlePostChange}
            displayTransform={this.displayMention}
          >
            <Mention trigger='@'
              type='User'
              data={users}
              renderSuggestion={this.handleRenderSuggestion}
            />
          </MentionsInput>
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

export default StatusPost
