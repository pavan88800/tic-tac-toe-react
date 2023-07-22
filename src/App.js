import "./styles.css";
import { useState, useEffect } from "react";
const Row = 3;
const Col = 3;
export default function App() {
  const [Grid, setGrid] = useState([]);
  const [playerX, setPlayerX] = useState("X");
  const [playerO, setPlayerO] = useState("O");
  const [currentPlayer, setCurrentPlayer] = useState(playerX);
  const [won, setWon] = useState(false);
  const [track, setTrack] = useState(new Array(9).fill(null));
  const [isDraw, setIsDraw] = useState(false);
  const [winnerCheck] = useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]);

  useEffect(() => {
    setGrid(createGrid());
  }, []);

  useEffect(() => {
    handlePlayerWon();
  }, [track]);

  const createGrid = () => {
    const row = [];
    for (let i = 0; i < Row; i++) {
      for (let j = 0; j < Col; j++) {
        row.push(new Array("").fill(null));
      }
    }
    return row;
  };

  const handleClick = (k, i) => {
    if (won) {
      return;
    }
    const copyGrid = [...track];

    if (copyGrid[k] === playerO || copyGrid[k] === playerX) {
      return;
    }

    if (copyGrid[k] === null) {
      copyGrid[k] = currentPlayer;
    }

    setTrack(copyGrid);

    if (currentPlayer === playerX) {
      setCurrentPlayer(playerO);
    } else {
      setCurrentPlayer(playerX);
    }
  };

  function handlePlayerWon() {
    for (let playerWon of winnerCheck) {
      const [a, b, c] = playerWon;
      if (track[a] && track[a] === track[b] && track[a] === track[c]) {
        setWon(true);
        setCurrentPlayer(track[a]);
        return true;
      }
    }
    if (!track.includes(null)) {
      setIsDraw(true);
    }
  }

  return (
    <>
      <button onClick={() => window.location.reload()}>ReStart Game</button>
      {won ? <p>{`Player ${currentPlayer} won the Game`}</p> : ""}
      {isDraw ? <p>{`match is Draw`}</p> : ""}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${3}, 90px) `
        }}
        className="App"
      >
        {Grid.map((row, k) => {
          return row.map((col, i) => (
            <div
              onClick={() => handleClick(k, i)}
              key={`${k}-${i}`}
              style={{
                width: 90,
                height: 90,
                border: "1px solid #000",
                cursor: "pointer"
              }}
            >
              <p style={{ padding: "10px", fontSize: "25px" }}>{track[k]}</p>
            </div>
          ));
        })}
      </div>
    </>
  );
}
