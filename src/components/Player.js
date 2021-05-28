import React from 'react';
import { bool, func, number, shape, string, arrayOf } from 'prop-types';

const Player = ({ isTurn, isWinner, onRoll, player, score }) => {
  const { id, name, imageUrl } = player;
 
  return (
    <div key={id} className= {'player-board ' + (isWinner ? 'pl-winner' : '')}>
      <h3>{name}</h3>
      <img className='plr-avatar' alt="player image" src={imageUrl} />
      <p className='score-indicator'>Score: {score}</p>
      <button disabled={!isTurn || isWinner} onClick={onRoll}>
        Roll
      </button>
    </div>
  );
};

const PlayerPropTypes = shape({
  id: string,
  imageUrl: string,
  name: string,
});

export const PlayersPropTypes = arrayOf(PlayerPropTypes);

Player.propTypes = {
  isTurn: bool,
  isWinner: bool,
  onRoll: func.isRequired,
  player: PlayerPropTypes.isRequired,
  score: number.isRequired,
};

Player.defaultProps = {
  isTurn: false,
  isWinner: false,
};

export default Player;
