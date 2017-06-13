import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={props.id} onClick={props.onClick}>
            {props.value}
        </button>
    );
}


class Board extends React.Component {
    renderSquare(buttonID) {
        let winSquare = this.props.winSquare;
        return <Square
            value={this.props.squares[buttonID]}
            onClick={() => this.props.onClick(buttonID)}
            id={"square".concat(buttonID === winSquare[0] || buttonID === winSquare[1] || buttonID === winSquare[2] ? " win" : "")}
        />;
    }

    render() {
        let row = [];
        let board = [];
        let buttonID = 0;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                row.push(
                    (this.renderSquare(buttonID)));
                buttonID++;

            }
            board.push(<div className="board-row">{row}</div>);
            row = [];
        }
        return (
            <div>
                {board }
            </div>
        );
    }
}
class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: new Array(9).fill(null)
            }],
            xIsNext: true,
            winSquare: null,


        };
    }


    handleClick(i) {
        const history = this.state.history;
        const currentState = history[history.length - 1];
        const currentSquares = currentState.squares.slice();
        if (calculateWinner(currentSquares) || currentSquares[i]) {
            return;
        }
        currentSquares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: currentSquares
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        let winSquare= [];
        let status;
        if (winner) {
            status = 'Winner: '.concat(this.state.xIsNext ? 'O' : 'X');
            winSquare = winner;

        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winSquare={winSquare}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        )
    };
}


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return lines[i];
        }
    }
    return null;
}
