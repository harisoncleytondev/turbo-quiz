import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';
import { v4 as uuidv4 } from 'uuid';
import redis from '@/lib/redis';

export const POST = async (req) => {
  const { difficulty, topic } = await req.json();

  try {
    const content = await ask(difficulty, topic);

    if (!content) throw new Error('Erro ao buscar questões');
    const session = uuidv4();
    const sessionData = {
      topic: '',
      points: 0,
      turn: 1,
      content,
    };

    const question = {
      question: content.questions[0].question,
      alternatives: content.questions[0].alternatives.map((alt) => alt.answer),
    };

    await redis.set(session, JSON.stringify(sessionData), 'EX', 600);
    return NextResponse.json(
      { session: session, question: question, turn: sessionData.turn },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

const ask = async (difficulty, topic) => {
  const groq = new Groq({ apiKey: process.env.GROQ_KEY });
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Crie 6 perguntas sobre "${topic}" com dificuldade "${difficulty}". Cada pergunta deve ter 4 alternativas no formato {"answer":"...","isCorrect":true|false}, com apenas uma correta por pergunta. Coloque a correta em posição aleatória. Retorne apenas JSON válido assim: {"questions":[...]} sem nenhum texto adicional.`,
      },
    ],
    model: 'openai/gpt-oss-20b',
    temperature: 0.5,
    max_completion_tokens: 8192,
    top_p: 1,
    stream: false,
    reasoning_effort: 'medium',
    stop: null,
  });

  const json = JSON.parse(chatCompletion.choices[0].message.content);
  return json;
};
