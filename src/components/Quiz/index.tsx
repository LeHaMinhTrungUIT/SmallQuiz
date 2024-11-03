import { Button } from "antd";
import { Question } from "../../models/Question.model";
import "./index.css";

interface QuizProps {
  questionData: Question;
  order: number;
  disabled: boolean;
  setQuestionDataList?: React.Dispatch<React.SetStateAction<Question[]>>;
}
const Quiz = ({
  questionData,
  order,
  disabled,
  setQuestionDataList,
}: QuizProps) => {
  const onSelectAnswer = (answer: string) => {
    setQuestionDataList &&
      setQuestionDataList((prev: Question[]) =>
        prev.map((item, index) =>
          index === order ? { ...item, selectedAnswer: answer } : item
        )
      );
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
