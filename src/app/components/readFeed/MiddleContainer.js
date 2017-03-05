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
  VideoTile
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
    </div>
  )
}

export default MiddleContainer
