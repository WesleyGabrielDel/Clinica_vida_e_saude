import { SOURCE_DIR, request } from "./lib/utils.js";

document.addEventListener("DOMContentLoaded", () => {
    var current_state = "patient"; // Define o estado incial
    const form = document.querySelector(".signup-form"); // Pega o formulário de cadastro

    // Guardando o HTML de cada estado
    const patient_state = `
        <h1 class="form-heading">Cadastro de Pacientes</h1>

        <input type="text" name="name" placeholder="Insira o nome do paciente">
        <input type="email" name="email" placeholder="Insira o email do paciente">
        <input type="text" name="cpf" placeholder="Insira o CPF do paciente">
        <input type="tel" name="telephone" placeholder="Insira o telefone do paciente">

        <button type="submit">Cadastrar</button>

        <a class="change-signup" href="#">Deseja cadastrar um funcionário?</a>
    `

    const employee_state = `
        <h1 class="form-heading">Cadastro de Funcionários</h1>

        <input type="text" name="name" placeholder="Insira o nome do funcinário">
        <input type="text" name="cpf" placeholder="Insira o CPF do funcinário">
        <input type="tel" name="telephone" placeholder="Insira o telefone do funcinário">

        <select class="employee-select" name="capacitacao" required>
            <option value="" disabled selected>Selecione a capacitação</option>
            <option value="clinica-geral">Clínica Geral</option>
            <option value="cardiologia">Cardiologia</option>
            <option value="dermatologia">Dermatologia</option>
            <option value="ginecologia">Ginecologia</option>
            <option value="pediatria">Pediatria</option>
            <option value="ortopedia">Ortopedia</option>
        </select>

        <button type="submit">Cadastrar</button>

        <a class="change-signup" href="#"">Deseja cadastrar um paciente?</a>
    `
    
    function add_events() {
        const change_signup = document.querySelector(".change-signup");

        change_signup.addEventListener("click", (e) => {
            e.preventDefault();
            change_state(current_state === "patient" ? "employee" : "patient");
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Não deixa a página recarregar

        const form_data = new FormData(form); // Pega os dados do formulário

        if (current_state === "employee") { 
            // Pega cada informação do formulário
            const nome = form_data.get("name");
            const cpf = form_data.get("cpf");
            const telefone = form_data.get("telephone");
            const capacitacao = form_data.get("capacitacao");

            // Realiza a requisição para o backend
            const response = await request(`${SOURCE_DIR}/services/cadastro.php`, {
                nome : nome,
                cpf : cpf,
                telefone : telefone,
                capacitacao : capacitacao,
                tipo : "funcionario"
            }, "POST");

            alert(response);
        }
         
        else if (current_state === "patient") {
            // Pega cada informação do formulário
            const nome = form_data.get("name");
            const email = form_data.get("email");
            const cpf = form_data.get("cpf");
            const telefone = form_data.get("telephone");

            // Realiza a requisição para o backend
            const response = await request(`${SOURCE_DIR}/services/cadastro.php`, {
                nome : nome,
                email : email,
                cpf : cpf,
                telefone : telefone,
                tipo : "paciente"
            }, "POST");

            alert(response);
        }
    });

    function load_state() {
        // Dependendo do estado, ele muda os elementos de dentro do formulário para os elementos do estado atual
        switch(current_state) {
            case "patient":
                form.innerHTML = patient_state;
            break;

            case "employee":
                form.innerHTML = employee_state;
            break;
        }
    }

    function change_state(new_state) {
        current_state = new_state; // Define o novo estado

        load_state(); // Carrega o form
        add_events(); // Adiciona os event listeners
    };

    change_state(current_state); // Carrega o estado inicial
    
});