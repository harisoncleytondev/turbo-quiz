"use client";
import { useMemo } from 'react';

export default function ModalResult({ open, onRestart, onExit, score = 0, total = 5 }) {
  const percent = useMemo(() => {
    const t = Number(total) || 0;
    const s = Number(score) || 0;
    return t > 0 ? Math.round((s / t) * 100) : 0;
  }, [score, total]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-[1001] w-full max-w-md rounded-2xl bg-[#2e1146] text-white shadow-2xl animate-scale-in"
      >
        <div className="px-6 py-5 border-b border-white/10">
          <h3 className="text-2xl font-bold text-yellow-400">Resultados</h3>
          <p className="text-sm text-white/80">Seu desempenho neste quiz</p>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Pontuação</span>
            <span className="text-yellow-300 font-bold">{score} / {total}</span>
          </div>

          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 bg-gradient-to-r from-yellow-300 to-yellow-500 transition-[width] duration-700 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-white/5 p-3">
              <div className="text-sm text-white/70">Acertos</div>
              <div className="text-xl font-bold text-green-400">{score}</div>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <div className="text-sm text-white/70">Erros</div>
              <div className="text-xl font-bold text-red-400">{Math.max((Number(total) || 0) - (Number(score) || 0), 0)}</div>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-white/10 flex gap-3">
          <button
            className="flex-1 py-2.5 rounded-md bg-yellow-400 text-[#2e1146] font-bold hover:bg-yellow-300 active:translate-y-[1px] transition"
            onClick={onRestart}
          >
            Reiniciar
          </button>
          <button
            className="flex-1 py-2.5 rounded-md bg-white/10 text-white font-bold hover:bg-white/20 active:translate-y-[1px] transition"
            onClick={onExit}
          >
            Sair
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in { animation: fade-in 200ms ease-out both; }
        .animate-scale-in { animation: scale-in 220ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scale-in { from { opacity: 0; transform: translateY(6px) scale(0.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}


