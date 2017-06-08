import React from 'react'

const NewsLetter = () => {
  return (
    <section className='bookpage-newsletter-main-container'>
      <h4 className='bookpage-newsletter-text'>
        Send me a list of the hightest rated Sci Fi books of the week
      </h4>
      <form className='bookpage-newsletter-form'>
        <label>Your Email</label>
        <div className='bookpage-newsletter-input-container'>
          <input className='bookpage-newsletter-input' type='text'/>
          <input className='bookpage-newsletter-submit' type='submit' value='Send'/>
        </div>
      </form>
    </section>
  )
}

export default NewsLetter
