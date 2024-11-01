import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import Quiz from "../../components/Quiz";
import { Question } from "../../models/Question.model";
import "./index.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questionDataList } = location.state || {};
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  const getBackgroundOfScore = () => {
    return correctAnswer < 2 ? "red" : correctAnswer < 4 ? "yellow" : "green";
  };

  useEffect(() => {
    let count = 0;
    for (let order = 0; order < questionDataList.length; order++) {
      if (
        questionDataList[order].correct_answer ===
        questionDataList[order].selectedAnswer
      )
        count++;
    }
    setCorrectAnswer(count);
  }, []);

  return (
    <div className="result">
      <div className="title">Results</div>
      <>
        {questionDataList.map((q: Question, index: number) => (
          <Quiz
            questionDataList={questionDataList}
            order={index}
            disabled={true}
            key={index}
          />
        ))}
      </>
      <div className={`score ${getBackgroundOfScore()}`}>
        You scored {correctAnswer} out of {questionDataList.length}
      </div>
      <Button onClick={() => navigate("/")}>Create a new quiz</Button>
    </div>
  );
};

export default Result;
