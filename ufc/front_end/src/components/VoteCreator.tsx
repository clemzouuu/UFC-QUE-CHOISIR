import React, { useState } from 'react';

interface Question {
  questionText: string;
  options: string[];
}

interface VoteCreatorProps {
  onAddVote: (vote: { title: string; questions: Question[]; mode: string }) => void;
}

const VoteCreator: React.FC<VoteCreatorProps> = ({ onAddVote }) => {
  const [voteTitle, setVoteTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([{ questionText: '', options: [''] }]);
  const [mode, setMode] = useState('one-round');
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoteTitle(e.target.value);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: [''] }]);
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    if (!voteTitle.trim()) {
      setError('Le titre du vote ne peut pas être vide.');
      return;
    }
    for (const question of questions) {
      if (!question.questionText.trim()) {
        setError('Toutes les questions doivent avoir un texte.');
        return;
      }
      for (const option of question.options) {
        if (!option.trim()) {
          setError('Toutes les options doivent avoir un texte.');
          return;
        }
      }
    }
    setError(null);
    onAddVote({ title: voteTitle, questions, mode });
  };

  return (
    <div>
      <h2>Créer un vote</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" value={voteTitle} onChange={handleTitleChange} placeholder="Titre du vote" />
      {questions.map((question, qIndex) => (
        <div key={qIndex}>
          <input
            type="text"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            placeholder={`Question ${qIndex + 1}`}
          />
          {question.options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
              placeholder={`Option ${oIndex + 1}`}
            />
          ))}
          <button onClick={() => addOption(qIndex)}>Ajouter une option</button>
        </div>
      ))}
      <button onClick={addQuestion}>Ajouter une question</button>

      <div>
        <h3>Modalité de Vote</h3>
        <label>
          <input
            type="radio"
            value="one-round"
            checked={mode === 'one-round'}
            onChange={() => setMode('one-round')}
          />
          Vote à un tour
        </label>
        <label>
          <input
            type="radio"
            value="two-rounds"
            checked={mode === 'two-rounds'}
            onChange={() => setMode('two-rounds')}
          />
          Vote à deux tours
        </label>
        <label>
          <input
            type="radio"
            value="absolute-majority"
            checked={mode === 'absolute-majority'}
            onChange={() => setMode('absolute-majority')}
          />
          Majorité absolue
        </label>
        <label>
          <input
            type="radio"
            value="relative-majority"
            checked={mode === 'relative-majority'}
            onChange={() => setMode('relative-majority')}
          />
          Majorité relative
        </label>
      </div>

      <button onClick={handleSubmit}>Soumettre le vote</button>
    </div>
  );
};

export default VoteCreator;
