import {inzQuestionsBySomeoneElse} from './inz_questions'

export function getInz() {
  const questionParts = [...inzQuestionsBySomeoneElse.split(/\r?\n/)];
  const chunks = [];
  const questions: Question[] = [];

  while (questionParts.length >= 5) {
    const chunk = questionParts.splice(0,5);
    const question = chunk[0];
    const answers = [chunk[1],chunk[2],chunk[3]]
    const answer = chunk[4]
    try {
      questions.push({
        question: question,
        answers: answers.map(a => ({
          answer: a.slice(2),
          valid: a?.toLowerCase().startsWith(answer.toLowerCase())
        })).filter(a => a.answer.length > 3)
      })
      chunks.push(chunk);
    }catch (e) {
      console.log(e);
      console.log({chunk, question, answers, answer})
    }
  }
  return questions;
}
