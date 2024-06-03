import React, { useState } from 'react';
import SurveyCreator from './components/SurveyCreator';
import SurveyResponse from './components/SurveyResponse';
import SurveyResults from './components/SurveyResults';
import VoteCreator from './components/VoteCreator';
import VoteResponse from './components/VoteResponse';
import VoteResults from './components/VoteResults';
import './App.css';

interface SurveyQuestion {
  questionText: string;
  options?: string[];
  type: 'radio' | 'text';
}

interface Survey {
  title: string;
  questions: SurveyQuestion[];
}

interface VoteQuestion {
  questionText: string;
  options: string[];
}

interface Vote {
  title: string;
  questions: VoteQuestion[];
  mode: string;
}

const App: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [surveyResponses, setSurveyResponses] = useState<string[][][]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [voteResponses, setVoteResponses] = useState<string[][][]>([]);
  const [currentView, setCurrentView] = useState<'surveys' | 'votes' | null>(null);
  const [showSurveyResults, setShowSurveyResults] = useState<boolean[]>([]);

  const addSurvey = (survey: Survey) => {
    setSurveys([...surveys, survey]);
    setShowSurveyResults([...showSurveyResults, false]);
  };

  const handleSurveyResponseSubmit = (surveyIndex: number, response: string[]) => {
    const newResponses = [...surveyResponses];
    if (!newResponses[surveyIndex]) {
      newResponses[surveyIndex] = [];
    }
    newResponses[surveyIndex].push(response);
    setSurveyResponses(newResponses);
  };

  const addVote = (vote: Vote) => {
    setVotes([...votes, vote]);
  };

  const handleVoteResponseSubmit = (voteIndex: number, response: string[]) => {
    const newResponses = [...voteResponses];
    if (!newResponses[voteIndex]) {
      newResponses[voteIndex] = [];
    }
    newResponses[voteIndex].push(response);
    setVoteResponses(newResponses);
  };

  const toggleSurveys = () => {
    setCurrentView('surveys');
  };

  const toggleVotes = () => {
    setCurrentView('votes');
  };

  const toggleSurveyResults = (index: number) => {
    const newShowSurveyResults = [...showSurveyResults];
    newShowSurveyResults[index] = !newShowSurveyResults[index];
    setShowSurveyResults(newShowSurveyResults);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <button onClick={toggleSurveys}>Sondages</button>
        <button onClick={toggleVotes}>Votes</button>
      </div>
      <div className="main-content">
        {currentView === 'surveys' && (
          <>
            <SurveyCreator onAddSurvey={addSurvey} />
            {surveys.map((survey, index) => (
              <div key={index}>
                <h3>{survey.title}</h3>
                <button onClick={() => toggleSurveyResults(index)}>
                  {showSurveyResults[index] ? "Masquer les résultats" : "Afficher les résultats"}
                </button>
                {showSurveyResults[index] && (
                  <SurveyResults survey={survey} responses={surveyResponses[index] || []} />
                )}
                <SurveyResponse
                  survey={survey}
                  onSubmit={(response) => handleSurveyResponseSubmit(index, response)}
                />
              </div>
            ))}
          </>
        )}

        {currentView === 'votes' && (
          <>
            <VoteCreator onAddVote={addVote} />
            {votes.map((vote, index) => (
              <div key={index}>
                <h3>{vote.title}</h3>
                <VoteResults vote={vote} responses={voteResponses[index] || []} />
                <VoteResponse
                  vote={vote}
                  onSubmit={(response) => handleVoteResponseSubmit(index, response)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
