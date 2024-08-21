let mathType, minNumber, maxNumber, numQuestions, numAttempts;
let currentQuestion = 0;
let correctAnswers = 0;
let attemptsLeft;
let questions = [];

function startQuiz() {
    mathType = document.getElementById('math-type').value;
    minNumber = parseInt(document.getElementById('min-number').value);
    maxNumber = parseInt(document.getElementById('max-number').value);
    numQuestions = parseInt(document.getElementById('num-questions').value);
    numAttempts = parseInt(document.getElementById('num-attempts').value);

    generateQuestions();
    document.getElementById('setup').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    showQuestion();
}

function generateQuestions() {
    for (let i = 0; i < numQuestions; i++) {
        let num1 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        let num2 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        let question, answer;

        if (mathType === 'addition' || (mathType === 'both' && Math.random() < 0.5)) {
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
        } else {
            if (num1 < num2) {
                [num1, num2] = [num2, num1]; // Swap to avoid negative results
            }
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
        }

        questions.push({ question, answer });
    }
}

function showQuestion() {
    if (currentQuestion < numQuestions) {
        document.getElementById('question-number').textContent = `Question ${currentQuestion + 1}`;
        document.getElementById('question').textContent = questions[currentQuestion].question;
        document.getElementById('answer').value = '';
        document.getElementById('result').textContent = '';
        document.getElementById('next-button').style.display = 'none';
        attemptsLeft = numAttempts;
    } else {
        showSummary();
    }
}

function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const correctAnswer = questions[currentQuestion].answer;

    if (userAnswer === correctAnswer) {
        document.getElementById('result').textContent = `Correct! The correct answer is ${correctAnswer}.`;
        document.getElementById('result').className = 'result correct';
        correctAnswers++;
        document.getElementById('next-button').style.display = 'block';
    } else {
        attemptsLeft--;
        if (attemptsLeft > 0) {
            document.getElementById('result').textContent = 'Try again!';
            document.getElementById('result').className = 'result try-again';
        } else {
            document.getElementById('result').textContent = `The correct answer is ${correctAnswer}.`;
            document.getElementById('result').className = 'result incorrect';
            document.getElementById('next-button').style.display = 'block';
        }
    }
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function showSummary() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('summary').style.display = 'block';
    document.getElementById('summary-text').textContent = `You answered ${correctAnswers} out of ${numQuestions} questions correctly.`;

    if (correctAnswers === numQuestions) {
        document.getElementById('star').style.display = 'block';
    }
}
