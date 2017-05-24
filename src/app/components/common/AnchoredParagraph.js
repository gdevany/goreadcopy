import React from 'react'
import { Link } from 'react-router'

export default function AnchoredParagraph(props) {
  const { text, replace, regexpr, cls } = props
  const chunks = text ? text.split(' ') : []
  return (
    <p className={cls.p} style={{ flexWrap: 'wrap' }}>
      {
        chunks.map((chunk, idx)=>{
          if (regexpr.test(chunk)) {
            for (let i = 0; i < replace.length; i++) {
              if (chunk === replace[i].pattern) {
                return (
                  <span key={idx}>
                    <Link
                      to={replace[i].url}
                      className={cls.a}
                    >
                      {replace[i].text}
                    </Link>
                    &nbsp;
                  </span>
                )
              }
            }
            return null
          }
          return <span key={idx}>{chunk} &nbsp;</span>
        })
      }
    </p>
  )
}
