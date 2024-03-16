import React, { Component } from 'react';

export class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: '2px',
      borderStyle: 'solid',
      fontWeight: 'bolder',
      borderRadius: '7px',
      borderColor: this.color,
      textAlign: 'center',
      fontSize: '12px',
      margin: '10px 0',
      padding: '10px',
    };
  };

  render() {
    return (
      <div className='Alert'>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(0, 0, 225)';
    this.bgColor = 'rgb(220, 220, 225)';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(225, 0, 0)';
    this.bgColor = 'rgb(225, 220, 220)';
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(17, 172, 172)';
    this.bgColor = 'rgb(199, 249, 249)';
  }
}

export default Alert;
export { InfoAlert, ErrorAlert, WarningAlert };
