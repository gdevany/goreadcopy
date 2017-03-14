import React from 'react'
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
  AdsenseTile,
  MergedTile
} from './tiles'
import moment from 'moment'

const TilesWrapper = ({ feed }) => {
  const renderTime = (time, timeType) => {
    if (timeType === 'ago' && moment(moment.unix(time)).isValid()) {
      return moment(moment.unix(time)).fromNow()
    } else if (timeType === 'time-date') {
      return {
        date: moment.unix(time).format('MMMM DD'),
        time: moment.unix(time).format('HA')
      }
    }
    return time
  }

  const renderTiles = (tiles) => {
    const result = []
    tiles.forEach((tile, index) => {
      let tileDefaultProps = {}
      if (tile.tileType !== 'advertising' && tile.tileType !== 'merged') {
        tileDefaultProps = {
          timestamp: renderTime(tile.timestamp, 'ago'),
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
            shareLink: tile.link,
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
        case 'bookclub_event':
        case 'buzzappearance':
          const eventContent = {
            title: tile.content.title,
            description: tile.content.description,
            url: tile.content.url,
            start: renderTime(tile.content.start, 'time-date'),
            end: renderTime(tile.content.end, 'time-date')
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
            name: tile.content.fullname || tile.actor.fullname,
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
          switch (tile.advertiser.name) {
            // TODO: Need the likes and comments objects from the API team
            case 'readerslegacy':
              const {
                imageUrl,
                heading,
                description,
                url,
                author,
              } = tile.advertiser.buzzAd
              const adContent = {
                promoted: true,
                image: imageUrl,
                title: heading,
                description: description,
                link: url
              }
              tileDefaultProps = {
                author: {
                  name: (author.fullname),
                  image: (author.imageUrl),
                  link: (author.url)
                },
                likes: {
                  count: 0,
                  likedByReader: true
                },
                comments: {
                  count: 0,
                  commentedByReader: false,
                },
                shareInfo: {
                  title: tile.advertiser.buzzAd.heading,
                  shareLink: tile.advertiser.buzzAd.url
                }
              }
              result.push(
                <AdvertisingTile
                  key={index}
                  tileDefaultProps={tileDefaultProps}
                  content={adContent}
                />
              )
              break
            case 'adsense':
              const adSenseContent = {
                promoted: true,
                isAdsense: true,
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
          break
        case 'merged':
          tileDefaultProps = {
            timestamp: this.renderTime(tile.timestamp, 'ago'),
            action: tile.description,
            author: {
              name: (tile.actor.fullname || tile.actor.name),
              image: (tile.actor.imageUrl || tile.actor.image),
              link: (tile.actor.url || tile.actor.link)
            },
          }
          result.push(
            <MergedTile
              key={index}
              tileDefaultProps={tileDefaultProps}
              content={tile}
            />
          )
          break
        default:
          return
      }
    })
    return result
  }

  return (
    <div>
      {feed ? renderTiles(feed) : null}
    </div>
  )
}

export default TilesWrapper
