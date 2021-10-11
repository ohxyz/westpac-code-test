import React from 'react';
import { Card } from './Card';
import { Dealer } from './dealer';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.timeBeforeFlipCard = 2000;
    this.reactionTime = 2000;

    this.computerMoveTimeoutId = 0;
    this.computerSnapTimeoutId = 0;
    this.computerSnapTimeoutId2 = 0;

    this.state = {
      table: props.dealer.getInfo(),
      isComputerMoving: false,
      isGameStopped: false,

      message: '',
    };
  }

  handlePlayerMove() {
    if (this.state.isGameStopped) {
      alert('Game has stopped!');
      return;
    }
    if (this.state.isComputerMoving) {
      alert('Computer is thinking!');
      return;
    }

    this.props.dealer.playerMove();
    this.setState({
      table: this.props.dealer.getInfo(),
      isComputerMoving: true,
      message: "Computer's turn",
    });

    this.computerMoveTimeoutId = setTimeout(
      this.handleComputerMove.bind(this),
      this.timeBeforeFlipCard
    );
  }

  handleComputerMove() {
    if (this.state.isGameStopped) {
      alert('Game has stopped!');
      return;
    }

    this.computerSnapTimeoutId = setTimeout(() => {
      this.handleComputerSnap();
      this.props.dealer.computerMove();

      this.computerSnapTimeoutId2 = setTimeout(() => {
        this.handleComputerSnap();
        this.setState({
          table: this.props.dealer.getInfo(),
        });
      }, this.reactionTime);

      this.setState({
        table: this.props.dealer.getInfo(),
        isComputerMoving: false,
        message: "Player's turn",
      });
    }, this.reactionTime);
  }

  handleComputerSnap() {
    if (this.props.dealer.canSnap() && !this.state.isGameStopped) {
      alert('Computer calls snap!');
      this.props.dealer.computerSnap();
    }
  }

  handleSnap() {
    if (this.state.isGameStopped) {
      alert('Game has stopped!');
      return;
    }

    if (!this.props.dealer.canSnap()) {
      alert('Cards not same!');
      return;
    }
    alert('Player calls snap!');
    this.props.dealer.playerSnap();
    this.setState({
      table: this.props.dealer.getInfo(),
    });
  }

  handleStartClick() {
    clearTimeout(this.computerMoveTimeoutId);
    clearTimeout(this.computerSnapTimeoutId);
    clearTimeout(this.computerSnapTimeoutId2);

    this.props.onStartClick();
  }

  handleSlide(event) {
    const seconds = event.target.value;
    this.reactionTime = parseInt(seconds) * 1000;
  }

  componentDidUpdate() {
    if (this.state.isGameStopped) {
      return;
    }

    const winner = this.props.dealer.getWinner();
    if (winner) {
      alert(winner + ' wins!');
      this.setState({
        isGameStopped: true,
      });
    }
  }

  render() {
    return (
      <div className="game">
        <div className="message">{this.state.message}</div>
        <div className="row0">
          <div>
            <div className="name">Computer</div>
            <div className="computer-pile"></div>
            <div className="number">
              {this.state.table.computerLeft} cards left
            </div>
          </div>
          <div className="middle-pile">
            {this.state.table.cardOnTop ? (
              <Card
                patternIndex={this.state.table.cardOnTop[0]}
                rankIndex={this.state.table.cardOnTop[1]}
                onSnap={this.handleSnap.bind(this)}
              />
            ) : (
              <div className="empty"></div>
            )}
            <div className="number">{this.state.table.middleNow} cards now</div>
          </div>
          <div>
            <div className="name">Player</div>
            <button
              className="player-pile"
              onClick={this.handlePlayerMove.bind(this)}
            ></button>
            <div className="number">
              {this.state.table.playerLeft} cards left
            </div>
          </div>
        </div>
        <div className="row1">
          <button
            className="start-button"
            onClick={this.handleStartClick.bind(this)}
          >
            Start
          </button>
        </div>
        <div className="row2">
          <label className="slider-label" htmlFor="seconds">
            Reaction time 1 - 10 seconds
          </label>
          <input
            type="range"
            id="seconds"
            name="seconds"
            min="1"
            max="10"
            defaultValue="2"
            onChange={this.handleSlide.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Game;
