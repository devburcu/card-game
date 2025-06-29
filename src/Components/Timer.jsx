import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Timer() {
    const gameCompleted = useSelector(state => state.game.gameCompleted);
    const elapsedTime = useSelector(state => state.game.elapsedTime);
    const startTime = useSelector(state => state.game.startTime);

    const [displayTime, setDisplayTime] = useState(0);

    useEffect(() => {
        if (!startTime) return; // oyun başlamadıysa işlem yapma

        if (gameCompleted) {
            setDisplayTime(elapsedTime);
            return;
        }

        const updateTime = () => {
            setDisplayTime(Math.floor((Date.now() - startTime) / 1000));
        };

        updateTime(); // hemen güncelle
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [gameCompleted, startTime, elapsedTime]);

    return (
        <div className='time'>
            Süre: {displayTime} saniye
        </div>
    );
}
