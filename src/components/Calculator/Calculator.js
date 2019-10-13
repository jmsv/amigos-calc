import React, { useState } from 'react'
import pluralize from 'pluralize'

import './Calculator.scss'
import { Button } from '../Button/Button'

export const Calculator = () => {
  const [donation, setDonation] = useState(10)

  // TODO: Handle plurals
  const outputs = [
    { name: 'Solar $NOUN', noun: 'light', scale: 0.1, dp: 0 },
    { name: '$NOUN reached', noun: 'Person', scale: 0.7, dp: 0 },
    { name: 'Saved by families', scale: 7.2, dp: 2, currency: '$' },
    { name: 'Extra $NOUN of child study time', noun: 'hour', scale: 105, dp: 0 },
    { name: '$NOUN of CO2 emissions averted', noun: 'Tonne', scale: 0.111, dp: 2 },
  ]

  const applyScale = ({ scale, dp, currency }) => {
    const offset = Math.pow(10, dp)
    const value = Math.floor(donation * scale * offset) / offset
    return currency ? value.toFixed(dp) : value
  }

  const formatName = ({ name, noun }, value) => {
    if (!noun) return name

    return name.replace('$NOUN', pluralize(noun, value))
  }

  return (
    <div className="calculator">
      <div className="row">
        <div className="input-line">
          <div>A donation of</div>

          <div className="currency">
            <span>£</span>
            <input
              title="Donation"
              pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
              type="number"
              min="1"
              max="1000000"
              step="1"
              value={donation}
              onChange={event => setDonation(event.target.value)}
            />
          </div>

          <div>will result in:</div>
        </div>

        <div className="cta">
          <a href={`https://www.amigos.org.uk/donate/fundraise/${donation}/credit-card`}>
            {/* TODO: Yellow Donate button from Amigos site */}
            <Button>Donate {donation}</Button>
          </a>
        </div>
      </div>
      <div className="outputs">
        {outputs.map(output => {
          const value = applyScale(output)
          const name = formatName(output, value)

          return (
            <div key={name}>
              {output.currency}
              {value} {name}
            </div>
          )
        })}
      </div>
    </div>
  )
}
