document.addEventListener("DOMContentLoaded", () => {
    var current_state = "patient";
    const form = document.querySelector(".signup-form");

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
        <h1 class="form-heading">Cadastro de Usuários</h1>

        <input type="text" name="name" placeholder="Insira o nome do funcinário">
        <input type="email" name="email" placeholder="Insira o email do funcinário">
        <input type="text" name="cpf" placeholder="Insira o CPF do funcinário">
        <input type="tel" name="telephone" placeholder="Insira o telefone do funcinário">

        <select class="employee-select" name="specialty" required>
            <option value="" disabled selected>Selecione a especialidade</option>
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

    function load_state() {
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
        current_state = new_state;

        load_state();
        add_events();
    };

    change_state(current_state);
    
});