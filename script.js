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
            // Verb 'Estar'
        { question: "Present / 1a Persona del Singular / Estar", answer: "estic" },
        { question: "Present / 2a Persona del Singular / Estar", answer: "estàs" },
        { question: "Present / 3a Persona del Singular / Estar", answer: "està" },
        { question: "Present / 1a Persona del Plural / Estar", answer: "estem" },
        { question: "Present / 2a Persona del Plural / Estar", answer: "esteu" },
        { question: "Present / 3a Persona del Plural / Estar", answer: "estan" },

        { question: "Imperfet / 1a Persona del Singular / Estar", answer: "estava" },
        { question: "Imperfet / 2a Persona del Singular / Estar", answer: "estaves" },
        { question: "Imperfet / 3a Persona del Singular / Estar", answer: "estava" },
        { question: "Imperfet / 1a Persona del Plural / Estar", answer: "estàvem" },
        { question: "Imperfet / 2a Persona del Plural / Estar", answer: "estàveu" },
        { question: "Imperfet / 3a Persona del Plural / Estar", answer: "estaven" },

        { question: "Passat Simple / 1a Persona del Singular / Estar", answer: "estiguí" },
        { question: "Passat Simple / 2a Persona del Singular / Estar", answer: "estigueres" },
        { question: "Passat Simple / 3a Persona del Singular / Estar", answer: "estigué" },
        { question: "Passat Simple / 1a Persona del Plural / Estar", answer: "estiguérem" },
        { question: "Passat Simple / 2a Persona del Plural / Estar", answer: "estiguéreu" },
        { question: "Passat Simple / 3a Persona del Plural / Estar", answer: "estigueren" },

        { question: "Futur Simple / 1a Persona del Singular / Estar", answer: "estaré" },
        { question: "Futur Simple / 2a Persona del Singular / Estar", answer: "estaràs" },
        { question: "Futur Simple / 3a Persona del Singular / Estar", answer: "estarà" },
        { question: "Futur Simple / 1a Persona del Plural / Estar", answer: "estarem" },
        { question: "Futur Simple / 2a Persona del Plural / Estar", answer: "estareu" },
        { question: "Futur Simple / 3a Persona del Plural / Estar", answer: "estaran" },

        // Verb 'Donar'
        { question: "Present / 1a Persona del Singular / Donar", answer: "dono" },
        { question: "Present / 2a Persona del Singular / Donar", answer: "dones" },
        { question: "Present / 3a Persona del Singular / Donar", answer: "dona" },
        { question: "Present / 1a Persona del Plural / Donar", answer: "donem" },
        { question: "Present / 2a Persona del Plural / Donar", answer: "doneu" },
        { question: "Present / 3a Persona del Plural / Donar", answer: "donen" },

        { question: "Imperfet / 1a Persona del Singular / Donar", answer: "donava" },
        { question: "Imperfet / 2a Persona del Singular / Donar", answer: "donaves" },
        { question: "Imperfet / 3a Persona del Singular / Donar", answer: "donava" },
        { question: "Imperfet / 1a Persona del Plural / Donar", answer: "donàvem" },
        { question: "Imperfet / 2a Persona del Plural / Donar", answer: "donàveu" },
        { question: "Imperfet / 3a Persona del Plural / Donar", answer: "donaven" },

        { question: "Passat Simple / 1a Persona del Singular / Donar", answer: "doní" },
        { question: "Passat Simple / 2a Persona del Singular / Donar", answer: "donaràs" },
        { question: "Passat Simple / 3a Persona del Singular / Donar", answer: "donà" },
        { question: "Passat Simple / 1a Persona del Plural / Donar", answer: "donàrem" },
        { question: "Passat Simple / 2a Persona del Plural / Donar", answer: "donàreu" },
        { question: "Passat Simple / 3a Persona del Plural / Donar", answer: "donaren" },

        { question: "Futur Simple / 1a Persona del Singular / Donar", answer: "donaré" },
        { question: "Futur Simple / 2a Persona del Singular / Donar", answer: "donaràs" },
        { question: "Futur Simple / 3a Persona del Singular / Donar", answer: "donarà" },
        { question: "Futur Simple / 1a Persona del Plural / Donar", answer: "donarem" },
        { question: "Futur Simple / 2a Persona del Plural / Donar", answer: "donareu" },
        { question: "Futur Simple / 3a Persona del Plural / Donar", answer: "donaran" },

        // Verb 'Conèixer'
        { question: "Present / 1a Persona del Singular / Conèixer", answer: "conec" },
        { question: "Present / 2a Persona del Singular / Conèixer", answer: "coneixes" },
        { question: "Present / 3a Persona del Singular / Conèixer", answer: "coneix" },
        { question: "Present / 1a Persona del Plural / Conèixer", answer: "coneixem" },
        { question: "Present / 2a Persona del Plural / Conèixer", answer: "coneixeu" },
        { question: "Present / 3a Persona del Plural / Conèixer", answer: "coneixen" },

        { question: "Imperfet / 1a Persona del Singular / Conèixer", answer: "coneixia" },
        { question: "Imperfet / 2a Persona del Singular / Conèixer", answer: "coneixies" },
        { question: "Imperfet / 3a Persona del Singular / Conèixer", answer: "coneixia" },
        { question: "Imperfet / 1a Persona del Plural / Conèixer", answer: "coneixíem" },
        { question: "Imperfet / 2a Persona del Plural / Conèixer", answer: "coneixíeu" },
        { question: "Imperfet / 3a Persona del Plural / Conèixer", answer: "coneixien" },

        { question: "Passat Simple / 1a Persona del Singular / Conèixer", answer: "coneguí" },
        { question: "Passat Simple / 2a Persona del Singular / Conèixer", answer: "conegueres" },
        { question: "Passat Simple / 3a Persona del Singular / Conèixer", answer: "conegué" },
        { question: "Passat Simple / 1a Persona del Plural / Conèixer", answer: "coneguérem" },
        { question: "Passat Simple / 2a Persona del Plural / Conèixer", answer: "coneguéreu" },
        { question: "Passat Simple / 3a Persona del Plural / Conèixer", answer: "conegueren" },

        { question: "Futur Simple / 1a Persona del Singular / Conèixer", answer: "coneixeré" },
        { question: "Futur Simple / 2a Persona del Singular / Conèixer", answer: "coneixeràs" },
        { question: "Futur Simple / 3a Persona del Singular / Conèixer", answer: "coneixerà" },
        { question: "Futur Simple / 1a Persona del Plural / Conèixer", answer: "coneixerem" },
        { question: "Futur Simple / 2a Persona del Plural / Conèixer", answer: "coneixereu" },
        { question: "Futur Simple / 3a Persona del Plural / Conèixer", answer: "coneixeran" },
        
        // Verb 'Poder'
        { question: "Present / 1a Persona del Singular / Poder", answer: "puc" },
        { question: "Present / 2a Persona del Singular / Poder", answer: "pots" },
        { question: "Present / 3a Persona del Singular / Poder", answer: "pot" },
        { question: "Present / 1a Persona del Plural / Poder", answer: "podem" },
        { question: "Present / 2a Persona del Plural / Poder", answer: "podeu" },
        { question: "Present / 3a Persona del Plural / Poder", answer: "poden" },

        { question: "Imperfet / 1a Persona del Singular / Poder", answer: "podia" },
        { question: "Imperfet / 2a Persona del Singular / Poder", answer: "podies" },
        { question: "Imperfet / 3a Persona del Singular / Poder", answer: "podia" },
        { question: "Imperfet / 1a Persona del Plural / Poder", answer: "podíem" },
        { question: "Imperfet / 2a Persona del Plural / Poder", answer: "podíeu" },
        { question: "Imperfet / 3a Persona del Plural / Poder", answer: "podien" },

        { question: "Passat Simple / 1a Persona del Singular / Poder", answer: "poguí" },
        { question: "Passat Simple / 2a Persona del Singular / Poder", answer: "pogueres" },
        { question: "Passat Simple / 3a Persona del Singular / Poder", answer: "pogué" },
        { question: "Passat Simple / 1a Persona del Plural / Poder", answer: "poguérem" },
        { question: "Passat Simple / 2a Persona del Plural / Poder", answer: "poguéreu" },
        { question: "Passat Simple / 3a Persona del Plural / Poder", answer: "pogueren" },

        { question: "Futur Simple / 1a Persona del Singular / Poder", answer: "podré" },
        { question: "Futur Simple / 2a Persona del Singular / Poder", answer: "podràs" },
        { question: "Futur Simple / 3a Persona del Singular / Poder", answer: "podrà" },
        { question: "Futur Simple / 1a Persona del Plural / Poder", answer: "podrem" },
        { question: "Futur Simple / 2a Persona del Plural / Poder", answer: "podreu" },
        { question: "Futur Simple / 3a Persona del Plural / Poder", answer: "podran" },

        // Verb 'Viure'
        { question: "Present / 1a Persona del Singular / Viure", answer: "visc" },
        { question: "Present / 2a Persona del Singular / Viure", answer: "vius" },
        { question: "Present / 3a Persona del Singular / Viure", answer: "viu" },
        { question: "Present / 1a Persona del Plural / Viure", answer: "vivim" },
        { question: "Present / 2a Persona del Plural / Viure", answer: "viviu" },
        { question: "Present / 3a Persona del Plural / Viure", answer: "viuen" },

        { question: "Imperfet / 1a Persona del Singular / Viure", answer: "vivia" },
        { question: "Imperfet / 2a Persona del Singular / Viure", answer: "vivies" },
        { question: "Imperfet / 3a Persona del Singular / Viure", answer: "vivia" },
        { question: "Imperfet / 1a Persona del Plural / Viure", answer: "vivíem" },
        { question: "Imperfet / 2a Persona del Plural / Viure", answer: "vivíeu" },
        { question: "Imperfet / 3a Persona del Plural / Viure", answer: "vivien" },

        { question: "Passat Simple / 1a Persona del Singular / Viure", answer: "visquí" },
        { question: "Passat Simple / 2a Persona del Singular / Viure", answer: "visqueres" },
        { question: "Passat Simple / 3a Persona del Singular / Viure", answer: "visqué" },
        { question: "Passat Simple / 1a Persona del Plural / Viure", answer: "visquérem" },
        { question: "Passat Simple / 2a Persona del Plural / Viure", answer: "visquéreu" },
        { question: "Passat Simple / 3a Persona del Plural / Viure", answer: "visqueren" },

        { question: "Futur Simple / 1a Persona del Singular / Viure", answer: "viuré" },
        { question: "Futur Simple / 2a Persona del Singular / Viure", answer: "viuràs" },
        { question: "Futur Simple / 3a Persona del Singular / Viure", answer: "viurà" },
        { question: "Futur Simple / 1a Persona del Plural / Viure", answer: "viurem" },
        { question: "Futur Simple / 2a Persona del Plural / Viure", answer: "viureu" },
        { question: "Futur Simple / 3a Persona del Plural / Viure", answer: "viuran" },

        // Verb 'Dir'
        { question: "Present / 1a Persona del Singular / Dir", answer: "dic" },
        { question: "Present / 2a Persona del Singular / Dir", answer: "dius" },
        { question: "Present / 3a Persona del Singular / Dir", answer: "diu" },
        { question: "Present / 1a Persona del Plural / Dir", answer: "diem" },
        { question: "Present / 2a Persona del Plural / Dir", answer: "dieu" },
        { question: "Present / 3a Persona del Plural / Dir", answer: "diuen" },

        { question: "Imperfet / 1a Persona del Singular / Dir", answer: "deia" },
        { question: "Imperfet / 2a Persona del Singular / Dir", answer: "deies" },
        { question: "Imperfet / 3a Persona del Singular / Dir", answer: "deia" },
        { question: "Imperfet / 1a Persona del Plural / Dir", answer: "dèiem" },
        { question: "Imperfet / 2a Persona del Plural / Dir", answer: "dèieu" },
        { question: "Imperfet / 3a Persona del Plural / Dir", answer: "deien" },

        { question: "Passat Simple / 1a Persona del Singular / Dir", answer: "diguí" },
        { question: "Passat Simple / 2a Persona del Singular / Dir", answer: "digueres" },
        { question: "Passat Simple / 3a Persona del Singular / Dir", answer: "digué" },
        { question: "Passat Simple / 1a Persona del Plural / Dir", answer: "diguérem" },
        { question: "Passat Simple / 2a Persona del Plural / Dir", answer: "diguéreu" },
        { question: "Passat Simple / 3a Persona del Plural / Dir", answer: "digueron" },

        { question: "Futur Simple / 1a Persona del Singular / Dir", answer: "diré" },
        { question: "Futur Simple / 2a Persona del Singular / Dir", answer: "diràs" },
        { question: "Futur Simple / 3a Persona del Singular / Dir", answer: "dirà" },
        { question: "Futur Simple / 1a Persona del Plural / Dir", answer: "direm" },
        { question: "Futur Simple / 2a Persona del Plural / Dir", answer: "direu" },
        { question: "Futur Simple / 3a Persona del Plural / Dir", answer: "diran" },

        // Verb 'Dur'
        { question: "Present / 1a Persona del Singular / Dur", answer: "porto" },
        { question: "Present / 2a Persona del Singular / Dur", answer: "portes" },
        { question: "Present / 3a Persona del Singular / Dur", answer: "porta" },
        { question: "Present / 1a Persona del Plural / Dur", answer: "portem" },
        { question: "Present / 2a Persona del Plural / Dur", answer: "porteu" },
        { question: "Present / 3a Persona del Plural / Dur", answer: "porten" },

        { question: "Imperfet / 1a Persona del Singular / Dur", answer: "portava" },
        { question: "Imperfet / 2a Persona del Singular / Dur", answer: "portaves" },
        { question: "Imperfet / 3a Persona del Singular / Dur", answer: "portava" },
        { question: "Imperfet / 1a Persona del Plural / Dur", answer: "portàvem" },
        { question: "Imperfet / 2a Persona del Plural / Dur", answer: "portàveu" },
        { question: "Imperfet / 3a Persona del Plural / Dur", answer: "portaven" },

        { question: "Passat Simple / 1a Persona del Singular / Dur", answer: "portí" },
        { question: "Passat Simple / 2a Persona del Singular / Dur", answer: "portares" },
        { question: "Passat Simple / 3a Persona del Singular / Dur", answer: "portà" },
        { question: "Passat Simple / 1a Persona del Plural / Dur", answer: "portàrem" },
        { question: "Passat Simple / 2a Persona del Plural / Dur", answer: "portàreu" },
        { question: "Passat Simple / 3a Persona del Plural / Dur", answer: "portaren" },

        { question: "Futur Simple / 1a Persona del Singular / Dur", answer: "portaré" },
        { question: "Futur Simple / 2a Persona del Singular / Dur", answer: "portaràs" },
        { question: "Futur Simple / 3a Persona del Singular / Dur", answer: "portarà" },
        { question: "Futur Simple / 1a Persona del Plural / Dur", answer: "portarem" },
        { question: "Futur Simple / 2a Persona del Plural / Dur", answer: "portareu" },
        { question: "Futur Simple / 3a Persona del Plural / Dur", answer: "portaran" },

        // Verb 'Servir'
        { question: "Present / 1a Persona del Singular / Servir", answer: "serveixo" },
        { question: "Present / 2a Persona del Singular / Servir", answer: "serveixes" },
        { question: "Present / 3a Persona del Singular / Servir", answer: "serveix" },
        { question: "Present / 1a Persona del Plural / Servir", answer: "servim" },
        { question: "Present / 2a Persona del Plural / Servir", answer: "serviu" },
        { question: "Present / 3a Persona del Plural / Servir", answer: "serveixen" },

        { question: "Imperfet / 1a Persona del Singular / Servir", answer: "servia" },
        { question: "Imperfet / 2a Persona del Singular / Servir", answer: "servies" },
        { question: "Imperfet / 3a Persona del Singular / Servir", answer: "servia" },
        { question: "Imperfet / 1a Persona del Plural / Servir", answer: "servíem" },
        { question: "Imperfet / 2a Persona del Plural / Servir", answer: "servíeu" },
        { question: "Imperfet / 3a Persona del Plural / Servir", answer: "servien" },

        { question: "Passat Simple / 1a Persona del Singular / Servir", answer: "serví" },
        { question: "Passat Simple / 2a Persona del Singular / Servir", answer: "servires" },
        { question: "Passat Simple / 3a Persona del Singular / Servir", answer: "serví" },
        { question: "Passat Simple / 1a Persona del Plural / Servir", answer: "servírem" },
        { question: "Passat Simple / 2a Persona del Plural / Servir", answer: "servíreu" },
        { question: "Passat Simple / 3a Persona del Plural / Servir", answer: "serviren" },

        { question: "Futur Simple / 1a Persona del Singular / Servir", answer: "serviré" },
        { question: "Futur Simple / 2a Persona del Singular / Servir", answer: "serviràs" },
        { question: "Futur Simple / 3a Persona del Singular / Servir", answer: "servirà" },
        { question: "Futur Simple / 1a Persona del Plural / Servir", answer: "servirem" },
        { question: "Futur Simple / 2a Persona del Plural / Servir", answer: "servireu" },
        { question: "Futur Simple / 3a Persona del Plural / Servir", answer: "serviran" }
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
