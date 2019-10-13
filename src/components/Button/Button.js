import React from 'react'

import './Button.scss'

export const Button = props => {
  console.log('props :', props)
  return (
    <button
      className={`${props.className || ''} ${props.primary ? 'primary' : ''} ${
        props.secondary ? 'secondary' : ''
      }`.trim()}>
      {props.children}
    </button>
  )
}
