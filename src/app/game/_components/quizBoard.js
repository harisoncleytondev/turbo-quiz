'use client';
import GameContext from '@/context/game/GameContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';

export default function QuizBoard() {
  const { questions, setQuestions, uuid, setUuid } = useContext(GameContext);
  const [play, setPlay] = useState(true);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    if (uuid === '') {
      setPlay(false);
    }
  }, [uuid]);

  useEffect(() => {
    if (uuid === '') {
      setPlay(false);
    }
  }, []);

  const handleClickQuestion = async (event, aw) => {
    console.log(questions);
    try {
      const response = await fetch(`/api/game/ingame/${uuid}`, {
        method: 'POST',
        body: JSON.stringify({
          answer: aw,
        }),
      });
      if (!response.ok) throw new Error('Erro ao verificar resposta');

      const data = await response.json();

      if (data.scored === true) {
        event.target.classList.add('bg-green-500');
      } else {
        event.target.classList.add('bg-red-500');
      }

      setTimeout(() => {
        event.target.classList.remove('bg-green-500');
        event.target.classList.remove('bg-red-500');
        setQuestions(data.questions);
      }, 1200);

      if (data.questions.finished) {
        setQuestions(data.questions);
        setFinish(true);
      }
    } catch (error) {
      alert('Erro ao buscar resposta.');
      console.error(error);
    }
  };

  return questions.length === 0 ? (
    <div className="loader scale-125 m-5"></div>
  ) : (
    <>
      <h1
        id="ingame_display_h1"
        className="min-w-[20vw] max-w-[70vw] py-5 text-[20px] font-bold font-turns text-center text-[#E0E0E0]"
      >
        {questions.question || ''}
      </h1>

      <div
        id="ingame_display_div_questions"
        className="flex flex-col w-[95%] p-8 gap-8 rounded-md bg-[#9B59B6]"
      >
        <>
          {finish === true ? (
            <div className="flex min-w-full font-mono flex-col items-center justify-center gap-4 p-6 bg-[#9B59B6] rounded-md">
              <span className="text-[#E0E0E0] text-xl font-bold">
                Acertos: {questions.score}
              </span>
              <span className="text-[#E0E0E0] text-xl font-bold">
                Erros: {5 - Number.parseInt(questions.score)}
              </span>
              <button
                onClick={() => {
                  router.push('/');
                  setUuid('');
                }}
                className="flex justify-center items-center py-3 px-6 text-lg rounded-md border-none cursor-pointer text-[#E0E0E0] bg-[#6B3B8A] hover:bg-[#FFD700] hover:text-[#6B3B8A] transition-colors duration-300"
              >
                ENCERRAR
              </button>
            </div>
          ) : play === true ? (
            <>
              {questions?.alternatives?.length > 0 ? (
                questions.alternatives.map((aw, idx) => (
                  <button
                    className="py-3 font-turns text-lg rounded-md border-none cursor-pointer text-[#E0E0E0] bg-[#6B3B8A] hover:bg-[#FFD700] hover:text-[#6B3B8A]"
                    key={idx}
                    onClick={async (e) => await handleClickQuestion(e, aw)}
                  >
                    {aw}
                  </button>
                ))
              ) : (
                <NoSession />
              )}
            </>
          ) : (
            <NoSession />
          )}
        </>
      </div>
    </>
  );
}

const NoSession = () => {
  const router = useRouter();

  return (
    <>
      <h3 className="text-white text-2xl text-center">
        Essa sessão já encerrou, Por favor. Volte ao Menu.
      </h3>

      <button
        onClick={() => router.push('/')}
        className="flex flex-1 justify-center items-center py-3 text-lg rounded-md border-none cursor-pointer text-[#E0E0E0] bg-[#6B3B8A] hover:bg-[#FFD700] hover:text-[#6B3B8A]"
      >
        VOLTAR
      </button>
    </>
  );
};
