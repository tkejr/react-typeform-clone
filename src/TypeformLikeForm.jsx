import React, { useState, useEffect, useRef } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./css/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

function TypeformLikeForm({ questions, onSubmit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [formData, setFormData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    setProgress(((currentQuestion + 1) / questions.length) * 100);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentQuestion((prevQuestion) => prevQuestion - 1);
        setAnimating(false);
      }, 300);
    }
  };
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setAnimating(false);
      }, 300);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleNextQuestion();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentQuestion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(formData); // Using the passed callback function
      setFormSubmitted(true);
      setFormData({}); // Clear form data
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  };

  const handlePageClick = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        <div className="h-1 bg-gray-300">
          <div
            className="h-1 bg-blue-500 transition-all duration-500 ease-in-out"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
      {currentQuestion > 0 && (
        <button
          type="button"
          onClick={handlePreviousQuestion}
          className="absolute top-2 right-2 px-3 py-1 border-2 border-black  text-black focus:outline-none focus:ring focus:ring-gray-200 rounded-md mt-4 mr-4"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}

      <div
        className={`min-h-[90vh] bg-lighter-creamish text-black flex flex-col justify-center items-start py-12 px-4 sm:px-6 lg:px-8 w-full max-w-2xl mx-auto pl-1/4 ${
          animating ? "animate-slide-up" : ""
        }`}
        onClick={handlePageClick}
      >
        <div className="flex flex-col justify-center flex-1 w-full">
          <h2 className="text-3xl mb-2">
            <span className="text-blue-500 text-2xl">
              {currentQuestion + 1}
            </span>{" "}
            <FontAwesomeIcon icon={faArrowRight} /> {questions[currentQuestion]}
          </h2>

          <form onSubmit={handleSubmit} className="w-full mb-8 ml-10">
            <div className="mb-4 relative w-full">
              <input
                type="text"
                id={`q${currentQuestion + 1}`}
                className="text-2xl w-full px-3 py-2 border-b-2 border-gray-200 focus:outline-none bg-transparent text-black "
                placeholder="Type your answer..."
                value={formData[`q${currentQuestion + 1}`] || ""}
                onChange={handleInputChange}
                required
                ref={inputRef}
              />

              {!formData[`q${currentQuestion + 1}`] && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <span className="text-gray-600 text-2xl animate-blink">|</span> */}
                </div>
              )}
            </div>

            <div className="flex mt-4">
              {currentQuestion < questions.length - 1 && (
                <>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="text-xl px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-200 flex items-center"
                  >
                    OK <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <span className="ml-2 mt-3">
                    {" "}
                    Press <b>Enter</b> <FontAwesomeIcon icon={faArrowLeft} />{" "}
                  </span>
                </>
              )}

              {currentQuestion === questions.length - 1 && (
                <>
                  <div className="flex items-center">
                    <button
                      type="submit"
                      className="text-xl px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    >
                      Submit
                    </button>
                    {formSubmitted && (
                      <div className="ml-4 text-black bg-cream-lighter border border-gray-300 rounded-md p-2">
                        Thanks for your valuable feedback
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <footer className="w-full bg-evenlighter-creamish py-4 px-6 mt-auto flex justify-between items-center">
        <div>
          {currentQuestion + 1} of {questions.length} questions answered
        </div>
        <div className="w-1/4">
          <div className="h-2 bg-gray-300 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default TypeformLikeForm;
