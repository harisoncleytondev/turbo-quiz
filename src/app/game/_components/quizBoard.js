"use client";
import GameContext from '@/context/game/GameContext';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState, useContext } from 'react';
import ModalResult from '@/app/_components/modalResult';

function QuizBoard() {
  const router = useRouter();
  const { questions, setQuestions, uuid, setUuid } = useContext(GameContext);
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsSessionActive(uuid !== '');
  }, [uuid]);

  const currentQuestion = useMemo(() => questions?.question ?? '', [questions]);
  const currentAlternatives = useMemo(
    () => questions?.alternatives ?? [],
    [questions]
  );

  const handleClickQuestion = useCallback(
    async (event, aw) => {
      if (!isSessionActive || isFinished || isSubmitting) return;
      setIsSubmitting(true);
      try {
        const response = await fetch(`/api/game/ingame/${uuid}`, {
          method: 'POST',
          body: JSON.stringify({ answer: aw }),
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
          if (data?.questions?.finished) {
            setIsFinished(true);
          }
          setIsSubmitting(false);
        }, 900);
      } catch (error) {
        alert('Erro ao buscar resposta.');
        console.error(error);
        setIsSubmitting(false);
      }
    },
    [isFinished, isSessionActive, isSubmitting, setQuestions, uuid]
  );

  const handleCloseAndExit = useCallback(() => {
    setUuid('');
    router.push('/');
  }, [router, setUuid]);

  if (!questions || Object.keys(questions).length === 0) {
    return <div className="loader scale-125 m-5" />;
  }

  return (
    <>
      <h1
        id="ingame_display_h1"
        className="min-w-[20vw] max-w-[70vw] py-5 text-[20px] font-bold font-turns text-center text-[#E0E0E0]"
      >
        {currentQuestion}
      </h1>

      <div
        id="ingame_display_div_questions"
        className="flex flex-col w-full max-w-[700px] max-h-[60%] overflow-y-auto p-6 sm:p-8 gap-4 sm:gap-6 rounded-md bg-[#9B59B6] mx-auto"
      >
        {isSessionActive && !isFinished ? (
          <>
            {currentAlternatives.length > 0 ? (
              currentAlternatives.map((aw, idx) => (
                <button
                  className="py-3 font-turns text-lg rounded-md border-none cursor-pointer text-[#E0E0E0] bg-[#6B3B8A] hover:bg-[#FFD700] hover:text-[#6B3B8A] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  key={idx}
                  disabled={isSubmitting}
                  onClick={async (e) => await handleClickQuestion(e, aw)}
                >
                  {aw}
                </button>
              ))
            ) : (
              <NoSession />
            )}
          </>
        ) : isFinished ? (
          <div className="min-w-full" />
        ) : (
          <NoSession />
        )}
      </div>

      <ModalResult
        open={isFinished}
        onRestart={handleCloseAndExit}
        onExit={handleCloseAndExit}
        score={Number(questions?.score ?? 0)}
        total={Number(questions?.total ?? 5)}
      />
    </>
  );
}

const NoSession = () => {
  const router = useRouter();

  return (
    <>
      <h3 className="text-white text-2xl text-center">
        Essa sessão já encerrou, por favor volte ao menu.
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

export default memo(QuizBoard);
