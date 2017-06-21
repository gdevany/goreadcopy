import React from 'react'
import { HyperLinkWrapper } from './'

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
                    <HyperLinkWrapper
                      url={replace[i].url}
                      cls={cls.a}
                    >
                      {replace[i].text}
                    </HyperLinkWrapper>
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
