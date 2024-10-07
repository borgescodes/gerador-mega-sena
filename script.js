const inputGame = document.getElementById("input-game");
const btnGenerate = document.getElementById("btn-generator");
const btnClear = document.getElementById("btn-clear");
const divJogos = document.getElementById("jogos");
const apiURL = "https://loteriascaixa-api.herokuapp.com/api/megasena/latest";
let resultadoOficial = [];

function limpar() {
    divJogos.innerHTML = "";
    for (let i = 1; i <= 6; i++) {
        document.getElementById(i.toString()).innerText = '0';
    }
    inputGame.value = "";
}

function mostrarJogos(jogos) {
    divJogos.innerHTML = "";
    jogos.forEach((jogo, index) => {
        const jogoItem = document.createElement("div");
        jogoItem.classList.add("jogo-item");

        const title = document.createElement("div");
        title.classList.add("jogo-title");
        title.innerText = `Jogo ${index + 1}`;
        jogoItem.appendChild(title);

        const numbersContainer = document.createElement("div");
        numbersContainer.classList.add("jogo-numbers");

        jogo.forEach((num) => {
            const number = document.createElement("div");
            number.classList.add("number-item");
            number.innerText = num;
            numbersContainer.appendChild(number);
        });

        jogoItem.appendChild(numbersContainer);
        divJogos.appendChild(jogoItem);
    });

    if (jogos.length > 0) {
        divJogos.firstElementChild.scrollIntoView({ behavior: "smooth" });
    }

    compararJogos(jogos, resultadoOficial);
}

function gerarJogos(quantidade) {
    const jogos = [];
    for (let i = 0; i < quantidade; i++) {
        let jogo = [];
        while (jogo.length < 6) {
            let numero = Math.floor(Math.random() * 60) + 1;
            if (!jogo.includes(numero)) {
                jogo.push(numero);
            }
        }
        jogo.sort((a, b) => a - b);
        jogos.push(jogo);
    }
    mostrarJogos(jogos);
}

async function buscarResultadoOficial() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        resultadoOficial = data.dezenas.map(Number);

        document.getElementById("data-sorteio").innerText = `Data do Sorteio: ${data.data}`;

        const dezenasContainer = document.getElementById("dezenas-sorteadas");
        dezenasContainer.innerHTML = ""; // Limpa conteúdo anterior
        resultadoOficial.forEach((numero) => {
            const numeroDiv = document.createElement("div");
            numeroDiv.innerText = numero;
            dezenasContainer.appendChild(numeroDiv);
        });

    } catch (error) {
        console.error("Erro ao buscar o resultado da API: ", error);
    }
}

function compararJogos(jogos, resultado) {
    const contadores = [0, 0, 0, 0, 0, 0];

    jogos.forEach(jogo => {
        let acertos = jogo.filter(numero => resultado.includes(numero)).length;
        if (acertos > 0 && acertos <= 6) {
            contadores[acertos - 1]++;
        }
    });

    for (let i = 1; i <= 6; i++) {
        document.getElementById(i.toString()).innerText = contadores[i - 1] || '0';
    }
}

btnGenerate.addEventListener("click", () => {
    const quantidade = parseInt(inputGame.value, 10);
    if (!isNaN(quantidade) && quantidade > 0) {
        gerarJogos(quantidade);
    }
});

btnClear.addEventListener("click", () => {
    limpar();
});

inputGame.addEventListener("keydown", (event) => {
    const teclasPermitidas = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

    if (teclasPermitidas.includes(event.key)) {
        return;
    }

    if (event.key >= "0" && event.key <= "9") {
        return;
    }

    event.preventDefault();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const quantidade = parseInt(inputGame.value, 10);
        if (!isNaN(quantidade) && quantidade > 0) {
            gerarJogos(quantidade);
        }
    } else if (event.key === "Delete") {
        limpar();
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    await buscarResultadoOficial();
});
