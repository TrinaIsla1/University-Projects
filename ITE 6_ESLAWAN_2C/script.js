/**
 * SECTION NAVIGATION LOGIC
 */
function showSection(sectionId) {
    document.querySelectorAll(".content-section").forEach(section => {
        section.classList.add("hidden");
        section.style.animation = "none";
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove("hidden");
        void target.offsetWidth;
        target.style.animation = "sectionEnter 0.5s ease forwards";
    }

    const pageHeader = document.getElementById("pageTitle");
    if (pageHeader && (sectionId.includes('act') || sectionId.includes('ex3'))) {
        pageHeader.textContent = "ITE-6 ACTIVITIES";
    } else {
        pageHeader.textContent = "TRINA ESLAWAN'S EXERCISES IN ITE 6";
    }
}

/**
 * DROPDOWN TOGGLE FUNCTIONS
 */
function toggleDropdown() {
    const submenu = document.getElementById("exerciseSubmenu");
    submenu.classList.toggle("show");
}

function closeDropdown() {
    const submenu = document.getElementById("exerciseSubmenu");
    submenu.classList.remove("show");
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("exerciseDropdown");
    const submenu = document.getElementById("exerciseSubmenu");
    if (!dropdown.contains(event.target)) {
        submenu.classList.remove("show");
    }
});

/**
 * EXERCISE 2 ACTIVITIES
 */
function activity1() {
    alert("Welcome to JavaScript!");
    const resultDiv = document.getElementById("ex2a1-result");
    resultDiv.innerHTML = `<p class="success">✓ Alert displayed: "Welcome to JavaScript!"</p>`;
}

function activity2() {
    const name = prompt("Enter your name:") || "Guest";
    const age = prompt("Enter your age:") || "0";
    alert(`Your name is ${name}, I am ${age} years old.`);

    const resultDiv = document.getElementById("ex2a2-result");
    resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Is Student:</strong> Yes</p>
    `;
}

function activity3() {
    const a = parseFloat(prompt("Enter first number:"));
    const b = parseFloat(prompt("Enter second number:"));

    if (isNaN(a) || isNaN(b)) {
        alert("Math Error: Invalid number.");
        return;
    }

    alert(`Sum: ${a + b}\nDifference: ${a - b}\nProduct: ${a * b}\nQuotient: ${a / b}`);

    const resultDiv = document.getElementById("ex2a3-result");
    resultDiv.innerHTML = `
        <p><strong>Sum:</strong> ${a} + ${b} = ${a + b}</p>
        <p><strong>Difference:</strong> ${a} - ${b} = ${a - b}</p>
        <p><strong>Product:</strong> ${a} × ${b} = ${a * b}</p>
        <p><strong>Quotient:</strong> ${a} ÷ ${b} = ${a / b}</p>
    `;
}

function activity4() {
    const name = prompt("What is your name?") || "Guest";
    const fav = prompt("Favorite number?") || "0";
    alert(`Hello ${name}! Your favorite number is ${fav}.`);

    const resultDiv = document.getElementById("ex2a4-result");
    resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Favorite Number:</strong> ${fav}</p>
    `;
}

function activity5() {
    const age = parseInt(prompt("Enter your age:"));
    const isEligible = age >= 18;
    const message = isEligible ? "You are eligible." : "You are NOT eligible.";
    alert(message);

    const resultDiv = document.getElementById("ex2a5-result");
    resultDiv.innerHTML = `
        <p><strong>Age Entered:</strong> ${age}</p>
        <p class="${isEligible ? 'success' : 'error'}"><strong>Result:</strong> ${message}</p>
    `;
}

function activity6() {
    let forLoop = [];
    for (let i = 1; i <= 10; i++) forLoop.push(i);

    let whileLoop = [];
    let j = 10;
    while (j >= 1) {
        whileLoop.push(j);
        j--;
    }

    alert(`For Loop: ${forLoop.join(", ")}\nWhile Loop: ${whileLoop.join(", ")}`);

    const resultDiv = document.getElementById("ex2a6-result");
    resultDiv.innerHTML = `
        <p><strong>For Loop (1-10):</strong> ${forLoop.join(", ")}</p>
        <p><strong>While Loop (10-1):</strong> ${whileLoop.join(", ")}</p>
    `;
}

function activity7() {
    alert("Button Clicked!");

    const resultDiv = document.getElementById("ex2a7-result");
    resultDiv.innerHTML = `<p class="success">✓ Button click event triggered!</p>`;
}

/**
 * EXERCISE 3 ACTIVITIES
 */

// Activity 1: Change Background
let bgIndex = 0;
const bgOptions = [
    { bg: "#0f172a", text: "#f8fafc", label: "✓ Background: dark navy" },
    { bg: "lightblue", text: "#0f172a", label: "✓ Background: light blue" },
    { bg: "#fef3c7", text: "#0f172a", label: "✓ Background: warm yellow" },
    { bg: "#bbf7d0", text: "#0f172a", label: "✓ Background: mint green" }
];

