/* Interações do NEXO: menu, tema, tamanho de texto, formulário e quiz. */
(function () {
  "use strict";
  var body = document.body;
  var menuToggle = document.getElementById("menu-toggle");
  var mainNav = document.getElementById("main-nav");
  var themeToggle = document.getElementById("theme-toggle");
  var textToggle = document.getElementById("text-toggle");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      menuToggle.textContent = open ? "×" : "☰";
    });
    mainNav.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", function () { mainNav.classList.remove("is-open"); }); });
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", function () { body.classList.toggle("theme-dark"); var dark = body.classList.contains("theme-dark"); themeToggle.textContent = dark ? "☀" : "☾"; localStorage.setItem("nexo-theme", dark ? "dark" : "light"); });
    if (localStorage.getItem("nexo-theme") === "dark") { body.classList.add("theme-dark"); themeToggle.textContent = "☀"; }
  }
  if (textToggle) {
    textToggle.addEventListener("click", function () { body.classList.toggle("text-large"); localStorage.setItem("nexo-text", body.classList.contains("text-large") ? "large" : "normal"); });
    if (localStorage.getItem("nexo-text") === "large") body.classList.add("text-large");
  }
  var feedbackForm = document.getElementById("feedback-form");
  if (feedbackForm) { var formStatus = document.getElementById("form-status"); feedbackForm.addEventListener("submit", function (event) { event.preventDefault(); formStatus.textContent = "Resposta enviada com sucesso. Obrigado por participar!"; formStatus.classList.add("is-visible"); feedbackForm.reset(); }); }
  var quizCard = document.getElementById("quiz-card");
  if (!quizCard) return;
  var progressBar = document.getElementById("quiz-progress-bar"), counter = document.getElementById("quiz-counter"), current = 0, score = 0, selected = null;
  var questions = [
    { question: "Qual é uma boa forma de usar IA em uma pesquisa escolar?", options: ["Copiar a primeira resposta e entregar sem conferir", "Usar a ferramenta como ponto de partida e verificar as fontes", "Pedir para a IA inventar referências"], answer: 1, explanation: "A IA pode ajudar a organizar ideias, mas a conferência das informações e das fontes continua sendo responsabilidade de quem aprende." },
    { question: "Por que é importante revisar uma resposta gerada por IA?", options: ["Porque a ferramenta pode cometer erros ou apresentar informações desatualizadas", "Porque respostas de IA nunca podem ser úteis", "Porque revisar torna o texto automaticamente original"], answer: 0, explanation: "Modelos de IA podem produzir respostas convincentes e incorretas. Revisar é uma etapa essencial do pensamento crítico." },
    { question: "Qual atitude demonstra autoria e transparência?", options: ["Esconder qualquer uso de ferramenta digital", "Usar IA para substituir todo o processo de aprendizagem", "Conhecer as regras da atividade e declarar o uso quando necessário"], answer: 2, explanation: "Cada atividade pode ter regras próprias. Agir com transparência preserva a autoria e torna o uso da tecnologia mais responsável." }
  ];
  function renderQuiz() { var item = questions[current]; selected = null; counter.textContent = "Pergunta " + (current + 1) + " de " + questions.length; progressBar.style.width = ((current / questions.length) * 100) + "%"; quizCard.innerHTML = '<p class="quiz-question">' + item.question + '</p><div class="quiz-options">' + item.options.map(function (option, index) { return '<button class="quiz-option" data-index="' + index + '"><span>' + String.fromCharCode(65 + index) + '</span>' + option + '</button>'; }).join("") + "</div>"; quizCard.querySelectorAll(".quiz-option").forEach(function (button) { button.addEventListener("click", function () { chooseAnswer(Number(button.dataset.index)); }); }); }
  function chooseAnswer(index) { if (selected !== null) return; selected = index; var item = questions[current], buttons = quizCard.querySelectorAll(".quiz-option"); buttons[item.answer].classList.add("correct"); if (index !== item.answer) buttons[index].classList.add("wrong"); else score += 1; var feedback = document.createElement("div"); feedback.className = "quiz-feedback"; feedback.innerHTML = "<strong>" + (index === item.answer ? "Boa escolha." : "Vale rever.") + "</strong><span>" + item.explanation + '</span><button class="text-link light-link" id="next-question">' + (current === questions.length - 1 ? "Ver resultado" : "Próxima pergunta") + " ›</button>"; quizCard.appendChild(feedback); document.getElementById("next-question").addEventListener("click", function () { if (current === questions.length - 1) showResult(); else { current += 1; renderQuiz(); } }); }
  function showResult() { progressBar.style.width = "100%"; counter.textContent = "Quiz concluído"; quizCard.innerHTML = '<div class="quiz-result"><p class="kicker">Seu resultado</p><h3>' + score + " de " + questions.length + " respostas conscientes</h3><p>" + (score === questions.length ? "Você já está praticando um uso bastante responsável da IA." : "Você já tem bons caminhos. Continue comparando informações e cuidando da sua autoria.") + '</p><button class="button button-light" id="restart-quiz">Refazer o quiz</button></div>'; document.getElementById("restart-quiz").addEventListener("click", function () { current = 0; score = 0; renderQuiz(); }); }
  renderQuiz();
}());
