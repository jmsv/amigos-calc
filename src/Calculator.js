import React, { Component } from 'react'

import './Calculator.css'

export default class Calculator extends Component {
  fields = ['Test 1', 'Test 2', 'Test 3']

  render() {
    return (
      <div className="form-row">
        {this.fields.map(field => (
          <div class="form-field">
            <label>{field}</label>
            <input type="text" title={field} />
          </div>
        ))}

        <div>
          <button type="button">Button</button>
        </div>
      </div>
    )
  }
}
