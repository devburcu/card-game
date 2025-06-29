import React from 'react';
import GameBoard from './Components/GameBoard.jsx';
import Timer from './Components/Timer.jsx';
import GameControls from './Components/GameControls.jsx';
import ScoreBoard from './Components/ScoreBoard.jsx';

export default function App() {

  return (
    <>
      <div style={{ marginBottom: '50px' }}>

        <h1 className='title'>Hafıza Oyunu</h1>
        <GameControls />
        <ScoreBoard />
        <GameBoard />
        <Timer />
      </div>
    </>
  );
}
