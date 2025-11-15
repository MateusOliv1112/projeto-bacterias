document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  if (nav.style.display === 'flex') { nav.style.display = ''; }
  else { nav.style.display = 'flex'; nav.style.flexDirection = 'column'; }
});

// Quiz - perguntas simples
const quizData = [
  {
    q: "Qual característica distingue bactérias Gram-positivas no teste de Gram?",
    choices: [
      "Elas coram-se em vermelho com safranina",
      "Retêm a coloração violeta",
      "Não têm parede celular",
      "Formam cápsula obrigatoriamente"
    ],
    a: 1
  },
  {
    q: "Qual teste bioquímico diferencia Staphylococcus de Streptococcus?",
    choices: ["Catalase", "Coagulase", "Oxidase", "Indol"],
    a: 0
  },
  {
    q: "Qual gênero tem espécies formadoras de esporos?",
    choices: ["Streptococcus", "Bacillus", "Neisseria", "Mycoplasma"],
    a: 1
  },
  {
    q: "Qual bactéria é frequentemente associada à intoxicação por arroz mal conservado?",
    choices: ["Listeria monocytogenes","Bacillus cereus","Staphylococcus aureus","Clostridium tetani"],
    a: 1
  }
];

let current = 0;
let score = 0;
const qText = document.getElementById('q-text');
const answersDiv = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const resultP = document.getElementById('quiz-result');

function renderQuestion(){
  const item = quizData[current];
  qText.textContent = item.q;
  answersDiv.innerHTML = '';
  item.choices.forEach((ch, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer';
    btn.type = 'button';
    btn.textContent = ch;
    btn.dataset.index = i;
    btn.addEventListener('click', () => selectAnswer(btn, i));
    answersDiv.appendChild(btn);
  });
  resultP.textContent = `Pergunta ${current+1} de ${quizData.length}`;
}

function selectAnswer(btn, idx){
  // não permitir múltiplas respostas
  if (answersDiv.querySelector('.selected')) return;
  btn.classList.add('selected');
  const correct = quizData[current].a;
  if (idx === correct) {
    score++;
  } else {
    // destacar a correta
    const correctBtn = [...answersDiv.children].find(n => +n.dataset.index === correct);
    if (correctBtn) correctBtn.style.outline = '2px solid rgba(0,0,0,0.07)';
  }
}

nextBtn.addEventListener('click', () => {
  // se não houver seleção, avançar mesmo assim
  current++;
  if (current >= quizData.length) {
    finishQuiz();
  } else {
    renderQuestion();
  }
});

restartBtn.addEventListener('click', () => {
  current = 0; score = 0;
  restartBtn.style.display = 'none';
  nextBtn.style.display = '';
  renderQuestion();
  resultP.textContent = '';
});

function finishQuiz(){
  qText.textContent = "Resultado";
  answersDiv.innerHTML = `<p style="margin:0 0 12px">Você acertou ${score} de ${quizData.length}.</p>
  <p class="muted">Pontuação rápida — use como revisão. Consulte fontes confiáveis para estudo aprofundado.</p>`;
  nextBtn.style.display = 'none';
  restartBtn.style.display = '';
  resultP.textContent = '';
}

renderQuestion();