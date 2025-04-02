interface VacancyProps {
  company: string;
  id: number;
  name: string;
  position: PositionProps;
  vacancy_id: string;
}

interface PositionProps {
  id: number;
  name: string;
}

interface QuestionProps {
  id: number;
  text: string;
  choices: QuestionChoiceProps[];
}

interface QuestionChoiceProps {
  id: number;
  text: string;
  next_question: number | null;
}
