import React, { useState } from 'react';
import './App.css';
//Import Components
import { QuestionCard } from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState } from './api';

const TOTAL_QUESTIONS = 10;
type AnswerObjet = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


export default function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObjet[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const nextQuestion = async () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    else {
      setNumber(nextQuestion);
    }
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1)
      const AnswerObjet = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, AnswerObjet])
    }
  };


  return (


      <div className='App'>
        <h1>Quiz React App by Zain Ramzan</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startQuiz}>START QUIZ</button>
        ) : null}
        {!gameOver ? (
          <p className='score'>Score: {score}</p>
        ) : null}
        {loading ? (
          <h2>Loding...Please waite!</h2>
        ) : null}
        {!loading && !gameOver ? (
          <QuestionCard
            questionNum={number + 1}
            totalQuesitons={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        ) : null}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>NEXT</button>
        ) : null}

      </div>

  )
}
