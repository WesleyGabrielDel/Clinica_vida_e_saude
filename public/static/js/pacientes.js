import {SOURCE_DIR, request} from "./lib/utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    const main_table = document.querySelector(".main-table");

    const response = await request(`${SOURCE_DIR}/services/registros.php`, {
        tipo: "pacientes"
    }, "POST");

    const pacientes = JSON.parse(response); // Arrumando o formato da resposta pra ficar em array    

    const fields = ["nome", "cpf", "email", "telefone", "tem_agendamento"] // Campos dos registros
    const columns = {};

    console.log(pacientes);

    fields.forEach((field) => {
        // Pegando o elemento de cada coluna
        const element = main_table.querySelector(`[column="${field}"]`);
        columns[field] = element;
    });
    
    // Percorrendo o array de funcionários
    pacientes.forEach((paciente) => {
        // Pegando a chave atual do array
        Object.keys(paciente).forEach((key) => {
            if (fields.includes(key)) {
                // Criando o elemento da coluna
                const row = document.createElement("div");
                
                /**
                 *  Como o banco retorna 1 ou 0 para true e false, temos que tratar isso para
                 *  ficar visivelmente melhor.
                 * 
                 *  Se a chave do array atual for tem_agendamento, verifica se o valor atual
                 *  é 1 ou zero e determina seu valor normalizado.
                 */

                if (key == "tem_agendamento") {
                    if (paciente[key] == 1) {
                        paciente[key] = "Tem";
                    }

                    else if (paciente[key] == 0) {
                        paciente[key] = "Não tem";
                    }
                }

                row.classList.add("table-row"); // Adicionando a classe
                row.textContent = paciente[key]; // Colocando o valor da linha

                columns[key].appendChild(row); // Inserindo na coluna
            }
        });
    });
});
