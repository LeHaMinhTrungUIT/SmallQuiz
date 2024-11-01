import { Button } from "antd";
import { Question } from "../../models/Question.model";
import "./index.css";
import { useMemo } from "react";

interface QuizProps {
  questionDataList: Question[];
  order: number;
  disabled: boolean;
  setQuestionDataList?: React.Dispatch<React.SetStateAction<Question[]>>;
}
const Quiz = ({
  questionDataList,
  order,
  disabled,
  setQuestionDataList,
}: QuizProps) => {
  const questionData = useMemo(
    () => questionDataList[order],
    [questionDataList]
  );

  const onSelectAnswer = (answer: string) => {
    const clonedQuestionDataList = questionDataList.map((item, index) =>
      index === order ? { ...item, selectedAnswer: answer } : item
    );
    setQuestionDataList && setQuestionDataList(clonedQuestionDataList);
  };

  const isHighlighted = (answer: string) => {
    return disabled
      ? questionData.correct_answer === answer
      : questionData.selectedAnswer === answer;
  };

  const isWarning = (answer: string) =>
    disabled &&
    answer === questionData.selectedAnswer &&
    answer !== questionData.correct_answer;

  return (
    <div className="quiz">
      <div className="question">{questionData.question}</div>
      <div className="choices">
        {questionData.swappedAnswer?.map((ans: string, index: number) => (
          <Button
            key={index}
            onClick={() => onSelectAnswer(ans)}
            className={`choice ${isHighlighted(ans) && "highlighted"} ${
              isWarning(ans) && "warning"
            }`}
            disabled={disabled}
          >
            {ans}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
