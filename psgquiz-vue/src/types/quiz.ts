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
    question: "Em que ano o Oklahoma City Thunder foi fundado?",
    options: ["2008", "1996", "2012", "1985"],
    correct: 0,
    explanation:
      "O Oklahoma City Thunder foi fundado em 2008 quando o Seattle SuperSonics se mudou para Oklahoma City.",
  },
  {
    id: 2,
    question: "Qual é o número da camisa do Shai Gilgeous-Alexander?",
    options: ["2", "5", "11", "0"],
    correct: 0,
    explanation: "Shai Gilgeous-Alexander usa a camisa número 2 pelo Oklahoma City Thunder.",
  },
  {
    id: 3,
    question: "Em qual cidade o Thunder joga seus jogos em casa?",
    options: ["Oklahoma City", "Dallas", "New York", "Miami"],
    correct: 0,
    explanation: "O Oklahoma City Thunder joga suas partidas em casa no Paycom Center em Oklahoma City, Oklahoma.",
  },
  {
    id: 4,
    question: "Quais são as cores oficiais da camisa do Oklahoma City Thunder?",
    options: ["Azul e laranja", "Vermelho e branco", "Verde e amarelo", "Preto e dourado"],
    correct: 0,
    explanation:
      "As cores oficiais do Oklahoma City Thunder são azul e laranja, representando a identidade e energia do time.",
  },
]
