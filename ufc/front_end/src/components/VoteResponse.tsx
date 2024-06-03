import React, { useState } from 'react';

interface Vote {
  title: string;
  questions: { questionText: string; options: string[] }[];
  mode: string;
}

interface VoteResponseProps {
  vote: Vote;
  onSubmit: (responses: string[]) => void;
}

const VoteResponse: React.FC<VoteResponseProps> = ({ vote, onSubmit }) => {
  const [responses, setResponses] = useState<string[]>(Array(vote.questions.length).fill(''));

  const handleResponseChange = (qIndex: number, value: string) => {
    const newResponses = [...responses];
    newResponses[qIndex] = value;
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    onSubmit(responses);
  };

  return (
    <div>
      <h2>{vote.title}</h2>
      {vote.questions.map((question, qIndex) => (
        <div key={qIndex}>
          <p>{question.questionText}</p>
          {question.options.map((option, oIndex) => (
            <label key={oIndex}>
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={option}
                onChange={(e) => handleResponseChange(qIndex, e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Soumettre les réponses</button>
    </div>
  );
};

export default VoteResponse;
