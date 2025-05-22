// Seleciona o formulário pelo ID para manipular o evento de envio
const form = document.getElementById('form-atividade');

// HTML das imagens de aprovação e reprovação que serão inseridas na tabela
const imgAprovado = '<img src="./midias/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./midias/reprovado.png" alt="Emoji decepcionado" />';

// Arrays que armazenam, respectivamente, os nomes das atividades e suas notas
const atividades = [];
const notas = [];

// HTML dos spans com texto e estilo para aprovação e reprovação na média final
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

// Solicita ao usuário qual será a nota mínima para aprovação e converte a resposta para número
const notaMinima = parseFloat(prompt('Digite a nota mínima:'));

// Variável que irá acumular as linhas (tr) da tabela em formato HTML
let linhas = '';

// Adiciona um listener para o evento de submit do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    adicionaLinha();        // Chama a função que adiciona uma nova linha de atividade
    atualizaTabela();       // Atualiza o corpo da tabela com as linhas acumuladas
    atualizeMediaFinal();   // Recalcula e exibe a média final das notas
});

/**
 * Função que adiciona uma nova linha de atividade na tabela
 */
function adicionaLinha() {
    // Seleciona os campos de input pelo ID
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');
    
    // Verifica se a atividade já foi adicionada (para evitar duplicatas)
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: "${inputNomeAtividade.value}" já foi inserida.`);
    } else {
        // Armazena o nome e a nota nos arrays correspondentes
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        // Monta dinamicamente a linha (tr) com as colunas (td)
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;                  // Coluna com o nome da atividade
        linha += `<td>${inputNotaAtividade.value}</td>`;                 // Coluna com a nota da atividade
        // Coluna com imagem de aprovado ou reprovado, de acordo com a nota mínima
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';

        // Acumula a nova linha ao conteúdo existente
        linhas += linha;
    }

    // Limpa os campos de input para próxima entrada
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

/**
 * Função que atualiza o corpo da tabela (tbody) com as linhas de atividades
 */
function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas; // Insere o HTML acumulado na tabela
}

/**
 * Função que calcula a média final e atualiza o rodapé da tabela
 */
function atualizeMediaFinal() {
    const mediaFinal = calculaMediaFinal(); // Calcula a média usando outra função

    // Exibe o valor numérico da média
    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    // Exibe o status de aprovado ou reprovado conforme a média e a nota mínima
    document.getElementById('media-final-resultado').innerHTML =
        mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}   

/**
 * Função que percorre o array de notas, soma todas e retorna a média
 * @returns {number} Média aritmética das notas cadastradas
 */
function calculaMediaFinal() {
    let somaDasNotas = 0;

    // Soma cada nota presente no array 'notas'
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    // Retorna a soma dividida pelo número de notas
    return somaDasNotas / notas.length;
}
