import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setupGame } from '../redux/gameSlice';
import '../App.css'

export default function GameControls() {
    const dispatch = useDispatch();
    const gameStarted = useSelector(state => state.game.gameStarted);
    const gameCompleted = useSelector(state => state.game.gameCompleted);

    const handleStart = () => {
        dispatch(setupGame());
    };

    if (!gameStarted) {
        return (
            <button className='button' onClick={handleStart}>
                {gameCompleted ? 'Tekrar Başla' : 'Başla'}
            </button>
        );
    }

    return null; // oyun başladıysa buton gösterme
}
