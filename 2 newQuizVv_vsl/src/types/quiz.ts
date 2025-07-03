export interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const questions: Question[] = [
  {
    id: 1,
    question: "In what year was the Oklahoma City Thunder founded?",
    options: ["2008", "1996", "2012", "1985"],
    correct: 0,
    explanation:
      "The Oklahoma City Thunder was founded in 2008 when the Seattle SuperSonics moved to Oklahoma City.",
  },
  {
    id: 2,
    question: "What is Shai Gilgeous-Alexander's jersey number?",
    options: ["2", "5", "11", "0"],
    correct: 0,
    explanation: "Shai Gilgeous-Alexander wears jersey number 2 for the Oklahoma City Thunder.",
  },
  {
    id: 3,
    question: "In which city does the Thunder play their home games?",
    options: ["Oklahoma City", "Dallas", "New York", "Miami"],
    correct: 0,
    explanation: "The Oklahoma City Thunder plays their home games at the Paycom Center in Oklahoma City, Oklahoma.",
  },
  {
    id: 4,
    question: "What are the official colors of the Oklahoma City Thunder jersey?",
    options: ["Blue and orange", "Red and white", "Green and yellow", "Black and gold"],
    correct: 0,
    explanation:
      "The official colors of the Oklahoma City Thunder are blue and orange, representing the team's identity and energy.",
  },
]