document.getElementById("bgBtn")?.addEventListener("click", function () {
    bgIndex = (bgIndex + 1) % bgOptions.length;
    const option = bgOptions[bgIndex];

    document.body.style.backgroundColor = option.bg;
    document.body.style.color = option.text;

    this.parentElement.querySelector(".activity-result")?.remove();
    const result = document.createElement("p");
    result.className = "activity-result";
    result.textContent = option.label;
    this.parentElement.appendChild(result);
});

// Activity 2: Dark Mode
document.getElementById("darkBtn")?.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    this.parentElement.querySelector(".activity-result")?.remove();
    const result = document.createElement("p");
    result.className = "activity-result";
    result.textContent = document.body.classList.contains("dark") ? "✓ Dark mode ON" : "✓ Dark mode OFF";
    this.parentElement.appendChild(result);
});

// Activity 3: Add List Item with Checkbox
let itemCount = 1;
document.getElementById("addItemBtn")?.addEventListener("click", function () {
    const input = document.getElementById("customItemInput");
    const ul = document.getElementById("list");
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "item" + itemCount;

    checkbox.addEventListener("change", function () {
        const label = li.querySelector("label");
        label.style.textDecoration = this.checked ? "line-through" : "none";
        label.style.opacity = this.checked ? "0.5" : "1";
    });

    const label = document.createElement("label");
    label.htmlFor = "item" + itemCount;
    label.textContent = input.value || "New Item " + itemCount;

    li.appendChild(checkbox);
    li.appendChild(label);
    ul.appendChild(li);
    itemCount++;
    input.value = "";
});

document.getElementById("clearListBtn")?.addEventListener("click", function () {
    document.getElementById("list").innerHTML = "";
    itemCount = 1;
});

// Activity 4: Remove/Replace Paragraph
document.getElementById("removeBtn")?.addEventListener("click", function () {
    const input = document.getElementById("paraInput");
    const el = document.getElementById("removePara");

    if (el) {
        el.textContent = input.value.trim() || "Paragraph has been removed!";
        el.style.backgroundColor = "#22c55e";
        el.style.color = "white";
        el.style.padding = "12px";
        el.style.borderRadius = "5px";
    }
    input.value = "";
});

// Activity 5: Character Counter
document.getElementById("textInput")?.addEventListener("input", function (e) {
    document.getElementById("charCount").textContent = e.target.value.length;
});

// Activity 6: Simple Addition
document.getElementById("addBtn")?.addEventListener("click", function () {
    const n1 = Number(document.getElementById("num1").value) || 0;
    const n2 = Number(document.getElementById("num2").value) || 0;
    document.getElementById("result").textContent = n1 + n2;
});

// Activity 7: Change Image
let showRabbit = false;
document.getElementById("imgBtn")?.addEventListener("click", function () {
    const img = document.getElementById("image");
    const circle = document.getElementById("imageCircle");
    const capybaraSrc = "images/capybara.png";
    const rabbitSrc = "images/rabbit.png";

    // Fade/scale out, swap src, then fade/scale back in.
    if (circle?.classList.contains("is-transitioning")) return;
    circle?.classList.add("is-transitioning");
    setTimeout(() => {
        showRabbit = !showRabbit;
        img.src = showRabbit ? rabbitSrc : capybaraSrc;
        img.alt = showRabbit ? "Rabbit" : "Capybara";
        circle?.classList.remove("is-transitioning");
    }, 320);
});

// Activity 8: To-Do List with Checkbox
let todoCount = 0;
document.getElementById("todoBtn")?.addEventListener("click", function () {
    const input = document.getElementById("todoInput");
    if (!input.value.trim()) return;

    const ul = document.getElementById("todoList");
    const li = document.createElement("li");
    todoCount++;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "todo" + todoCount;

    checkbox.addEventListener("change", function () {
        const label = li.querySelector("label");
        label.style.textDecoration = this.checked ? "line-through" : "none";
        label.style.opacity = this.checked ? "0.5" : "1";
    });

    const label = document.createElement("label");
    label.htmlFor = "todo" + todoCount;
    label.textContent = input.value;

    li.appendChild(checkbox);
    li.appendChild(label);
    ul.appendChild(li);
    input.value = "";
});

document.getElementById("clearTodoBtn")?.addEventListener("click", function () {
    document.getElementById("todoList").innerHTML = "";
    todoCount = 0;
});

/**
 * EXERCISE 4 - ACTIVITY 1: QUIZ/EXAM GRADE CALCULATOR
 */
