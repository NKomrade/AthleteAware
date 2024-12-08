import React, { useState, useEffect } from 'react';

// Fetch questions from the API
const fetchQuestions = async () => {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple');
    const data = await res.json();
    return data.results || []; // Return empty array if results is undefined
  } catch (error) {
    console.error("Error fetching questions:", error);
    return []; // Return empty array in case of error
  }
};

export default function AthleteQuiz() {
  const [questions, setQuestions] = useState([]); // Initialize questions as an empty array
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isQuizActive, setIsQuizActive] = useState(false); // Set to false initially
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state to show loading UI
  const [quizStarted, setQuizStarted] = useState(false); // Track whether quiz is started
  const [showRules, setShowRules] = useState(false); // Track whether to show rules page
  const [shrinked, setShrinked] = useState(false); // Control the upward transition of the video
  const [randomizedOptions, setRandomizedOptions] = useState([]); // Store randomized options for each question
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // To show the correct answer after selection

  // Fetch questions and handle loading state
  useEffect(() => {
    const getQuestions = async () => {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
      setLoading(false); // Set loading to false when data is fetched
    };

    getQuestions();
  }, []); // This will fetch questions only once when the component is mounted

  // Timer countdown
  useEffect(() => {
    if (isQuizActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer, isQuizActive]);

  // Randomize options for the current question
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      setRandomizedOptions(allOptions.sort(() => Math.random() - 0.5)); // Randomize options only once
    }
  }, [currentQuestionIndex, questions]);

  // Handle moving to next question
  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setShowCorrectAnswer(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30); // Reset timer for next question
    } else {
      setIsQuizActive(false); // End quiz when questions are finished
    }
  };

  // Handle selecting an option
  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
    setShowCorrectAnswer(true); // Show the correct answer after selection
    if (option === questions[currentQuestionIndex]?.correct_answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      handleNextQuestion(); // Automatically go to the next question after selection
    }, 1000);
  };

  // Restart the quiz
  const handleRestartQuiz = async () => {
    setLoading(true); 
    setScore(0); 
    setCurrentQuestionIndex(0); 
    setTimer(30); 
    setIsQuizActive(true); 
    setQuizStarted(true); 
    setShowRules(false); 
  
    // Fetch questions and update the state
    const fetchedQuestions = await fetchQuestions();
    setQuestions(fetchedQuestions); // Update questions state with newly fetched questions
    setLoading(false); // Set loading to false once questions are fetched
  };  

  // Show the quiz rules page
  const handleStartQuiz = () => {
    setShowRules(true);
  };

  // Hide the rules page and start the quiz
  const handleContinueQuiz = () => {
    setShowRules(false);
    setQuizStarted(true);
    setIsQuizActive(true);
  };

  // Back to Start Quiz
  const handleBackToStart = () => {
    setQuizStarted(false); 
    setCurrentQuestionIndex(0); 
    setScore(0); 
    setTimer(30); 
    setIsQuizActive(false); 
    setShrinked(false); 
    setShowRules(false); 
  };

  // Loading state and error handling
  if (loading) {
    return <div className="text-white text-xl">Loading questions...</div>;
  }

  // Check if questions data is available
  if (!questions || questions.length === 0) {
    return <div className="text-black text-xl">Failed to load questions. Please try again later.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-black flex justify-center items-center py-8 relative">
      {/* Display video when quiz is not started */}
      {!quizStarted && !showRules && (
        <div className={`absolute inset-0 flex flex-col justify-center items-center text-white z-10 transition-all duration-700 ${shrinked ? 'transform translate-y-[-100vh]' : ''}`}>
          <video
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/Quiz.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-10"></div>
          <div className="z-20 text-center">
            <h2 className="text-4xl font-bold mb-4">Upgrade your knowledge with us</h2>
            <button
              onClick={handleStartQuiz}
              className="bg-white text-black font-bold py-2 px-6 rounded-lg hover:text-white hover:bg-black"
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}

      {/* Display Rules page */}
      {showRules && (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <div className="absolute inset-0 z-10"></div>
          <div className="z-20 text-center p-8 bg-gray-800/70 rounded-lg">
            <h2 className="text-4xl font-bold mb-4 text-indigo-500">Quiz Rules</h2>
            <p className="text-lg mb-6 text-left">- You will have total 10 questions.</p>
            <p className="text-lg mb-6 text-left">- You have 30 seconds for each question.</p>
            <p className="text-lg mb-6 text-left">- You can't skip any question.</p>
            <p className="text-lg mb-6 text-left">- Click on Continue to start.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleBackToStart}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Back to Start
              </button>
              <button
                onClick={handleContinueQuiz}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display quiz when quiz is started */}
      {quizStarted && (
        <div className="w-full max-w-xl bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          {!isQuizActive ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-lg mb-6 text-green-400">Your final score is {score}/{questions.length}.</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleRestartQuiz}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                >
                  Try Again
                </button>
                <button
                  onClick={handleBackToStart}
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                >
                  Back to Start
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-sans font-bold text-green-500">Time: {timer}s</p>
                <p className="text-lg font-sans font-bold">Score: {score}</p>
              </div>
              <div className="mb-6">
                <p className="text-2xl font-semibold">{currentQuestion.question}</p>
              </div>
              <div className="space-y-4">
                {randomizedOptions.map((option, index) => {
                  const isCorrectAnswer = option === currentQuestion.correct_answer;
                  const isSelectedAnswer = selectedAnswer === option;

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full py-3 px-4 rounded-lg text-lg border transition duration-300 ${
                        isSelectedAnswer
                          ? isCorrectAnswer
                            ? 'bg-green-600 text-white border-green-600' // Correct answer selected
                            : 'bg-red-600 text-white border-red-600' // Wrong answer selected
                          : isCorrectAnswer && showCorrectAnswer // Highlight correct answer if not selected
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-gray-700 text-white hover:bg-blue-500'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {showCorrectAnswer && (
                <div className="mt-4 text-center text-lg">
                  {selectedAnswer === currentQuestion.correct_answer
                    ? 'Correct! Well done.'
                    : 'Incorrect!'}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}