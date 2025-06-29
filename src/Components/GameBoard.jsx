import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { closeUnmatched } from '../redux/gameSlice';
import '../App.css';

export default function GameBoard() {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.game.cards);
  const openedCards = useSelector(state => state.game.openedCards);
  const gameStarted = useSelector(state => state.game.gameStarted);

  useEffect(() => {
    if (openedCards.length === 2) {
      const timer = setTimeout(() => {
        dispatch(closeUnmatched());
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [openedCards, dispatch]);

  if (!gameStarted) return null;

  return (
    <div className="playground">
      {cards.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}
