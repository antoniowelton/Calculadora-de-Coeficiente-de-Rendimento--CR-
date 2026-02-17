
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