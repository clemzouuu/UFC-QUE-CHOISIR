import React from 'react';

interface SurveyQuestion {
  questionText: string;
  options?: string[];
  type: 'radio' | 'text';
}

interface Survey {
  title: string;
  questions: SurveyQuestion[];
}

interface SurveyResultsProps {
  survey: Survey;
  responses: string[][];
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ survey, responses }) => {
  const countResponses = (qIndex: number, option: string) => {
    return responses.reduce((count, response) => (response[qIndex] === option ? count + 1 : count), 0);
  };

  return (
    <div>
      <h2>Résultats du Sondage: {survey.title}</h2>
      {survey.questions.map((question, qIndex) => (
        <div key={qIndex}>
          <p>{question.questionText}</p>
          {question.type === 'radio' ? (
            <ul>
              {question.options!.map((option, oIndex) => (
                <li key={oIndex}>
                  {option}: {countResponses(qIndex, option)}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {responses.map((response, rIndex) => (
                <li key={rIndex}>{response[qIndex]}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SurveyResults;
