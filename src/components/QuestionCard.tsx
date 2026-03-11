import React from 'react';
import type { Question } from '../data/questions';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerClick: (index: number) => void;
  isAnswerSubmitted: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerClick,
  isAnswerSubmitted,
}) => {
  return (
    <div className="glass-card question-card slide-up">
      <h2 className="question-title">
        <span className="question-number">Question {question.id}</span>
        {question.text}
      </h2>

      <div className="options-container">
        {question.options.map((option, index) => {
          let optionClass = "option-btn";
          let Icon = null;

          if (isAnswerSubmitted) {
            if (index === question.correctAnswerIndex) {
              optionClass += " correct";
              Icon = <CheckCircle2 className="icon" />;
            } else if (index === selectedAnswer && selectedAnswer !== question.correctAnswerIndex) {
              optionClass += " incorrect";
              Icon = <XCircle className="icon" />;
            } else {
              optionClass += " disabled";
            }
          } else if (selectedAnswer === index) {
            optionClass += " selected";
          }

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => !isAnswerSubmitted && onAnswerClick(index)}
              disabled={isAnswerSubmitted}
            >
              <div className="option-content">
                <div className="option-letter">{String.fromCharCode(65 + index)}</div>
                <span className="option-text">{option}</span>
              </div>
              {Icon && <div className="option-icon">{Icon}</div>}
            </button>
          );
        })}
      </div>

      {isAnswerSubmitted && (
        <div className="explanation-box fade-in">
          <p className="explanation-title">Explication</p>
          <p className="explanation-text">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
