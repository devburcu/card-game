import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { flipCard } from '../redux/gameSlice';
import '../App.css'

export default function Card({ card }) {
    const dispatch = useDispatch();
    const openedCards = useSelector(state => state.game.openedCards);

    const handleClick = () => {
        // Eğer kart zaten açık ya da eşleşmişse tıklamayı engelle
        if (!card.close || card.complete) return;

        // Eğer zaten 2 kart açıldıysa bekle
        if (openedCards.length === 2) return;

        dispatch(flipCard(card.id));
    };

    return (
        <div
            className={"card" + (!card.close ? ' opened' : '') + (card.complete ? ' matched' : '')}
            onClick={handleClick}
        >
            <div className='card-inner'>
                <div className="front">?</div>
                <div className="back">
                    <img
                        className='card-image'
                        src={"https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/" + card.name + ".png"}
                        alt={card.name}
                    />
                </div>
            </div>
        </div>
    );
}
