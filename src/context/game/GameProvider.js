'use client';
import GameContext from './GameContext';
import { useState, useEffect } from 'react';

export const GameProvider = ({ children }) => {
  const [gameTopic, setGameTopic] = useState('');
  const [gameDifficulty, setGameDifficulty] = useState('');
  const [turns, setTurns] = useState(0);
  const [uuid, setUuid] = useState('');
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    localStorage.getItem('gameTopic') === null
      ? setGameTopic('')
      : setGameTopic(localStorage.getItem('gameTopic'));
  }, []);

  useEffect(() => {
    localStorage.setItem('gameTopic', gameTopic);
  }, [gameTopic]);

  return (
    <GameContext.Provider
      value={{
        gameTopic,
        setGameTopic,
        gameDifficulty,
        setGameDifficulty,
        turns,
        setTurns,
        questions,
        setQuestions,
        uuid,
        setUuid,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
