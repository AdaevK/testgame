import React from 'react';
import PropTypes from 'prop-types';
import GameAttempt from './game_attempt';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      attempts: [],
      input: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const attempt = {
      number: this.state.attempts.length + 1,
      input: this.state.input,
      result: 'BK',
    };

    this.setState({
      attempts: [attempt, ...this.state.attempts],
      input: '',
    });
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

  render() {
    const { attempts, input } = this.state;

    return (
      <div className="row game">
        <div className="col-12 mb-1">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group game__input">
              <input className="form-control" value={input} onChange={this.handleInputChange}/>
              <div className="input-group-append">
                <button type="submit" className="btn btn-success">Проверить</button>
              </div>
            </div>
            <small>Введите 4-х значное число.</small>
          </form>
        </div>
        <div className="col-12 text-center">
          <h4>Предыдущие попытки</h4>
          <ul className="game__attempts attempts mt-1">
            {
              attempts.map((attempt) => {
                return <GameAttempt key={attempt.number} {...attempt} />
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

Game.propTypes = {
  id: PropTypes.number,
}

export default Game;