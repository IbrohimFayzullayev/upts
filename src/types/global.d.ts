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

interface IUser {
  company_name: string;
  id: number;
  limit: number;
  phone: string | null;
}

interface IModalContext {
  modal: {
    addVacancy: boolean;
  };
  handleModal: ({ key, value }: { key: string; value: boolean }) => void;
}
