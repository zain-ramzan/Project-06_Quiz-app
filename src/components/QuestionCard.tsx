import React from 'react';
import './QuestionCard.css'
type Props = {
   question: string;
   answers: string[];
   callback: any;
   userAnswer: any;
   questionNum: number;
   totalQuesitons: number;
}

export const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNum, totalQuesitons }) => {
   return (
      <div>
         <h3>
            Question: {questionNum} / {totalQuesitons}
         </h3>
         <p className='question' dangerouslySetInnerHTML={{ __html: question }} />
         <div>
            {answers.map(answer => (
               <div>
                  <button className='answers' disabled={userAnswer} value={answer} onClick={callback}>
                     <span dangerouslySetInnerHTML={{ __html: answer }} />
                  </button>
               </div>
            ))}
         </div>

      </div>
   )
}
