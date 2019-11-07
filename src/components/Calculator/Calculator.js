import React, { useState } from 'react'
import pluralize from 'pluralize'

import './Calculator.scss'
import { Button } from '../Button/Button'

export const Calculator = () => {
  const [donation, setDonation] = useState(35)

  // TODO: Handle plurals
  const outputs = [
    { name: 'Solar @', noun: 'light', scale: 0.1, dp: 0 },
    { name: '@ reached', noun: 'Person', scale: 0.7, dp: 0 },
    { name: 'Saved by families', scale: 7.2, dp: 2, currency: '£' },
    { name: 'Extra @ of child study time', noun: 'hour', scale: 105, dp: 0 },
    { name: '@ of CO2 emissions averted', noun: 'Tonne', scale: 0.111, dp: 2 },
  ]

  const applyScale = ({ scale, dp, currency }) => {
    const offset = Math.pow(10, dp)
    const value = Math.floor(donation * scale * offset) / offset
    return currency ? value.toFixed(dp) : value
  }

  const formatName = ({ name, noun }, value) => {
    if (!noun) return name

    return name.replace('@', pluralize(noun, value))
  }

  return (
    <div className="calculator">
      <div className="row">
        <div className="input-line top-space">
          <div className="nowrap">A donation of</div>

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
              onChange={event => {
                const { value } = event.target
                if (value <= 10000000) {
                  setDonation(value)
                }
              }}
            />
          </div>

          <div className="nowrap">will result in:</div>
        </div>
      </div>
      <div className="outputs">
        {outputs.map(output => {
          const value = applyScale(output)
          const name = formatName(output, value)

          return (
            <React.Fragment key={name}>
              <div className="output-value">
                {output.currency}
                {value}
              </div>
              <div>{name}</div>
            </React.Fragment>
          )
        })}
      </div>

      {/* <div className="cta top-space">
        <a
          target="_parent"
          href={`https://www.amigos.org.uk/donate/fundraise/${Number(donation) || 10}/credit-card`}>
          <Button secondary>
            Donate {!isNaN(donation) && donation > 0 && '£' + Number(donation)}
          </Button>
        </a>
      </div> */}
    </div>
  )
}
