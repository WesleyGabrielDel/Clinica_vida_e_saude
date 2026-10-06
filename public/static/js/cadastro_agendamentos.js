import { SOURCE_DIR, request } from "./lib/utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".signup-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Não deixa a página recarregar

        const form_data = new FormData(form); 

        // Pegando as iformações do formulário
        const p_cpf = form_data.get("p_cpf");
        const f_cpf = form_data.get("f_cpf");
        const date = form_data.get("date");
        const time = form_data.get("time");

        // Realiza a requisição para o backend
        const response = await request(`${SOURCE_DIR}/services/cadastro.php`, {
            p_cpf : p_cpf,
            f_cpf : f_cpf,
            date : date,
            time : time,
            tipo : "agendamento"
        }, "POST");

        alert(response);
    });
});