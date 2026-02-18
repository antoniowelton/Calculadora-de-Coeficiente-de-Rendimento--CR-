

// FUNÇÃO QUE LÊ AS INFORMAÇÕES DO FORMULÁRIO


// 1. Selecionamos os elementos que vamos manipular

const btnAdicionar = document.getElementById('btn-adicionar');
const containerFormulario = document.getElementById('formulario-notas');

// 2. Criamos a função que adiciona a nova linha
function adicionarLinha() {
    // Criamos uma nova DIV que será a "casca" da linha
    const novaLinha = document.createElement('div');
    novaLinha.classList.add('linha-disciplina'); // Adicionamos a classe para herdar o CSS

    // Inserimos o HTML interno da linha (Template Literal)
    // Usamos as crases ` para facilitar a escrita de HTML dentro do JS
    novaLinha.innerHTML = `
        <input type="text" placeholder="Nome da Disciplina (Opcional)" class="nome">
        <input type="number" placeholder="Nota (0-10)" class="nota" step="0.1" min="0" max="10">
        <input type="number" placeholder="Peso / Horas" class="peso" min="1">
        <button type="button" class="btn-remover" onclick="removerLinha(this)">✕</button>
    `;

    // 3. Colocamos a nova linha dentro do container principal
    containerFormulario.appendChild(novaLinha);
}

// 4. Função extra: Remover uma linha caso o usuário erre
function removerLinha(botao) {
    // 'this' refere-se ao botão clicado. O parentNode é a div 'linha-disciplina'
    botao.parentNode.remove();
}

// 5. Ouvinte de Evento: Quando clicar no botão, chama a função
btnAdicionar.addEventListener('click', adicionarLinha);




// ******************************************************************************************************************************************************

// FUNÇÃO QUE FAZ OS CÁLCULOS MATEMÁTICOS USANDO A FÓRMULA DO COEFICIENTE DE RENDIMENTO (CR)

// 1. Selecionamos o botão de calcular e o local onde o resultado aparecerá
const btnCalcular = document.getElementById('btn-calcular');
const displayCR = document.getElementById('valor-cr');

// 2. Função principal de cálculo
function calcularCR() {
    // Capturamos todas as notas e todos os pesos de uma vez usando a classe
    const todasNotas = document.querySelectorAll('.nota');
    const todosPesos = document.querySelectorAll('.peso');

    let somaProdutos = 0; // (Nota * Peso) + (Nota * Peso)...
    let somaPesos = 0;    // Peso + Peso...

    // 3. O "Loop": Percorremos cada linha preenchida
    todasNotas.forEach((inputNota, index) => {
        const nota = parseFloat(inputNota.value);
        const peso = parseFloat(todosPesos[index].value);

        // Validação: Só calcula se ambos os campos tiverem números válidos
        if (!isNaN(nota) && !isNaN(peso)) {
            somaProdutos += (nota * peso);
            somaPesos += peso;
        }
    });

    // 4. Cálculo Final e Exibição
    if (somaPesos > 0) {
        const crFinal = somaProdutos / somaPesos;
        
        // Exibe com 2 casas decimais
        displayCR.innerText = crFinal.toFixed(2);

        // Feedback Visual: Muda a cor dependendo da nota
        if (crFinal >= 7) {
            displayCR.style.color = "#27ae60"; // Verde para bom desempenho
        } else if (crFinal < 5) {
            displayCR.style.color = "#e74c3c"; // Vermelho para alerta
        } else {
            displayCR.style.color = "#f39c12"; // Laranja para atenção
        }
    } else {
        alert("Por favor, preencha pelo menos uma nota e um peso válidos.");
    }
}

// 5. Ouvinte de Evento para o botão calcular
btnCalcular.addEventListener('click', calcularCR);

//******************************************************************************************************************************************************

// FUNÇÃO QUE FAZ O RESET NOS CAMPOS DE DIGITAÇÃO

const btnLimpar = document.getElementById('btn-limpar');

function limparFormulario() {
    // 1. Limpa o valor do resultado na tela
    displayCR.innerText = "0.00";
    displayCR.style.color = "#27ae60";

    // 2. Seleciona todas as linhas de disciplina
    const linhas = document.querySelectorAll('.linha-disciplina');

    // 3. Percorre as linhas
    linhas.forEach((linha, index) => {
        if (index === 0) {
            // Na primeira linha, apenas limpamos os campos de texto
            const inputs = linha.querySelectorAll('input');
            inputs.forEach(input => input.value = "");
        } else {
            // As outras linhas criadas dinamicamente nós removemos completamente
            linha.remove();
        }
    });
}

// Ouvinte de evento para o botão limpar
btnLimpar.addEventListener('click', limparFormulario);