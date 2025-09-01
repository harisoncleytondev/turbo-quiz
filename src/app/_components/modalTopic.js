'use client';
import GameContext from '@/context/game/GameContext';
import { useContext } from 'react';

export const ModalTopic = ({
  isVisible,
  onClose,
  onContinue,
}) => {
  const { gameTopic, setGameTopic } = useContext(GameContext);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md"></div>

      <div className="relative z-20 bg-purple-800 p-8 rounded-3xl shadow-2xl">
        <button
          className="absolute top-5 right-5 text-white text-2xl cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        <h4 className="text-yellow-400 text-center text-4xl font-normal">
          Tema:
        </h4>
        <p className="text-white text-center text-base font-bold mt-2">
          Escolha o tema que gostaria de estudar
        </p>

        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <input
            type="text"
            placeholder="Escolha um tema..."
            className="border-none bg-white rounded-md outline-none w-full px-5 py-2 text-2xl transition-all duration-300 focus:outline-yellow-400 focus:outline-2"
            value={gameTopic}
            onChange={(e) => setGameTopic(e.target.value)}
            required
          />
          <button
            className="bg-yellow-400 border-none rounded-md flex w-[25vw] px-2.5 py-2.5 justify-center items-center gap-2.5 transition-all duration-600 cursor-pointer uppercase text-2xl font-bold text-purple-900 hover:bg-[#ffe030]"
            onClick={onContinue}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
