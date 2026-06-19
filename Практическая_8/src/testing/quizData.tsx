export type tTasks = {
    "question": string;
    "answer": string;
}[]

export type tSortTask = {
    "items": string[];
}

export type tQuizItem =
    | {
        "id": number;
        "type": "M";
        "title": string;
        "tasks": tTasks;
      }
    | {
        "id": number;
        "type": "S";
        "title": string;
        "tasks": tTasks;
      }
    | {
        "id": number;
        "type": "C";
        "title": string;
        "tasks": tTasks;
      }
    | {
        "id": number;
        "type": "MC";
        "title": string;
        "tasks": tTasks;
      };

export type tQuizzes = tQuizItem[];

export const quiz: tQuizzes = [
  {
    "id": 1,
    "type": "M",
    "title": "Сопоставьте автомобиль и его тип кузова.",
    "tasks": [
      { "question": "Toyota Camry", "answer": "Седан" },
      { "question": "Volkswagen Golf", "answer": "Хэтчбек" },
      { "question": "Land Rover Defender", "answer": "Внедорожник" },
      { "question": "Porsche 911", "answer": "Спорткар" },
    ]
  },
  {
    "id": 2,
    "type": "M",
    "title": "Сопоставьте автомобиль и его максимальную скорость.",
    "tasks": [
      { "question": "Toyota Camry", "answer": "220" },
      { "question": "Volkswagen Golf", "answer": "210" },
      { "question": "Land Rover Defender", "answer": "180" },
      { "question": "Porsche 911", "answer": "320" },
    ]
  },
  {
    "id": 3,
    "type": "S",
    "title": "Расставьте автомобили в порядке возрастания максимальной скорости.",
    "tasks": [
      { "question": "Land Rover Defender", "answer": "1" },
      { "question": "Volkswagen Golf", "answer": "2" },
      { "question": "Toyota Camry", "answer": "3" },
      { "question": "Porsche 911", "answer": "4" }
    ]
  },
  {
    "id": 4,
    "type": "S",
    "title": "Расставьте автомобили в порядке возрастания объёма двигателя.",
    "tasks": [
      { "question": "Volkswagen Golf", "answer": "1" },
      { "question": "Toyota Camry", "answer": "2" },
      { "question": "Land Rover Defender", "answer": "3" },
      { "question": "Porsche 911", "answer": "4" }
    ]
  },
  {
    "id": 5,
    "type": "C",
    "title": "Какой тип кузова у Land Rover Defender?",
    "tasks": [
      { "question": "Седан", "answer": "0" },
      { "question": "Хэтчбек", "answer": "0" },
      { "question": "Внедорожник", "answer": "1" },
      { "question": "Спорткар", "answer": "0" }
    ]
  },
  {
    "id": 6,
    "type": "MC",
    "title": "Какие автомобили производятся в Японии?",
    "tasks": [
      { "question": "Toyota Camry", "answer": "1" },
      { "question": "Volkswagen Golf", "answer": "0" },
      { "question": "Land Rover Defender", "answer": "0" },
      { "question": "Porsche 911", "answer": "0" }
    ]
  },
  {
    "id": 7,
    "type": "MC",
    "title": "Какие автомобили имеют задний или полный привод?",
    "tasks": [
      { "question": "Toyota Camry", "answer": "0" },
      { "question": "Volkswagen Golf", "answer": "0" },
      { "question": "Land Rover Defender", "answer": "1" },
      { "question": "Porsche 911", "answer": "1" }
    ]
  }
];