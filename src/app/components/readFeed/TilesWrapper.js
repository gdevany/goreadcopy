import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tiles } from '../../redux/actions'
import {
  AlbumTile,
  AppearanceTile,
  ArticleTile,
  AuthorTile,
  AwardTile,
  BookClubTaskTile,
  PublisherUpdateTile,
  StatusPostTile,
  UserProfileTile,
  VideoTile,
  BookProductTile,
  AdvertisingTile,
  BookClubTile,
  AdsenseTile
} from './tiles'

const { getReadFeedTiles } = Tiles

class TilesWrapper extends PureComponent {
  componentWillMount = () => this.props.getReadFeedTiles(2)

  renderTime = (time, timeType) => {
    /**
    TODO: calculate time using Moment.js
    Something like:
      * If timeType === 'ago'..this 146094649 should return a string like '3 hours ago'
      * If timeType === 'time-date', this 2016-04-24T04:00:00Z should return an object like:
      {
        date: April 24
        time: 4AM
      }
    **/
    if (timeType === 'ago') {
      return time
    } else if (timeType === 'time-date') {
      return {
        date: 'April 24',
        time: '4AM'
      }
    }
    return timeType
  }

  renderTiles = (tiles) => {
    const result = []

    tiles.forEach((tile, index) => {
      let tileDefaultProps = {}
      if (tile.tileType !== 'advertising') {
        tileDefaultProps = {
          timestamp: this.renderTime(tile.timestamp, 'ago'),
          action: tile.description,
          id: tile.id,
          author: {
            name: (tile.actor.fullname || tile.actor.name),
            image: (tile.actor.imageUrl || tile.actor.image),
            link: (tile.actor.url || tile.actor.link)
          },
          likes: {
            count: tile.likes.count,
            likedByReader: tile.likedByReader
          },
          comments: {
            count: tile.comments.count,
            commentedByReader: tile.commentedByReader
          },
          shareInfo: {
            title: tile.content.title,
            shareLink: tile.link
          }
        }
      }

      switch (tile.tileType) {
        case 'article':
          const articleContent = {
            title: tile.content.title,
            header: tile.content.header,
            image: (tile.content.imageUrl || tile.content.image),
            link: tile.content.link,
          }
          result.push(
            <ArticleTile
              key={index}
              content={articleContent}
              tileDefaultProps={tileDefaultProps}
            />
          )
          break
        case 'author':
          // TODO: Pass in location and about props
          const authorContent = {
            name: tile.content.fullname,
            location: 'Los Angeles, CA',
            about: 'blah blah blah',
            link: tile.content.url,
          }
          result.push(
            <AuthorTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={authorContent}
            />
          )
          break
        case 'award':
          const awardContent = {
            image: tile.content.imageUrl
          }
          result.push(
            <AwardTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={awardContent}
            />
          )
          break
        case 'album':
        case 'buzzphoto':
          const albumContent = {
            image: tile.content.imageUrl
          }
          result.push(
            <AlbumTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={albumContent}
            />
          )
          break
        case 'buzz_ad':
          const adContent = {
            promoted: true,
            image: tile.content.imageUrl,
            title: tile.content.heading,
            description: tile.content.description,
            link: tile.content.url
          }
          result.push(
            <AdvertisingTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={adContent}
            />
          )
          break
        case 'bookclub_event':
        case 'buzzappearance':
          const eventContent = {
            title: tile.content.title,
            description: tile.content.description,
            url: tile.content.url,
            start: this.renderTime(tile.content.start, 'time-date'),
            end: this.renderTime(tile.content.end, 'time-date')
          }
          result.push(
            <AppearanceTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={eventContent}
            />
          )
          break
        case 'product_review':
        case 'book_review':
        case 'book':
          // TODO: product_review should be returning url inside content.product
          const getUrl = () => {
            if (tile.content.product) return tile.content.product.link
            else if (tile.content.book) return tile.content.book.link
            else if (tile.content.link) return tile.content.link
            return '#'
          }
          const getName = () => {
            if (tile.content.reviewer) return tile.content.reviewer.fullname
            else if (tile.content.authors.length) return tile.content.authors[0].fullname
            return `${<i>Unknown</i>}`
          }
          const bookAndProductContent = {
            title: (tile.target.name || tile.target.title),
            description: (tile.content.body || tile.content.description),
            image: tile.content.imageUrl,
            rating: tile.content.rating.average,
            author: getName(),
            url: getUrl(),
          }
          result.push(
            <BookProductTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={bookAndProductContent}
            />
          )
          break
        case 'bookclub':
          const bookClubContent = {
            image: tile.content.image,
            title: tile.content.name,
            description: tile.content.description,
            url: tile.content.link
          }
          result.push(
            <BookClubTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={bookClubContent}
            />
          )
          break
        case 'bookclub_task':
          const bookClubTaskContent = {
            description: tile.content.description,
            link: tile.actor.link
          }
          result.push(
            <BookClubTaskTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={bookClubTaskContent}
            />
          )
          break
        case 'publisher':
          // TODO: Needs a location and description keys
          const publisherContent = {
            name: tile.content.fullname,
            image: tile.content.imageUrl,
            link: tile.content.url,
            location: 'Los Angeles, CA',
            description: 'blab blah blah'
          }
          result.push(
            <PublisherUpdateTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={publisherContent}
            />
          )
          break
        case 'account':
        case 'userprofile':
          // TODO: Add location
          const findUserType = (type) => {
            switch (type) {
              case 'userProfile':
                return 'Reader'
              case 'author':
                return 'Author'
              default:
                return ''
            }
          }
          const accountContent = {
            name: tile.actor.fullname,
            location: 'Los Angeles, CA',
            description: tile.content.description,
            image: tile.content.imageUrl,
            link: tile.actor.url,
            userType: findUserType(tile.content.contentType)
          }
          result.push(
            <UserProfileTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={accountContent}
            />
          )
          break
        case 'buzzvideo':
          const buzzVideoContent = {
            link: tile.content.link,
            title: tile.content.title,
            description: tile.content.summary,
          }
          result.push(
            <VideoTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={buzzVideoContent}
            />
          )
          break
        case 'status':
          const statusPostContent = {
            image: tile.content.imageUrl.url,
            description: tile.content.body,
          }
          result.push(
            <StatusPostTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={statusPostContent}
            />
          )
          break
        case 'advertising':
          const adSenseContent = {
            promoted: true,
            isAdsense: true,
            image: './image/adv-sense.png'
          }

          result.push(
            <AdsenseTile
              key={index}
              content={adSenseContent}
            />
          )
          break
        default:
          return
      }
    })
    return result
  }

  render() {
    const { readFeed } = this.props

    return (
      <div>
        { readFeed ? this.renderTiles(readFeed) : null }
      </div>
    )
  }
}

const mapStateToProps = ({
  tiles: {
    readFeed
  }
}) => { return { readFeed } }

export default connect(mapStateToProps, { getReadFeedTiles })(TilesWrapper)