if (document.querySelector("#quizGradesContainer")) {
    // ================= EXERCISE 4 =================

    // Quiz and Exam grade containers
    const quizGradesContainer = document.querySelector("#quizGradesContainer");
    const examGradesContainer = document.querySelector("#examGradesContainer");

    // Add buttons
    const addQuizBtn = document.querySelector("#addQuizBtn");
    const addExamBtn = document.querySelector("#addExamBtn");

    // MCO inputs
    const mco1Score = document.querySelector("#mco1Score");
    const mco2Score = document.querySelector("#mco2Score");

    // Buttons and display
    const calculateBtn = document.querySelector("#calculateBtn");
    const resetBtn = document.querySelector("#resetBtn");

    const resultBox = document.querySelector("#resultBox");
    const quizPercentText = document.querySelector("#quizPercent");
    const examPercentText = document.querySelector("#examPercent");
    const mcoPercentText = document.querySelector("#mcoPercent");
    const finalGradeText = document.querySelector("#finalGrade");
    const gradeEquivalentText = document.querySelector("#gradeEquivalent");

    const getLetterGrade = (grade) => {
        if (grade >= 90) return "A";
        if (grade >= 80) return "B";
        if (grade >= 70) return "C";
        if (grade >= 60) return "D";
        return "F";
    };

    // Add Quiz Grade Input
    addQuizBtn?.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "number";
        input.className = "quiz-grade";
        input.placeholder = "Quiz Grade";
        input.min = "0";
        input.max = "100";
        quizGradesContainer?.appendChild(input);
    });

    // Add Exam Grade Input
    addExamBtn?.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "number";
        input.className = "exam-grade";
        input.placeholder = "Exam Grade";
        input.min = "0";
        input.max = "100";
        examGradesContainer?.appendChild(input);
    });

    calculateBtn?.addEventListener("click", () => {
        // Get all quiz grades
        const quizGrades = Array.from(document.querySelectorAll(".quiz-grade"))
            .map(input => parseFloat(input.value))
            .filter(val => !isNaN(val));

        // Get all exam grades
        const examGrades = Array.from(document.querySelectorAll(".exam-grade"))
            .map(input => parseFloat(input.value))
            .filter(val => !isNaN(val));

        // Get MCO score
        const mco1ScoreVal = parseFloat(mco1Score?.value);
        const mco2ScoreVal = parseFloat(mco2Score?.value);

        // Validation
        if (quizGrades.length === 0) {
            alert("Please enter at least one quiz grade.");
            return;
        }

        if (examGrades.length === 0) {
            alert("Please enter at least one exam grade.");
            return;
        }

        if (isNaN(mco1ScoreVal) || isNaN(mco2ScoreVal)) {
            alert("Please enter valid MCO 1 and MCO 2 scores (0-100).");
            return;
        }

        // Validate all grades are between 0-100
        const allGrades = [...quizGrades, ...examGrades];
        if (allGrades.some(grade => grade < 0 || grade > 100)) {
            alert("All grades must be between 0 and 100.");
            return;
        }

        // Validate MCOs are between 0-100
        if (mco1ScoreVal < 0 || mco1ScoreVal > 100 || mco2ScoreVal < 0 || mco2ScoreVal > 100) {
            alert("MCO 1 and MCO 2 must be between 0 and 100.");
            return;
        }

        // Calculate averages
        const quizAverage = quizGrades.reduce((a, b) => a + b, 0) / quizGrades.length;
        const examAverage = examGrades.reduce((a, b) => a + b, 0) / examGrades.length;
        // Combine MCO 1 and MCO 2 as an average (assumption)
        const mcoPercent = (mco1ScoreVal + mco2ScoreVal) / 2;

        // Calculate weighted final grade (20% quiz average, 30% exam average, 50% MCO)
        const finalGrade = (quizAverage * 0.20) + (examAverage * 0.30) + (mcoPercent * 0.50);
        const letter = getLetterGrade(finalGrade);

        // Display results
        quizPercentText.textContent = `Quiz Average: ${quizAverage.toFixed(2)}%`;
        examPercentText.textContent = `Exam Average: ${examAverage.toFixed(2)}%`;
        mcoPercentText.textContent = `MCO Average: ${mcoPercent.toFixed(2)}% (MCO 1: ${mco1ScoreVal}% | MCO 2: ${mco2ScoreVal}%)`;
        finalGradeText.textContent = `Final Grade: ${finalGrade.toFixed(2)}%`;
        gradeEquivalentText.textContent = `Grade Equivalent: ${letter}`;

        resultBox?.classList.remove("hidden");
        quizPercentText?.classList.remove("hidden");
        examPercentText?.classList.remove("hidden");
        mcoPercentText?.classList.remove("hidden");
    });

    resetBtn?.addEventListener("click", () => {
        // Clear all quiz grade inputs except the first one
        const quizInputs = document.querySelectorAll(".quiz-grade");
        quizInputs.forEach((input, index) => {
            if (index === 0) {
                input.value = "";
            } else {
                input.remove();
            }
        });

        // Clear all exam grade inputs except the first one
        const examInputs = document.querySelectorAll(".exam-grade");
        examInputs.forEach((input, index) => {
            if (index === 0) {
                input.value = "";
            } else {
                input.remove();
            }
        });

        if (mco1Score) mco1Score.value = "";
        if (mco2Score) mco2Score.value = "";
        resultBox?.classList.add("hidden");
        quizPercentText?.classList.add("hidden");
        examPercentText?.classList.add("hidden");
        mcoPercentText?.classList.add("hidden");
    });
}