import React, { useState, useEffect } from 'react'

import './Calculator.scss'
import { Button } from '../Button/Button'

export const Calculator = () => {
  const [donation, setDonation] = useState(10)
  const [solarPanels, setSolarPanels] = useState(0)

  useEffect(() => {
    setSolarPanels(Math.floor(donation * 0.1))
  }, [donation])

  // TODO: Handle plurals
  const outputs = [
    { name: 'Solar lights', scale: 1, dp: 0 },
    { name: 'People reached', scale: 7, dp: 0 },
    { name: 'Saved by families', scale: 72, dp: 2, currency: '$' },
    { name: 'Extra hours of child study time', scale: 1050, dp: 0 },
    {
      name: (
        <span>
          Tonnes of CO<sub>2</sub> emissions averted
        </span>
      ),
      scale: 1.11,
      dp: 2,
    },
  ]

  const applyScale = ({ scale, dp, currency }) => {
    const offset = Math.pow(10, dp)
    const value = Math.floor(solarPanels * scale * offset) / offset
    return currency ? value.toFixed(dp) : value
  }

  return (
    <div className="calculator">
      <div className="row center">
        {/* TODO: Unit? */}
        <div>A donation of</div>

        <div>
          <input
            title="Donation"
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
      <div className="outputs">
        {outputs.map(output => (
          <div key={output.name}>
            {output.currency}
            {applyScale(output)} {output.name}
          </div>
        ))}
      </div>

      <div class="cta">
        <a href={`https://www.amigos.org.uk/donate/fundraise/${donation}/credit-card`}>
          <Button>Donate {donation}</Button>
        </a>
      </div>
    </div>
  )
}
