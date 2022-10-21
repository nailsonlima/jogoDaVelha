import { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const emptyBoard = Array(9).fill("")

  const [board, setBoard] = useState(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);


  const handleCellClick = (index) =>{
    if(board[index] !== "") return;
    if(winner) return;

    setBoard(board.map((item, iteIndex) => iteIndex === index ? currentPlayer : item));
    if(currentPlayer==="X"){
      setCurrentPlayer("O")
    }else{
      setCurrentPlayer("X")
    }
  }

  const checkWinner=()=>{
    const possibleWaysToWin=[
      [board[0],board[1], board[2]],
      [board[3],board[4], board[5]],
      [board[6],board[7], board[8]],

      [board[0],board[3], board[6]],
      [board[1],board[4], board[7]],
      [board[2],board[5], board[8]],

      [board[0],board[4], board[8]],
      [board[2],board[4], board[6]],
    ];

    possibleWaysToWin.forEach(cells => {
      if(cells.every(cell => cell==="O")) setWinner('O')
      if(cells.every(cell => cell==="X")) setWinner('X')
    })

    checkDraw();
  }

  const checkDraw = ()=>{
    if(board.every(item=> item !== "")){
      setWinner("E")
    }
  }

  useEffect(checkWinner, [board])

  function resetGame(){
    setCurrentPlayer("X");
    setBoard(emptyBoard);
    setWinner('')
  }

  return (
    <main>
      <h1 className='title'>Jogo da Velha</h1>
      <div className={`board ${winner} ? "game-over" : ""`}>
        {board.map((item, index) => (
          <div 
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
      {winner &&
      <footer>
        {winner === "E" ? 
          <h2 className='winner-message'>
            <span className={winner}>Empatou</span>
          </h2>
        :
          <h2 className='winner-message'>
            <span className={winner}>{winner}</span> venceu!
          </h2>
        }
      <button onClick={resetGame}>Recomeçar Jogo</button>
    </footer> 
    }
      
    </main>
  );
}

export default TicTacToe;
