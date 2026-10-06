import {SOURCE_DIR, request} from "./lib/utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    const main_table = document.querySelector(".main-table");

    const response = await request(`${SOURCE_DIR}/services/registros.php`, {
        tipo: "funcionarios"
    }, "POST");

    const funcionarios = JSON.parse(response); // Arrumando o formato da resposta pra ficar em array    

    const fields = ["nome", "cpf", "capacitacao", "telefone", "qnt_atendimentos"]; // Campos dos registros
    const columns = {};

    console.log(funcionarios);

    fields.forEach((field) => {
        // Pegando o elemento de cada coluna
        const element = main_table.querySelector(`[column="${field}"]`);
        columns[field] = element;
    });
    
    // Percorrendo o array de funcionários
    funcionarios.forEach((funcionario) => {
        // Pegando a chave atual do array
        Object.keys(funcionario).forEach((key) => {
            if (fields.includes(key)) {
                // Criando o elemento da coluna
                const row = document.createElement("div");

                row.classList.add("table-row"); // Adicionando a classe
                row.textContent = funcionario[key]; // Colocando o valor da linha

                columns[key].appendChild(row); // Inserindo na coluna
            }
        });
    });
});
