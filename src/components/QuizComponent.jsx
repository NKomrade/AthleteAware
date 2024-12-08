import React, { useState, useEffect } from 'react'
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Clock, Award } from 'lucide-react'

const quizQuestions = [
  {
    question: "What is the main purpose of anti-doping regulations?",
    options: [
      "To improve athletic performance",
      "To ensure fair competition",
      "To increase sports viewership",
      "To reduce sports injuries"
    ],
    correctAnswer: 1
  },
  {
    question: "Which of the following is NOT a prohibited substance?",
    options: [
      "Anabolic steroids",
      "Stimulants",
      "Vitamin C",
      "Erythropoietin (EPO)"
    ],
    correctAnswer: 2
  },
  {
    question: "How often can an athlete be tested for doping?",
    options: [
      "Only during competitions",
      "Once a year",
      "At any time, including out of competition",
      "Only before major events"
    ],
    correctAnswer: 2
  },
  {
    question: "What is a Therapeutic Use Exemption (TUE)?",
    options: [
      "A permission to use prohibited substances for medical reasons",
      "A type of performance-enhancing drug",
      "A method to avoid doping tests",
      "A training technique for athletes"
    ],
    correctAnswer: 0
  },
  {
    question: "Which organization maintains the list of prohibited substances?",
    options: [
      "International Olympic Committee (IOC)",
      "World Anti-Doping Agency (WADA)",
      "United Nations (UN)",
      "World Health Organization (WHO)"
    ],
    correctAnswer: 1
  }
]

export default function QuizComponent({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion()
    }
  }, [timeLeft, showResult])

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setSelectedAnswer(null)
    setTimeLeft(30)

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
      if (onComplete) {
        onComplete()
      }
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setTimeLeft(30)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      {!showResult ? (
        <>
          <div className="mb-6 flex justify-between items-center">
            <span className="text-2xl font-bold">
              Question {currentQuestion + 1}/{quizQuestions.length}
            </span>
            <div className="flex items-center text-lg font-semibold">
              <Clock className="mr-2" size={24} />
              {timeLeft}s
            </div>
          </div>
          <div className="mb-6 w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-black h-3 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            ></div>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">{quizQuestions[currentQuestion].question}</h2>
          <div className="space-y-4 mb-6">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'bg-black text-white transform scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center text-lg font-semibold"
          >
            {currentQuestion + 1 === quizQuestions.length ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight className="ml-2" size={20} />
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Quiz Completed!</h2>
          <div className="text-6xl font-bold mb-6">{score}/{quizQuestions.length}</div>
          {score === quizQuestions.length ? (
            <div className="flex flex-col items-center justify-center text-green-500 mb-6">
              <Award className="mb-2" size={48} />
              <span className="text-2xl font-semibold">Perfect Score!</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-yellow-500 mb-6">
              <CheckCircle className="mb-2" size={48} />
              <span className="text-2xl font-semibold">Good effort!</span>
              <span>Review the questions you missed.</span>
            </div>
          )}
          <button
            onClick={resetQuiz}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center mx-auto text-lg font-semibold"
          >
            <RotateCcw className="mr-2" size={20} />
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  )
}