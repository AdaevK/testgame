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

    /* eslint-disable react/jsx-one-expression-per-line */
    return (
      <li className="attempt">
        {number}: {input} - {result}
      </li>
    );
    /* eslint-enable */
  }
}

GameAttempt.propTypes = {
  number: PropTypes.number.isRequired,
  input: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
};

export default GameAttempt;
