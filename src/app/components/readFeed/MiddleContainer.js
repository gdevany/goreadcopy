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
  AnnouncementTile
} from './tiles'

const MiddleContainer = () => {
  return (
    <div className='middle-container small-12 large-6 columns'>
      <AnnouncementTile/>
      <AlbumTile />
      <AppearanceTile />
      <ArticleTile />
      <AuthorTile />
      <AwardTile />
      <BookClubTaskTile />
      <PublisherUpdateTile />
      <StatusPostTile />
      <UserProfileTile />
      <VideoTile />
      <BookProductTile />
      <AdvertisingTile />
      <BookClubTile />
      <AdsenseTile />
    </div>
  )
}

export default MiddleContainer
