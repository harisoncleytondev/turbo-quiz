import Image from 'next/image';
import QuizBoard from './_components/quizBoard';
import Link from 'next/link';

const InGamePage = () => {
  return (
    <div>
      <div className="flex justify-between h-screen w-screen relative">
        <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-[1000] hidden"></div>
        <section
          id="ingame_display"
          className="absolute left-1/2 -translate-x-1/2 bg-[rgba(32,33,35,0.6)] h-screen w-[440px] bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center"
          style={{
            backgroundImage: 'url(/background-details.png)',
          }}
        >
          <div
            id="ingame_display_button_back"
            className="absolute top-[2%] left-[5%]"
          >
            <Link href="/">
              <button className="bg-[#FFD700] flex items-center justify-center border-none rounded-md w-[60px] h-[60px] transition-all duration-500 ease-in-out cursor-pointer hover:bg-[#ffe030]">
                <Image
                  src="/icons/exit-icon.png"
                  alt="Voltar à pagina inicial."
                  width={34}
                  height={34}
                />
              </button>
            </Link>
          </div>

          <div
            id="ingame_display_texts"
            className="flex items-center justify-center"
          >
            <div>
              <div className="flex items-center pt-8">
                <h2 className="text-[60px] font-normal text-[#FFD700]">
                  Turbo
                </h2>
                <span className="pt-5 text-[22px] font-bold text-[#f00]">
                  1.0v
                </span>
              </div>
              <h2 className="pl-[7.5rem] text-[60px] font-bold text-[#E0E0E0] animate-rotate">
                Quiz
              </h2>
            </div>
          </div>

          <QuizBoard />

          <footer className="text-amber-400">
            <a target="_blank" href="https://github.com/harisoncleytondev/">
              Criado por Harison Cleyton
            </a>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default InGamePage;
