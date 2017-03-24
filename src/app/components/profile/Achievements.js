import React, { PureComponent } from 'react'
import R from 'ramda'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

class Achievements extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isCollapsed: true
    }
  }

  handleShowMore = () => this.setState({ isCollapsed: false })

  handleShowLess = () => this.setState({ isCollapsed: true })

  renderAchievements = (achievements) => {
    return achievements.map((achievement, index) => {
      return <img className='sidebar-archivement-img' key={index} src={achievement.imageUrl} />
    })
  }

  render() {
    const { achievements } = this.props
    const { isCollapsed } = this.state

    return (
      <div className='sidebar-element-container box'>
        <h3 className='sidebar-element-title'> Achievements </h3>
        <div className='sidebar-archivements-container'>
          {achievements ? this.renderAchievements(R.take(8, achievements)) : null}
          {
            !isCollapsed && achievements.length > 8 ?
              this.renderAchievements(achievements.slice(8)) : null
          }
        </div>
        <span
          className='left-hand-action-more'
          onClick={isCollapsed ? this.handleShowMore : this.handleShowLess}
        >
          {isCollapsed ? 'See More' : 'See Less'}
          {isCollapsed ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </span>
      </div>
    )
  }
}

export default Achievements
