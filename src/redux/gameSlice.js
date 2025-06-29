import { createSlice } from '@reduxjs/toolkit';

const baseFrameworks = [
  'angular2', 'vue', 'react', 'grunt', 'phantomjs', 'ember', 'babel',
  'ionic', 'gulp', 'meteor', 'yeoman', 'yarn', 'nodejs', 'bower', 'browserify'
];

function shuffle(array) {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const initialState = {
  cards: [],
  openedCards: [],
  matchedCount: 0,
  gameStarted: false,
  gameCompleted: false,
  startTime: null,
  elapsedTime: 0,  // Oyun süresi (saniye)
  score: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setupGame(state) {
      const duplicated = [...baseFrameworks, ...baseFrameworks];
      const shuffledCards = shuffle(duplicated).map((name, index) => ({
        id: index,
        name,
        close: true,
        complete: false,
      }));
      state.cards = shuffledCards;
      state.openedCards = [];
      state.matchedCount = 0;
      state.gameStarted = true;
      state.gameCompleted = false;
      state.startTime = Date.now();
      state.elapsedTime = 0;
      state.score = 0;
    },
    flipCard(state, action) {
      const cardId = action.payload;
      if (state.openedCards.length === 2) return;
      if (state.openedCards.includes(cardId)) return;

      state.openedCards.push(cardId);
      const card = state.cards.find(c => c.id === cardId);
      if (card) card.close = false;

      if (state.openedCards.length === 2) {
        const [firstId, secondId] = state.openedCards;
        const firstCard = state.cards.find(c => c.id === firstId);
        const secondCard = state.cards.find(c => c.id === secondId);

        if (firstCard && secondCard) {
          if (firstCard.name === secondCard.name) {
            firstCard.complete = true;
            secondCard.complete = true;
            state.matchedCount += 1;
            state.openedCards = [];
            state.score += 50;

            if (state.matchedCount === baseFrameworks.length) {
              state.gameCompleted = true;
              state.gameStarted = false;
              state.elapsedTime = Math.floor((Date.now() - state.startTime) / 1000);
            }
          }
        }
      }
    },
    closeUnmatched(state) {
      if (state.openedCards.length === 2) {
        const [firstId, secondId] = state.openedCards;
        const firstCard = state.cards.find(c => c.id === firstId);
        const secondCard = state.cards.find(c => c.id === secondId);

        if (firstCard && secondCard) {
          if (firstCard.name !== secondCard.name) {
            firstCard.close = true;
            secondCard.close = true;
            state.score -= 10;
          }
        }
        state.openedCards = [];
      }
    }
  }
});

export const { setupGame, flipCard, closeUnmatched } = gameSlice.actions;
export default gameSlice.reducer;
