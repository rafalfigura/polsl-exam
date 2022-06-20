interface Answer{
    "answer": string,
    "valid"?: boolean,
}
interface Question {
    "question": string
    "answers": Answer[]
}

