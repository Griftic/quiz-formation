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
  
  // Nouveaux états pour l'identité
  const [firstName, setFirstName] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const startGame = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!firstName.trim() || !pseudo.trim()) return;

    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setEmailSent(false);
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

  const sendResultsEmail = async (finalScore: number) => {
    setIsSendingEmail(true);
    try {
      await fetch('https://formspree.io/f/xvzwapja', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prenom: firstName,
          pseudo: pseudo,
          score: `${finalScore} sur ${totalQuestions}`,
          message: `Nouveau résultat au Quiz Vendeur Technique Intersport ! Le joueur ${firstName} (${pseudo}) a terminé avec un score de ${finalScore}/${totalQuestions}.`
        })
      });
      setEmailSent(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des résultats', error);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setGameState('result');
      // On déclenche l'envoi d'email à la fin du quiz avec le score final (score actuel + potentiellement 1 si la dernière réponse était bonne)
      const finalScore = selectedAnswer === currentQuestion.correctAnswerIndex ? score + 1 : score;
      sendResultsEmail(finalScore);
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
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 0 2rem 0', lineHeight: '1.6', display: 'inline-block' }}>
            Ce quiz de {totalQuestions} questions est basé sur la stratégie "New Pathway" et les essentiels de l'expertise matières.
          </p>
          
          <form onSubmit={startGame} className="identity-form fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
            <input 
              type="text" 
              className="glass-input" 
              placeholder="Votre Prénom" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input 
              type="text" 
              className="glass-input" 
              placeholder="Votre Pseudo / Nom" 
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="btn-primary" 
              disabled={!firstName.trim() || !pseudo.trim()}
              style={{ opacity: (!firstName.trim() || !pseudo.trim()) ? 0.5 : 1, width: '100%', justifyContent: 'center', marginTop: '1rem' }}
            >
              Démarrer le Quiz <ArrowRight size={20} />
            </button>
          </form>
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
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#fff' }}>Quiz Terminé, {firstName} !</h2>
          <div className="score-display">{score} / {totalQuestions}</div>
          <p className="score-text">
            {score >= 8 ? 'Excellent niveau ! Vous avez atteint le niveau Conseil / Élite.' 
            : score >= 5 ? 'Bonne base de connaissances ! Revoyez quelques détails techniques.' 
            : 'Il est conseillé de relire les fiches techniques des matériaux pour maîtriser votre argumentaire.'}
          </p>

          <div className="email-status-box" style={{ marginBottom: '2rem', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}>
            {isSendingEmail ? (
              <p style={{ color: 'var(--primary)', margin: 0, fontWeight: 500 }}>Envoi de vos résultats au formateur en cours...</p>
            ) : emailSent ? (
              <p style={{ color: 'var(--success)', margin: 0, fontWeight: 500 }}>✅ Vos résultats ont été transmis avec succès !</p>
            ) : (
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Envoi annulé ou échoué.</p>
            )}
          </div>

          <button className="btn-primary" onClick={() => setGameState('start')}>
            <RotateCcw size={20} /> Terminer et quitter
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
