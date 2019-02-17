import React from 'react';
import GameAttempt from './game_attempt';

import api from '../api';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attempts: [],
      input: '',
      invalid: false,
      disabled: false,
      message: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { input } = this.state;
    this.setState({ disabled: true });

    api.game.check({ input })
      .then(({ data }) => {
        const { state, result } = data;

        switch (state) {
          case 'end':
            this.setState({ message: 'Игра больше не доступна, начните новую игру.', disabled: true });
            break;
          case 'invalid':
            this.setState({ invalid: true, disabled: false });
            break;
          case 'win':
            this.addAttempt(result);
            this.setState({ message: `Поздравляю! Вы угадали число ${input}.`, disabled: true });
            break;
          default:
            this.addAttempt(result);
            this.setState({ disabled: false });
        }
      })
      .catch((err) => {
        this.setState({ disabled: false });
        console.error(err);
      });
  }

  addAttempt(result) {
    const { input, attempts } = this.state;

    const attempt = {
      number: attempts.length + 1,
      input,
      result,
    };

    this.setState({
      attempts: [attempt, ...attempts],
      input: '',
    });
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value, invalid: false });
  }

  render() {
    const {
      attempts, input, invalid, disabled, message,
    } = this.state;

    const messageElement = message.length ? (
      <div className="col-12 mb-1">
        <div className="alert alert-primary">
          {message}
        </div>
      </div>
    ) : null;

    return (
      <div className="row game">
        {messageElement}
        <div className="col-12 mb-1">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group game__input">
              <input className={`form-control${invalid ? ' is-invalid' : ''}`} value={input} onChange={this.handleInputChange} disabled={disabled} />
              <div className="input-group-append">
                <button type="submit" className="btn btn-success" disabled={disabled}>Проверить</button>
              </div>
            </div>
            <small>Введите 4-х значное число.</small>
          </form>
        </div>
        <div className="col-12 text-center">
          <h4>Предыдущие попытки</h4>
          <ul className="game__attempts attempts mt-1">
            {
              attempts.map(attempt => <GameAttempt key={attempt.number} {...attempt} />)
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Game;
