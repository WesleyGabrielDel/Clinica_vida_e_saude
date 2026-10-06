import {SOURCE_DIR, request} from "./lib/utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    const main_table = document.querySelector(".main-table");

    const agendamentos = await request(`${SOURCE_DIR}/services/registros.php`, {
        tipo: "agendamentos"
    }, "POST");

    const fields = ["p_nome", "f_nome", "horario", "data", "status"] // Campos dos registros
    const columns = {};

    console.log(agendamentos);

    fields.forEach((field) => {
        // Pegando o elemento de cada coluna
        const element = main_table.querySelector(`[column="${field}"]`);
        columns[field] = element;
    });
    
    // Percorrendo o array de funcionários
    agendamentos.forEach((agendamento) => {
        // Pegando a chave atual do array
        Object.keys(agendamento).forEach((key) => {
            if (fields.includes(key)) {
                // Criando o elemento da coluna
                const row = document.createElement("div");

                row.classList.add("table-row"); // Adicionando a classe
                row.textContent = agendamento[key]; // Colocando o valor da linha

                columns[key].appendChild(row); // Inserindo na coluna
            }
        });
    });
});
