const questions = [
    "1 out of 4: What aspects of your current self align with your ideal self?",
    "2 out of 4: Where do you notice incongruencies, and how do they affect your self-perception?",
    "3 out of 4: What steps can you take to bridge the gap between your current and ideal self?",
    "4 out of 4: How do you feel after engaging in this reflective exercise?",
];

let currentIndex = 0;
let answers = [];

const questionText = document.getElementById("question-text");
const answerBox = document.getElementById("answer-textarea");
const nextBtn = document.getElementById("next-button");
const submitBtn = document.getElementById("submit-button");

displayQuestion();

function displayQuestion() {
    questionText.textContent = questions[currentIndex];
    answerBox.value = answers[currentIndex] || "";
    answerBox.focus();

    if (currentIndex === questions.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "block";
    } else {
        nextBtn.style.display = "block";
        submitBtn.style.display = "none";
    }
}

nextBtn.addEventListener("click", () => {
    const answer = answerBox.value.trim();

    if (answer === "") {
        alert("Please enter a response before continuing.");
        return;
    }

    answers[currentIndex] = answer;
    currentIndex++;

    displayQuestion();
});

submitBtn.addEventListener("click", () => {
    const answer = answerBox.value.trim();
    answers[currentIndex] = answer;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Reflection Prompt Responses", 10, 20);
    doc.setFontSize(12);
    doc.text(`Timestamp: ${new Date().toLocaleString()}`, 10, 30);

    let yPos = 40;
    questions.forEach((q, i) => {
        doc.setFont(undefined, "bold");
        doc.text(`${i + 1}. ${q}`, 10, yPos);
        yPos += 8;

        doc.setFont(undefined, "normal");
        const wrapped = doc.splitTextToSize(`Answer: ${answers[i]}`, 180);
        doc.text(wrapped, 15, yPos);
        yPos += wrapped.length * 8 + 4;
    });

    doc.save(`reflection_${Date.now()}.pdf`);

    alert("Reflection saved as PDF!");

    currentIndex = 0;
    answers = [];
    displayQuestion();
});
