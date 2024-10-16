document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const quizScreen = document.getElementById('quiz-screen');
    const startScreen = document.getElementById('start-screen');
    const resultScreen = document.getElementById('result-screen');
    const submitAnswerButton = document.getElementById('submit-answer');
    const endQuizButton = document.getElementById('end-quiz');
    const restartButton = document.getElementById('restart');
    const notification = document.getElementById('notification');
    const scoreDisplay = document.getElementById('score');
    const questionCounterDisplay = document.getElementById('question-counter');
    const questionDisplay = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const statisticsDisplay = document.getElementById('statistics');
    const timePerQuestionSlider = document.getElementById('time-per-question');
    const numberOfQuestionsSlider = document.getElementById('number-of-questions');
    const timeValueDisplay = document.getElementById('time-value');
    const questionsValueDisplay = document.getElementById('questions-value');
    const timeRemainingDisplay = document.getElementById('time-remaining');
    
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let currentQuestionIndex = 0;
    let totalQuestions = 10;
    let questions = [];
    let checkAccents = true;
    let questionsInfinite = false;
    let timer;
    let timePerQuestion = 10;

    function generateQuestions() {
        const sampleQuestions = [
            { question: "1a persona del present de 'estar' (singular)", answer: "estic" },
            { question: "3a persona del futur de 'dir' (singular)", answer: "dirà" },
            { question: "2a persona del passat simple de 'poder' (plural)", answer: "poguéreu" },
            { question: "1a persona del present de 'viure' (singular)", answer: "visc" },
        ];
        questions = sampleQuestions.sort(() => Math.random() - 0.5);
    }

    function showNotification(message, isCorrect = null) {
        notification.textContent = message;
        if (isCorrect === true) {
            notification.style.backgroundColor = 'green';
        } else if (isCorrect === false) {
            notification.style.backgroundColor = 'red';
        } else {
            notification.style.backgroundColor = '#444';
        }
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 2000);
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

        clearInterval(timer);

        if (checkAccents) {
            if (userAnswer === correctAnswer) {
                correctAnswers++;
                showNotification('Correcte!', true);
            } else {
                incorrectAnswers++;
                showNotification('Incorrecte!', false);
            }
        } else {
            if (userAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === correctAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
                correctAnswers++;
                showNotification('Correcte!', true);
            } else {
                incorrectAnswers++;
                showNotification('Incorrecte!', false);
            }
        }

        currentQuestionIndex++;
        updateQuizScreen();
    }

    function updateQuizScreen() {
        if (questionsInfinite || currentQuestionIndex < totalQuestions) {
            if (currentQuestionIndex < questions.length) {
                questionDisplay.textContent = questions[currentQuestionIndex].question;
            } else {
                generateQuestions();
                currentQuestionIndex = 0;
                questionDisplay.textContent = questions[currentQuestionIndex].question;
            }
            questionCounterDisplay.textContent = questionsInfinite ? `${currentQuestionIndex + 1}/∞` : `${currentQuestionIndex + 1}/${totalQuestions}`;
            answerInput.value = '';
            startTimer();
        } else {
            endQuiz();
        }
        scoreDisplay.textContent = `Correctes: ${correctAnswers} | Incorrectes: ${incorrectAnswers}`;
    }

    function startTimer() {
        let timeLeft = timePerQuestion;
        timeRemainingDisplay.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timeRemainingDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                incorrectAnswers++;
                showNotification('Temps esgotat!', false);
                currentQuestionIndex++;
                updateQuizScreen();
            }
        }, 1000);
    }

    function startQuiz() {
        correctAnswers = 0;
        incorrectAnswers = 0;
        currentQuestionIndex = 0;
        generateQuestions();
        totalQuestions = parseInt(numberOfQuestionsSlider.value);
        questionsInfinite = (totalQuestions === 50);
        checkAccents = document.getElementById('check-accents').checked;
        timePerQuestion = parseInt(timePerQuestionSlider.value);
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        updateQuizScreen();
    }

    function endQuiz() {
        clearInterval(timer);
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        statisticsDisplay.innerHTML = `
            <p>Correctes: ${correctAnswers}</p>
            <p>Incorrectes: ${incorrectAnswers}</p>
            <p>Total preguntes: ${currentQuestionIndex}</p>
        `;
        renderChart();
    }

    function renderChart() {
        const ctx = document.getElementById('result-chart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Correctes', 'Incorrectes'],
                datasets: [{
                    data: [correctAnswers, incorrectAnswers],
                    backgroundColor: ['#4CAF50', '#F44336'],
                    borderColor: ['#388E3C', '#D32F2F'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 14
                            },
                            color: '#333'
                        }
                    }
                }
            }
        });
    }

    function restartQuiz() {
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }

    startButton.addEventListener('click', startQuiz);
    submitAnswerButton.addEventListener('click', checkAnswer);
    endQuizButton.addEventListener('click', endQuiz);
    restartButton.addEventListener('click', restartQuiz);

    timePerQuestionSlider.addEventListener('input', () => {
        timeValueDisplay.textContent = timePerQuestionSlider.value;
    });

    numberOfQuestionsSlider.addEventListener('input', () => {
        const value = numberOfQuestionsSlider.value;
        questionsValueDisplay.textContent = value === '50' ? '∞' : value;
        questionsValueDisplay.style.fontSize = value === '50' ? '16px' : '16px';
    });

    // Permetre l'enviament amb la tecla Enter
    answerInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});