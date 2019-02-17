import React from 'react';
import Game from './game';

import api from '../api';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: null,
      disabled: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { disabled } = this.state;

    if (!disabled) {
      this.setState({ disabled: false, game: null });

      api.game.new()
        .then(() => {
          this.setState({
            disabled: false,
            game: {},
          });
        })
        .catch((err) => {
          this.setState({ disabled: false, game: null });
          console.log(err);
        });
    }
  }

  render() {
    const { game, disabled } = this.state;
    const gameElement = (game !== null) ? <Game {...game} /> : null;

    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-12">
            <h1>Игра &quot;Угадай число&quot;</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-3">
            <button type="button" className="btn btn-primary" onClick={this.handleClick} disabled={disabled}>
              Начать новую игру
            </button>
          </div>
        </div>
        {gameElement}
      </div>
    );
  }
}
