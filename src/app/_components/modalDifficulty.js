'use client'
import GameContext from '@/context/game/GameContext';
import { useContext } from 'react';

const ModalDifficulty = ({
  isVisible,
  onClose,
  onStart,
}) => {
  const { gameDifficulty, setGameDifficulty } = useContext(GameContext);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md"></div>

      <div className="relative bg-purple-800 p-8 rounded-3xl z-10 shadow-2xl">
        <button
          className="absolute top-5 right-5 text-white text-2xl cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        <h4 className="text-yellow-400 text-center text-4xl font-normal">
          Dificuldade:
        </h4>
        <p className="text-white text-center text-base font-bold mt-2">
          Escolha sua dificuldade... mas esteja preparado!
        </p>

        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <select
            id="index_modal_difficulty_select"
            className="border-none rounded-md outline-none w-full bg-white px-5 py-2 text-2xl transition-all duration-300 focus:outline-yellow-gold focus:outline-2"
            value={gameDifficulty}
            onChange={(e) => setGameDifficulty(e.target.value)}
          >
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>

          <button
            className="bg-yellow-300 border-none rounded-md flex w-full px-2.5 py-2.5 justify-center items-center gap-2.5 transition-all duration-600 cursor-pointer uppercase text-2xl font-bold text-purple-800 hover:bg-[#ffe030]"
            onClick={onStart}
          >
            Começar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDifficulty;
