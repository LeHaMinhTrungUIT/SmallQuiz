export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  swappedAnswer?: string[];
  selectedAnswer?: string;
}

export interface QuestionResponse {
  response_code: number;
  results: Question[];
}
