document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".signup-form");
    const change_signup = document.querySelector(".change-signup");

    const current_state = "patient";

    const patient_state = `
        <h1 class="form-heading">Cadastro de Pacientes</h1>

        <input type="text" name="name" placeholder="Insira o nome do paciente">
        <input type="text" name="cpf" placeholder="Insira o CPF do paciente">
        <input type="email" name="email" placeholder="Insira o email do paciente">
        <input type="tel" name="telephone" placeholder="Insira o nome do paciente">

        <button type="submit">Cadastrar</button>

        <a class="change-signup" href="#">Deseja cadastrar um funcionário?</a>
    `

    const employee_state = `
        <h1 class="form-heading">Cadastro de Funcionários</h1>

        <input type="text" name="name" placeholder="Insira o nome do funcinário">
        <input type="text" name="cpf" placeholder="Insira o CPF do funcinário">
        <input type="email" name="email" placeholder="Insira o email do funcinário">
        <input type="tel" name="telephone" placeholder="Insira o nome do funcinário">

        <button type="submit">Cadastrar</button>

        <a class="change-signup" href="#">Deseja cadastrar um paciente?</a>
    `

    switch(current_state) {
        case "patient":
            form.innerHTML = patient_state;
        break;

        case "employee":
            form.innerHTML = employee_state;
        break;
    }


});