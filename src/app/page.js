import Image from 'next/image';
import { Button } from './_components/buttonComponent';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#6B3B8A]">
      <section
        className="relative bg-cover bg-center bg-no-repeat h-screen w-full md:w-[440px] flex flex-col items-center justify-center p-4 rounded-lg shadow-lg"
        style={{ backgroundImage: `url(/background-details.png)` }}
      >
        <div className="absolute inset-0 bg-[#202123]/30"></div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="flex items-center pt-8">
            <h2 className="text-6xl font-normal text-[#FFD700]">Turbo</h2>
            <span className="text-2xl font-bold text-red-600 pt-5">1.0v</span>
          </div>
          <h2 className="text-6xl font-bold text-[#E0E0E0] pl-[7.5rem]">
            Quiz
          </h2>
        </div>

        <div className="relative z-10 pt-10 flex justify-center items-center">
          <Image
            src="/quizzy-happy.png"
            alt="Quizzy"
            width={250}
            height={250}
          />
        </div>

        <div className="relative z-10 pt-4 flex justify-center items-center gap-3">
          <Button image="/icons/exit-icon.png" name="Sair" />
          <Button image="/icons/play-icon.png" action="start" name="Jogar" />
          <Button image="/icons/config-icon.png" name="Configurações" />
        </div>
      </section>
    </div>
  );
};

export default Home;
