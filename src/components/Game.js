import React, { useEffect, useState, useRef } from 'react';
import { func, shape, string, number } from 'prop-types';

import Player from './Player';
import { PlayersPropTypes } from './Player';

const Game = ({ game, fetchGameWonData }) => {
  const { matchId, players, scoreToWin } = game;
  const playFirst = useRef(true);
  const [scores, setScores] = useState(players.map(() => 0));
  const [indexOfRounds, setIndexOfRounds] = useState(0);
  const [indexOfWinner, setIndexOfWinner] = useState(undefined);

  
  useEffect(() => {
    if (playFirst.current) {
      playFirst.current = false;
      return;
    }

    if (scores[indexOfRounds] >= scoreToWin) {
      setIndexOfWinner(indexOfRounds);
      fetchGameWonData({ matchId, winnerId: players[indexOfRounds].id });
    } else {
      setIndexOfRounds((indexOfRounds + 1) - Math.floor ((indexOfRounds + 1)/scores.length) * scores.length);
    }
  }, [scores]);

  const roll = (index) => {
    setScores((scores) => {
      const roll = Math.floor(Math.random() * 6) + 1;
      const newScores = [...scores];
      newScores[index] = newScores[index] + roll;
      return newScores;
    });
  };

  return (
    <div className='container game-setup'>
      <div className='match-id'>
        <span >Match ID: {matchId}</span>
      </div>
      <h1 className = 'game-title'>Roll the dice</h1>
      <div className="score-to-win" >Score to win: {scoreToWin}</div>
      { indexOfWinner >= 0 ? 
      <div><h1 className='winner'>Player {indexOfWinner + 1} you won congratulations!!</h1></div>: ''}
        <div className='players'>
          {players.map((player, index) => (
            <Player
              key={player.id}
              isTurn={indexOfRounds === index}
              isWinner={indexOfWinner === index}
              player={player}
              score={scores[index]}
              onRoll={() => roll(index)}
            />
          ))}
        </div>
      </div>
  );
};

const GamePropTypes = shape({
  matchId: string.isRequired,
  players: PlayersPropTypes.isRequired,
  scoreToWin: number.isRequired,
}); 

Game.propTypes = {
  game: GamePropTypes.isRequired,
  fetchGameWonData: func.isRequired,
};

export default Game;
