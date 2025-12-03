const questions = [
    "What aspects of your current self align with your ideal self?",
    "Where do you notice incongruencies, and how do they affect your self-perception?",
    "What steps can you take to bridge the gap between your current and ideal self?",
    "How do you feel after engaging in this reflective exercise?",
];

let currentIndex = 0;
let answers = [];

const questionText = document.getElementById("question-text");
const answerBox = document.getElementById("answer-textarea");
const nextBtn = document.getElementById("next-button");

displayQuestion();

function displayQuestion() {
    questionText.textContent = questions[currentIndex];
    answerBox.value = "";
    answerBox.focus();
}

nextBtn.addEventListener("click", () => {
    const answer = answerBox.value.trim();

    if (answer === "") {
        alert("Please enter a response before continuing.");
        return;
    }

    answers.push(answer);
    currentIndex++;

    if (currentIndex < questions.length) {
        displayQuestion();
    } else {
        finishForm();
    }
});

submitBtn.addEventListener("click", () => {
    const answer = answerBox.value.trim();
    answers[currentIndex] = answer; 

    localStorage.setItem("reflectionAnswers", JSON.stringify(answers));

    alert("Reflection submitted! Your answers have been saved.");
    console.log("Saved answers:", answers);
});


