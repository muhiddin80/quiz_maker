import { getCollection } from "./services/apiService.js"

const quizList = document.getElementById("quiz-list");

async function loadQuizzes() {
  try {
    const res = await getCollection()
    const quizzes = res.data.data;
    console.log(quizzes)

    quizzes.forEach(quiz => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";

      col.innerHTML = `
        <div class="card quiz-card">
          <div class="card-body">
            <h5 class="card-title">${quiz.name}</h5>
            <a href="/pages/quiz.html?id=${quiz.id}" class="btn btn-primary">Start Quiz</a>
          </div>
        </div>
      `;

      quizList.appendChild(col);
    });
  } catch (error) {
    console.error("Failed to load quizzes:", error);
  }
}

loadQuizzes();
