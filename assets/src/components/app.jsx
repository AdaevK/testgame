import React from 'react';
import Game from './game';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: null,
      disabled: false,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if(!this.state.disabled) {
      this.setState({ disabled: false });

      this.setState({
        disabled: false,
        game: { id: 1 },
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
            <h1>Игра "Угадай число"</h1>
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
    )
  }
}