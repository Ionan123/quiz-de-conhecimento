const perguntas = [
  { pergunta: "Qual linguagem define a estrutura de uma página web?", opcoes: ["CSS", "HTML", "JavaScript"], correta: 1 },
  { pergunta: "Qual linguagem é usada principalmente para estilizar páginas?", opcoes: ["CSS", "Python", "HTML"], correta: 0 },
  { pergunta: "Qual comando seleciona um elemento pelo ID?", opcoes: ["getElementById()", "queryColor()", "selectClass()"], correta: 0 },
  { pergunta: "Qual símbolo inicia um comentário de uma linha em JavaScript?", opcoes: ["<!--", "//", "**"], correta: 1 },
  { pergunta: "Qual método adiciona um evento de clique?", opcoes: ["addEventListener()", "innerHTML()", "pushClick()"], correta: 0 }
];
let indice = 0, pontos = 0, respondeu = false;
const perguntaEl = document.querySelector("#pergunta");
const alternativas = document.querySelector("#alternativas");
const feedback = document.querySelector("#feedback");
const proxima = document.querySelector("#proxima");
function mostrarPergunta() {
  respondeu = false;
  const atual = perguntas[indice];
  document.querySelector("#progresso").textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;
  document.querySelector("#pontuacao").textContent = `Pontos: ${pontos}`;
  document.querySelector("#preenchimento").style.width = `${indice / perguntas.length * 100}%`;
  perguntaEl.textContent = atual.pergunta;
  alternativas.innerHTML = "";
  feedback.textContent = "";
  proxima.disabled = true;
  atual.opcoes.forEach((opcao, i) => {
    const botao = document.createElement("button");
    botao.className = "opcao";
    botao.textContent = opcao;
    botao.addEventListener("click", () => verificarResposta(i));
    alternativas.append(botao);
  });
}
function verificarResposta(escolha) {
  if (respondeu) return;
  respondeu = true;
  const correta = perguntas[indice].correta;
  [...alternativas.children].forEach((botao, i) => {
    botao.disabled = true;
    if (i === correta) botao.classList.add("correta");
    else if (i === escolha) botao.classList.add("errada");
  });
  if (escolha === correta) {
    pontos++;
    feedback.textContent = "Muito bem! Resposta correta. 🎉";
  } else {
    feedback.textContent = `Não foi dessa vez. Resposta: ${perguntas[indice].opcoes[correta]}.`;
  }
  document.querySelector("#pontuacao").textContent = `Pontos: ${pontos}`;
  proxima.disabled = false;
  proxima.textContent = indice === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta";
}
proxima.addEventListener("click", () => {
  if (!respondeu) return;
  indice++;
  if (indice < perguntas.length) mostrarPergunta();
  else {
    document.querySelector("#preenchimento").style.width = "100%";
    perguntaEl.hidden = true;
    alternativas.hidden = true;
    feedback.hidden = true;
    proxima.hidden = true;
    document.querySelector(".topo").hidden = true;
    document.querySelector("#final").hidden = false;
    document.querySelector("#mensagemFinal").textContent = `Você acertou ${pontos} de ${perguntas.length} perguntas! ${pontos >= 4 ? "Excelente trabalho!" : "Continue praticando!"}`;
  }
});
document.querySelector("#reiniciar").addEventListener("click", () => {
  indice = 0; pontos = 0;
  perguntaEl.hidden = false; alternativas.hidden = false; feedback.hidden = false;
  proxima.hidden = false; document.querySelector(".topo").hidden = false;
  document.querySelector("#final").hidden = true;
  proxima.textContent = "Próxima pergunta";
  mostrarPergunta();
});
mostrarPergunta();