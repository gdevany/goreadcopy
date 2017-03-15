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
    let tileType, tileContent
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

      if (tile.tileType === 'socialpost') {
        if (tile.content.tileType) {
          tileType = tile.content.tileType
          tileContent = tile.content.content
        } else {
          tileType = tile.content.contentType
          tileContent = tile.content
        }
      } else {
        tileType = tile.tileType
        tileContent = tile.content
      }

      switch (tileType) {
        case 'article':
          const articleContent = {
            title: tileContent.title,
            header: tileContent.header,
            image: (tileContent.imageUrl || tileContent.image),
            link: tileContent.link,
            socialComment: (tile.socialPostComment || null)
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
          const authorContent = {
            name: tileContent.fullname,
            city: tileContent.city,
            state: tileContent.state,
            about: (tileContent.shortBio || tileContent.aboutMe),
            link: tileContent.url,
            socialComment: (tile.socialPostComment || null)
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
            image: tileContent.imageUrl,
            socialComment: (tile.socialPostComment || null)
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
            image: tileContent.imageUrl,
            socialComment: (tile.socialPostComment || null)
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
            title: tileContent.title,
            description: tileContent.description,
            url: tileContent.url,
            start: renderTime(tileContent.start, 'time-date'),
            end: renderTime(tileContent.end, 'time-date'),
            socialComment: (tile.socialPostComment || null)
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
          const getUrl = () => {
            if (tileContent.product) return tileContent.product.url
            else if (tileContent.book) return tileContent.book.link
            else if (tileContent.link) return tileContent.link
            return '#'
          }
          const getName = () => {
            if (tileContent.reviewer) return tileContent.reviewer.fullname
            else if (tileContent.authors.length) return tileContent.authors[0].fullname
            return `${<i>Unknown</i>}`
          }
          const bookAndProductContent = {
            title: (tile.target.name || tile.target.title),
            description: (tileContent.body || tileContent.description),
            image: tileContent.imageUrl,
            rating: tileContent.rating.average,
            author: getName(),
            url: getUrl(),
            socialComment: (tile.socialPostComment || null)
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
            image: tileContent.image,
            title: tileContent.name,
            description: tileContent.description,
            url: tileContent.link,
            socialComment: (tile.socialPostComment || null)
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
            description: tileContent.description,
            link: tileContent.link,
            socialComment: (tile.socialPostComment || null)
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
          const publisherContent = {
            name: tileContent.fullname,
            image: tileContent.imageUrl,
            link: tileContent.url,
            city: tileContent.city,
            state: tileContent.state,
            description: tileContent.description,
            socialComment: (tile.socialPostComment || null)
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
            name: tileContent.fullname || tile.actor.fullname,
            city: tileContent.city,
            state: tileContent.state,
            description: tileContent.description,
            image: tileContent.imageUrl,
            link: tile.actor.url,
            userType: findUserType(tileContent.contentType),
            socialComment: (tile.socialPostComment || null)
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
            link: tileContent.link,
            originUrl: tileContent.originUrl,
            title: tileContent.title,
            description: tileContent.summary,
            socialComment: (tile.socialPostComment || null)
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
            image: tileContent.imageUrl.url,
            description: tileContent.body,
            socialComment: (tile.socialPostComment || null)
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
                link: url,
                socialComment: (tile.socialPostComment || null)
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
            timestamp: renderTime(tile.timestamp, 'ago'),
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
