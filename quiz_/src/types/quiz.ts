export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const questions: QuizQuestion[] = [
  {
    question: "What are the main fragrance families in perfumery?",
    options: [
      "Floral, Oriental, Fresh, Woody",
      "Sweet, Spicy, Light, Heavy", 
      "Summer, Winter, Day, Night",
      "Cheap, Expensive, Medium, Luxury"
    ],
    correct: 0,
    explanation: "The four main fragrance families are Floral, Oriental (Amber), Fresh (Citrus/Aquatic), and Woody. These categories help classify different scent profiles."
  },
  {
    question: "What does 'EDT' mean in perfume terminology?",
    options: [
      "Extra Dry Tonic",
      "Eau de Toilette",
      "European Design Type",
      "Essential Daily Treatment"
    ],
    correct: 1,
    explanation: "EDT stands for Eau de Toilette, which typically contains 5-15% fragrance oils and lasts 2-4 hours. It's lighter than Eau de Parfum (EDP)."
  },
  {
    question: "Which luxury brand is famous for the perfume 'Chanel No. 5'?",
    options: [
      "Dior",
      "Versace", 
      "Chanel",
      "Gucci"
    ],
    correct: 2,
    explanation: "Chanel No. 5 is one of the most iconic perfumes ever created, launched in 1921 by Coco Chanel. It revolutionized the perfume industry with its complex floral-aldehyde composition."
  },
  {
    question: "What are the three main notes in a perfume composition?",
    options: [
      "Light, Medium, Strong",
      "Top, Middle, Base",
      "Fresh, Warm, Cool",
      "Morning, Afternoon, Evening"
    ],
    correct: 1,
    explanation: "Perfumes have Top notes (first impression, 15 mins), Middle/Heart notes (main character, 2-4 hours), and Base notes (lasting foundation, 6+ hours). This creates the fragrance pyramid."
  }
]
