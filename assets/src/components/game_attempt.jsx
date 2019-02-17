import React from 'react';
import PropTypes from 'prop-types';

class GameAttempt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: props.number,
      input: props.input,
      result: props.result,
    };
  }

  render() {
    const { number, input, result } = this.state;

    return (
      <li className="attempt">
        {number}: {input} - {result}
      </li>
    );
  }
}

GameAttempt.propTypes = {
  number: PropTypes.number,
  input: PropTypes.string,
  result: PropTypes.string,
}

export default GameAttempt;