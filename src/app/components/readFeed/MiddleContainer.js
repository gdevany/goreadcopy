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
  AdvertisingTile
} from './tiles'

const MiddleContainer = () => {
  return (
    <div className='middle-container small-12 large-6 columns'>
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
    </div>
  )
}

export default MiddleContainer
