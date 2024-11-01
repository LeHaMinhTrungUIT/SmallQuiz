import { QuestionResponse } from "../models/Question.model";

const getQuestionList = (
  category: number,
  difficulty: string
): Promise<QuestionResponse> => {
  return fetch(
    `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
  )
    .then((response) => response.json())
    .then((list) => list)
    .catch((err) => {
      console.error("Error fetching question list:", err);
      return null;
    });
};

export { getQuestionList };
