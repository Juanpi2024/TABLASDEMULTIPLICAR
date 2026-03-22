import React, { useState } from 'react';

const MultiplicationTables = ({ onBack, onAddPoints, onError, streak, recordAnswer }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'
  const [questions, setQuestions] = useState([]);

  const handleSelectTable = (table) => {
    setSelectedTable(table);
    const q = Array.from({ length: 10 }, (_, i) => {
      const answer = table * (i + 1);
      let options = [answer];
      while(options.length < 4) {
        let offset = Math.floor(Math.random() * 5) + 1;
        let wrongAns = Math.random() > 0.5 ? answer + offset : answer - offset;
        if (wrongAns > 0 && !options.includes(wrongAns)) {
          options.push(wrongAns);
        }
      }
      
      // Fisher-Yates shuffle algorithm
      for (let k = options.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [options[k], options[j]] = [options[j], options[k]];
      }

      return {
        num1: table,
        num2: i + 1,
        answer: answer,
        options: options
      };
    });
    setQuestions(q);
    setCurrentQuestion(0);
    setScore(0);
    setFeedback(null);
  };

  const handleAnswer = (ans) => {
    const isCorrect = ans === questions[currentQuestion].answer;
    if (recordAnswer) recordAnswer(`x${selectedTable}`, isCorrect);
    
    if (isCorrect) {
      setFeedback('correct');
      const multiplier = streak >= 3 ? Math.min(Math.floor(streak / 3) + 1, 5) : 1;
      setScore(s => s + (1 * multiplier));
      if (onAddPoints) onAddPoints(5); // Global points (5 points for normal tables)
    } else {
      setFeedback('incorrect');
      if (onError) onError();
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestion < 9) {
        setCurrentQuestion(c => c + 1);
      } else {
        // Finished
        setCurrentQuestion(c => c + 1);
      }
    }, 800);
  };

  const renderTableSelection = () => (
    <div className="card">
      <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Elige una Tabla</h2>
      <div className="flex-row" style={{ maxWidth: '400px', margin: '0 auto' }}>
        {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
          <button 
            key={num} 
            className="accent" 
            style={{ width: '60px', height: '60px', padding: '0', fontSize: '1.2rem', borderRadius: '15px' }}
            onClick={() => handleSelectTable(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <button className="secondary mt-4" onClick={onBack}>Volver al Menú</button>
    </div>
  );

  const renderQuiz = () => {
    if (currentQuestion >= 10) {
      return (
        <div className="card" style={{ animation: 'floatIn 0.5s ease-out' }}>
          <h2>¡Tabla del {selectedTable} Completada! 🎉</h2>
          <p style={{ fontSize: '2rem', margin: '20px 0', color: 'var(--primary)' }}>
            Puntaje: {score} / 10
          </p>
          <button className="primary" onClick={() => setSelectedTable(null)}>Elegir otra tabla</button>
          <br/>
          <button className="secondary mt-4" onClick={onBack}>Volver al Menú</button>
        </div>
      );
    }

    if (questions.length === 0) return null;

    const currentQ = questions[currentQuestion];

    return (
      <div className="card">
        <h3>Tabla del {selectedTable}</h3>
        <p style={{ marginTop: '10px' }}>Pregunta {currentQuestion + 1} de 10</p>
        
        <div style={{ fontSize: '4rem', fontWeight: 'bold', margin: '30px 0', transition: 'all 0.3s' }}
             className={feedback === 'correct' ? 'correct-text' : feedback === 'incorrect' ? 'incorrect-text' : ''}>
          {currentQ.num1} x {currentQ.num2} = ?
        </div>

        <div className="flex-row" style={{ position: 'relative' }}>
          {streak >= 3 && feedback === 'correct' && (
            <div className="combo-text animation-pop" style={{ position: 'absolute', top: '-40px', right: '0', color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.2rem' }}>
              ¡Combo x{Math.min(Math.floor(streak / 3) + 1, 5)}!
            </div>
          )}
          {currentQ.options.map((opt, i) => (
            <button 
              key={i} 
              className="primary"
              style={{ width: '80px', fontSize: '1.5rem', margin: '5px' }}
              onClick={() => handleAnswer(opt)}
              disabled={feedback !== null}
            >
              {opt}
            </button>
          ))}
        </div>
        
        {feedback && (
          <div style={{ marginTop: '20px', fontSize: '1.5rem', fontWeight: 'bold', animation: 'pop 0.3s' }}>
            {feedback === 'correct' ? '¡Excelente! ✨' : '¡Casi! Sigue intentando 💪'}
          </div>
        )}

      </div>
    );
  };

  return selectedTable ? renderQuiz() : renderTableSelection();
};

export default MultiplicationTables;
