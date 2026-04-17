import { useEffect, useState } from 'react'
import axios from 'axios'
import { fetchQuizQuestions } from "../services/quizApi.js";

const QuizCard = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

useEffect(() => {
    const loadQuestions = async () => {
        const data = await fetchQuizQuestions(10);

        const formatted = data.map((q) => ({
            question: decodeHTML(q.question),
            answer: decodeHTML(q.correct_answer),
            options: shuffle([
                ...q.incorrect_answers.map(decodeHTML),
                decodeHTML(q.correct_answer),
            ]),
        }));

        setQuestions(formatted);
    };

    loadQuestions();
}, []);

    // helper: decode HTML entities
    const decodeHTML = (html) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    // helper: shuffle options
    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    // loading state
    if (questions.length === 0) {
        return (
            <div className="text-center mt-10 text-xl font-semibold">
                Loading Quiz...
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (option) => {
        setSelectedOption(option);
        if (option === currentQuestion.answer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        setSelectedOption("");

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        setCurrentIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption("");
    };

    if (showResult) {
        return (
            <div className="p-4 w-full flex justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
                    <div className="text-6xl mb-2">🎉</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Quiz Finished!
                    </h1>

                    <div className="bg-indigo-50 rounded-xl p-6 mb-8">
                        <p className="text-5xl font-bold text-indigo-600">
                            {score}
                            <span className="text-2xl text-gray-400">
                                /{questions.length}
                            </span>
                        </p>
                    </div>

                    <button
                        onClick={restartQuiz}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl"
                    >
                        Restart Quiz
                    </button>
                </div>
            </div>
        );
    }

    const progress = (currentIndex / questions.length) * 100;

    return (
        <div className="p-4 w-full flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-500">
                        Question {currentIndex + 1} of {questions.length}
                    </span>
                    <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        Score: {score}
                    </span>
                </div>

                {/* Progress */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                    <div
                        className="bg-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Question */}
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = option === currentQuestion.answer;

                        let optionStyle =
                            "border-2 border-gray-100 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700";

                        if (selectedOption) {
                            if (isSelected && isCorrect) {
                                optionStyle =
                                    "border-2 border-green-400 bg-green-50 text-green-700";
                            } else if (isSelected && !isCorrect) {
                                optionStyle =
                                    "border-2 border-red-400 bg-red-50 text-red-700";
                            } else if (!isSelected && isCorrect) {
                                optionStyle =
                                    "border-2 border-green-400 bg-green-50 text-green-700";
                            } else {
                                optionStyle =
                                    "border-2 border-gray-100 bg-gray-50 text-gray-400";
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() =>
                                    !selectedOption && handleAnswer(option)
                                }
                                className={`w-full text-left px-4 py-3 rounded-xl font-medium ${optionStyle}`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 text-white font-semibold py-3 rounded-xl"
                >
                    {currentIndex + 1 === questions.length
                        ? "Finish Quiz"
                        : "Next Question"}
                </button>
            </div>
        </div>
    );
};

export default QuizCard;