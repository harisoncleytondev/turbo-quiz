import redis from '@/lib/redis';
import { NextResponse } from 'next/server';

export const POST = async (req, context) => {
  const { params } = context;
  const { uuid } = await params;
  const { answer } = await req.json();
  if (!answer) {
    return NextResponse.json(
      { message: 'Resposta não fornecida' },
      { status: 400 }
    );
  }

  if (!uuid) {
    return NextResponse.json(
      { message: 'UUID não fornecido' },
      { status: 400 }
    );
  }

  try {
    let content = await JSON.parse(await redis.get(uuid));

    const currentQuestion = content.content.questions[content.turn];
    const alternatives = currentQuestion?.alternatives || [];
    const find = alternatives.find((alt) => alt.answer === answer);

    const isCorrect = find?.isCorrect === true;
    if (isCorrect) {
      content.points = (content.points || 0) + 1;
    }

    content.turn = (content.turn || 0) + 1;

    let question = {};
    if (content.turn < content.content.questions.length) {
      question = {
        question: content.content.questions[content.turn].question,
        alternatives: content.content.questions[content.turn].alternatives.map(
          (alt) => alt.answer
        ),
      };
    } else {
      question = {
        finished: true,
        score: content.points
      };
    }

    redis.set(uuid, JSON.stringify(content), 'EX', 600);

    return NextResponse.json({
      questions: question,
      scored: isCorrect ? true : false,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
