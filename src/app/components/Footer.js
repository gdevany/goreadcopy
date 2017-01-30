import React from 'react'
import routes from '../services/currentEnvRoutes'

export const Footer = () => {
  const {
    support,
    privacy,
    terms,
    authors,
    publishers,
    advertisers,
    media,
    childrensLiteracy,
    litcoins
  } = routes

  return (
    <div className='side-by-side-wrapper'>
      <div className='side-left'>
        <a href='#'> Log in </a> <br />
        {/** TODO: Need to link this to modal after modal merge**/}
        <a href='#'> Sign up </a> <br />
        <a href={support()}> Support </a> <br />
        <a href={privacy()}> Privacy </a> <br />
        <a href={terms()}> Terms </a> <br />
      </div>
      <div className='side-right'>
        <a href={authors()}> Authors </a> <br />
        <a href={publishers()}> Publishers </a> <br />
        <a href={advertisers()}> Advertisers </a> <br />
        <a href={media()}> Media </a> <br />
        <a href={childrensLiteracy()}> {`Children's Literacy`} </a> <br />
        <a href={litcoins()}> Litcoins </a>
      </div>
    </div>
  )
}

export default Footer
