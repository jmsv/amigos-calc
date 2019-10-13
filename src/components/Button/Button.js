import React from 'react'

import './Button.scss'

export const Button = props => (
  <button
    className={`${props.className || ''} ${props.primary ? 'primary' : ''} ${
      props.secondary ? 'secondary' : ''
    }`.trim()}>
    {props.children}
  </button>
)
