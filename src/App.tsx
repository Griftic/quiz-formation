import { useState } from 'react';
import { questions } from './data/questions';
import { QuestionCard } from './components/QuestionCard';
import { BookOpen, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import './index.css';

function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const startGame = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  };

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setGameState('result');
    }
  };

  const getMedalColor = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) return 'gold';
    if (percentage >= 50) return 'silver';
    return 'bronze';
  };

  return (
    <div className="app-container">
      <header>
        <h1 className="logo-text">Intersport Expertise</h1>
        <p className="subtitle">L'ascension du Vendeur Technique - Quiz de validation</p>
      </header>

      {gameState === 'start' && (
        <div className="glass-card start-screen slide-up">
          <BookOpen className="hero-icon" />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>Prêt à tester vos connaissances ?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Ce quiz de {totalQuestions} questions est basé sur la stratégie "New Pathway" et les essentiels de l'expertise matières (naturelles, synthétiques et mélanges).
          </p>
          <button className="btn-primary" onClick={startGame}>
            Démarrer le Quiz <ArrowRight size={20} />
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <div className="stats-bar">
            <span>Question {currentIndex + 1} sur {totalQuestions}</span>
            <span className="score-badge">Score Actuel : {score}</span>
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
            ></div>
          </div>

          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerClick={handleAnswerClick}
            isAnswerSubmitted={isAnswerSubmitted}
          />

          <div className="actions-container">
            {!isAnswerSubmitted ? (
              <button 
                className="btn-primary" 
                onClick={submitAnswer}
                disabled={selectedAnswer === null}
                style={{ opacity: selectedAnswer === null ? 0.5 : 1, cursor: selectedAnswer === null ? 'not-allowed' : 'pointer' }}
              >
                Valider la réponse
              </button>
            ) : (
              <button className="btn-primary fade-in" onClick={nextQuestion}>
                {currentIndex < totalQuestions - 1 ? 'Question suivante' : 'Voir les résultats'} <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {gameState === 'result' && (
        <div className="glass-card result-screen slide-up">
          <Trophy className={`medal-icon ${getMedalColor()}`} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>Quiz Terminé !</h2>
          <div className="score-display">{score} / {totalQuestions}</div>
          <p className="score-text">
            {score >= 8 ? 'Excellent niveau ! Vous avez atteint le niveau Conseil / Élite.' 
            : score >= 5 ? 'Bonne base de connaissances ! Revoyez quelques détails techniques.' 
            : 'Il est conseillé de relire les fiches techniques des matériaux pour maîtriser votre argumentaire.'}
          </p>
          <button className="btn-primary" onClick={startGame}>
            <RotateCcw size={20} /> Recommencer l'évaluation
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
