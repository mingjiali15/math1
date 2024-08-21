// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
  const setupContainer = document.getElementById('setup-container');
  const quizContainer = document.getElementById('quiz-container');
  const resultContainer = document.getElementById('result-container');
  
  const startQuizButton = document.getElementById('start-quiz');
  const submitButton = document.getElementById('submit');
  const nextQuestionButton = document.getElementById('next-question');
  
  const operationSelect = document.getElementById('operation');
  const minNumberInput = document.getElementById('min-number');
  const maxNumberInput = document.getElementById('max-number');
  const numQuestionsInput = document.getElementById('num-questions');
  const numTriesInput = document.getElementById('num-tries');
  
  const questionNumberElement = document.getElementById('question-number');
  const questionElement = document.getElementById('question');
  const answerInput = document.getElementById('answer');
  const totalQuestionsElement = document.getElementById('total-questions');
  const questionsCorrectElement = document.getElementById('questions-correct');
  const questionsIncorrectElement = document.getElementById('questions-incorrect');
  const finalMessageElement = document.getElementById('final-message');
  
  let questions = [];
  let currentQuestionIndex = 0;
  let numTries = 2;
  let questionsAnswered = 0;
  let questionsCorrect = 0;
  let questionsIncorrect = 0;

  // Function to start the quiz
  function startQuiz() {
    const operation = operationSelect.value;
    const minNumber = parseInt(minNumberInput.value);
    const maxNumber = parseInt(maxNumberInput.value);
    const numQuestions = parseInt(numQuestionsInput.value);
    numTries = parseInt(numTriesInput.value);

    questions = generateQuestions(operation, minNumber, maxNumber, numQuestions);
    currentQuestionIndex = 0;
    questionsAnswered = 0;
    questionsCorrect = 0;
    questionsIncorrect = 0;

    setupContainer.style.display = 'none';
    quizContainer.style.display = 'flex';
    resultContainer.style.display = 'none';

    showQuestion();
  }

  // Function to generate questions
  function generateQuestions(operation, min, max, count) {
    let questions = [];
    for (let i = 0; i < count; i++) {
      let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
      let num2 = Math.floor(Math.random() * (max - min + 1)) + min;
      let answer;
      let questionText;

      if (operation === 'addition' || operation === 'both') {
        questionText = `${num1} + ${num2}`;
        answer = num1 + num2;
        questions.push({ question: questionText, answer: answer });
      }
      if (operation === 'subtraction' || operation === 'both') {
        questionText = `${num1} - ${num2}`;
        answer = num1 - num2;
        questions.push({ question: questionText, answer: answer });
      }
    }
    return questions;
  }

  // Function to show the current question
  function showQuestion() {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}`;
      questionElement.textContent = currentQuestion.question;
      answerInput.value = '';
      answerInput.focus();
      submitButton.style.display = 'block';
      nextQuestionButton.style.display = 'none';
    } else {
      showResults();
    }
  }

  // Function to handle the submission of an answer
  function handleSubmit() {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = parseFloat(answerInput.value);
    if (userAnswer === currentQuestion.answer) {
      questionsCorrect++;
      questionElement.innerHTML = `<span style="color: green; font-size: 1.8em;">Correct!</span>`;
      submitButton.style.display = 'none';
      nextQuestionButton.style.display = 'block';
    } else {
      questionsIncorrect++;
      numTries--;
      if (numTries > 0) {
        questionElement.innerHTML = `<span style="color: yellow; font-size: 1.8em;">Try again</span>`;
        answerInput.value = ''; // Clear the