'use client';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { ModalTopic } from './modalTopic';
import ModalDifficulty from './modalDifficulty';
import GameContext from '@/context/game/GameContext';
import { useRouter } from 'next/navigation';

export const Button = ({ image, action, name }) => {
  const router = useRouter();
  const [topic, setTopic] = useState(false);
  const [difficulty, setDifficulty] = useState(false);

  const {
    setGameDifficulty,
    gameTopic,
    gameDifficulty,
    setUuid,
    setQuestions,
  } = useContext(GameContext);

  const handleButton = () => {
    if (action === 'start') {
      setTopic(true);
      setGameDifficulty('');
      setUuid('');
      setQuestions('');
    }
  };

  const handleStart = async () => {
    console.log('opa')
    try {
      const response = await fetch('/api/game/create', {
        method: 'POST',
        body: JSON.stringify({ difficulty: gameDifficulty, topic: gameTopic }),
      });

      if (!response.ok) throw new Error('Erro ao criar game');

      const data = await response.json();
      setUuid(data.session);
      setQuestions(data.question);
      router.push('/game');
    } catch (error) {
      alert('Houve um erro ao começar o QUIZ!');
      console.error(error.message);
    }
  };

  return (
    <>
      <div
        className={`${topic || (!topic && difficulty) ? 'block' : 'hidden'}`}
      >
        <ModalTopic
          isVisible={topic}
          onClose={() => setTopic(false)}
          onContinue={() => {
            setTopic(false);
            setDifficulty(true);
          }}
        />

        <ModalDifficulty
          isVisible={difficulty}
          onClose={() => setDifficulty(false)}
          onStart={async () => await handleStart()}
        />
      </div>
      <button
        className={`${
          action === 'start' ? 'scale-110 animate-rotate' : ''
        } bg-[#FFD700] border-none rounded-lg w-16 h-16 transition-all hover:bg-[#ffe030] cursor-pointer`}
        onClick={handleButton}
      >
        <Image
          src={image}
          alt={name}
          width={34}
          height={34}
          className="mx-auto"
        />
      </button>
    </>
  );
};
