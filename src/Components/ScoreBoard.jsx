import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css'

export default function ScoreBoard() {
  const score = useSelector(state => state.game.score);

  return (
    <div className='point'>
      Puan: {score}
    </div>
  );
}
