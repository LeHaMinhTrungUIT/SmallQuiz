import { useEffect, useState, useMemo } from "react";
import { Select, Button, Form } from "antd";
import type { FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import { getCategoryList } from "../../api/GetCategory";
import { getQuestionList } from "../../api/GetQuestion";
import { CategoriesList } from "../../models/Category.model";
import { Question, QuestionResponse } from "../../models/Question.model";
import { DIFFICULTY_LEVEL } from "../../constants/quiz";
import Quiz from "../../components/Quiz";
import "./index.css";

interface SelectOptions {
  value: string | number;
  label: string;
}

interface FormType {
  difficulty: string;
  category: number;
}

const Home = () => {
  const [optionCategories, setOptionCategories] = useState<SelectOptions[]>([]);
  const optionDifficulties = useMemo(
    () =>
      DIFFICULTY_LEVEL.map((dl) => ({
        value: dl.toLowerCase(),
        label: dl,
      })),
    []
  );
  const [questionDataList, setQuestionDataList] = useState<Question[]>([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const res: CategoriesList = await getCategoryList();
    setOptionCategories(
      res.trivia_categories
        .map((r) => ({ value: r.id, label: r.name }))
        .sort((a, b) => a.label.localeCompare(b.label))
    );
  };

  const swapArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchQuestions = async (category: number, difficulty: string) => {
    const res: QuestionResponse = await getQuestionList(category, difficulty);
    let formattedQuestionDataList = res.results.map((q: Question) => {
      return {
        ...q,
        swappedAnswer: swapArray([...q.incorrect_answers, q.correct_answer]),
        selectedAnswer: undefined,
      };
    });
    setQuestionDataList(formattedQuestionDataList);
  };

  const onCreateQuestions: FormProps<FormType>["onFinish"] = (values) => {
    fetchQuestions(values.category, values.difficulty);
  };

  const onCheckResult = () => {
    navigate("/result", {
      state: {
        questionDataList: questionDataList,
      },
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="home">
      <Form onFinish={onCreateQuestions} className="form-create">
        <Form.Item name="category" rules={[{ required: true }]}>
          <Select
            style={{ width: 300 }}
            options={optionCategories}
            placeholder="Select a category"
            id="categorySelect"
          />
        </Form.Item>

        <Form.Item name="difficulty" rules={[{ required: true }]}>
          <Select
            style={{ width: 300 }}
            options={optionDifficulties}
            placeholder="Select difficulty"
            id="difficultySelect"
          />
        </Form.Item>

        <Button htmlType="submit" id="createBtn">
          Create
        </Button>
      </Form>
      <>
        {questionDataList.map((q: Question, index: number) => (
          <Quiz
            questionDataList={questionDataList}
            setQuestionDataList={setQuestionDataList}
            order={index}
            disabled={false}
            key={index}
          />
        ))}
      </>
      {questionDataList.length > 0 &&
        questionDataList.every((q) => q.selectedAnswer) && (
          <Button className="submit-btn" onClick={() => onCheckResult()}>
            Submit
          </Button>
        )}
    </div>
  );
};

export default Home;
