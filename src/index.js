import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

import Game from './components/Game';
import './index.scss';

const url = 'http://localhost:8000/api/game';

const App = () => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetch data from API
    const fetchGameData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setGame(json);
    setLoading(false);
  }

  //post `winnerId` and `gameId`
  const fetchGameWonData = async (matchId, winnerId) => {
    try {
      await fetch(url , {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matchId, winnerId })
        });
    }
    catch (error) {
      alert(error); // TypeError: failed to post
    }
  }

  useEffect(() => {
    fetchGameData();
  }, []);

  return loading ? <div><h1>Game is loading...</h1></div> : <Game game={game}  fetchGameWonData={fetchGameWonData}/>
};

render(<App />, document.getElementById('app'));
