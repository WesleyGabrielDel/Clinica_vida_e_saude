<?php 
// Resgatando a classe utilitária de banco de dados
require_once "../utils/Database.php";
require_once "../utils/_utils.php";

$data = get_data(); // Pegando os dados enviados via POST
$type = $data["tipo"]; // Pegando o tipo de cadastro

// Caso o tipo seja válido
if (isset($type) && !empty($type)) {
    switch ($type) {
        case "paciente":
            // Percorrendo o array dos dados recebidos
            foreach ($data as $key => $value) {
                // Verificando se algum dos campos está vazio
                if (!isset($value) || empty($value)) {
                    echo json_encode("Campo $key está vazio");
                    exit();
                }
            }
            
            // Armazenando os dados do paciente em variáveis
            $nome = $data["nome"];
            $email = $data["email"];
            $cpf = $data["cpf"];
            $telefone = $data["telefone"];

            // Realizando a conexão com o banco de dados
            $mysqli = Database::connect();
            
            // Verificando se o paciente já está cadastrado
            $query = "SELECT * FROM pacientes WHERE cpf = ?"; // Definindo a query
            $params = ["s", $cpf]; // Definindo os parâmetros

            $result = Database::fetch_one($mysqli, $query, $params); // Realizando a query

            // Caso o paciente já esteja cadastrado, ele retorna uma mensagem de erro e para a execução
            if ($result) { 
                echo json_encode("Paciente já está cadastrado");
                exit();
            }

            // Inserindo as informações do paciente no banco
            $query = "INSERT INTO pacientes (nome, email, cpf, telefone) VALUES (?, ?, ?, ?)"; 
            $params = ["ssss", $nome, $email, $cpf, $telefone];

            Database::query($mysqli, $query, $params); // Realizando a query

            echo json_encode("Cadastro de paciente realizado com sucesso");
            break;

        case "funcionario":
            // Percorrendo o array dos dados recebidos
            foreach ($data as $key => $value) {
                // Verificando se algum dos campos está vazio
                if (!isset($value) || empty($value)) {
                    echo json_encode("Campo $key está vazio");
                    exit();
                }
            }
            
            // Armazenando os dados do funcionário em variáveis
            $nome = $data["nome"];
            $cpf = $data["cpf"];
            $telefone = $data["telefone"];
            $capacitacao = $data["capacitacao"];

            // Realizando a conexão com o banco de dados
            $mysqli = Database::connect();
            
            // Verificando se o funcionário já está cadastrado
            $query = "SELECT * FROM funcionarios WHERE cpf = ?"; // Definindo a query
            $params = ["s", $cpf]; // Definindo os parâmetros

            $result = Database::fetch_one($mysqli, $query, $params); // Realizando a query

            // Caso o funcionário já esteja cadastrado, ele retorna uma mensagem de erro e para a execução
            if ($result) { 
                echo json_encode("Funcionário já está cadastrado");
                exit();
            }

            // Inserindo as informações do funcionário no banco
            $query = "INSERT INTO funcionarios (nome, capacitacao, cpf, telefone) VALUES (?, ?, ?, ?)"; 
            $params = ["ssss", $nome, $capacitacao, $cpf, $telefone];

            Database::query($mysqli, $query, $params); // Realizando a query

            echo json_encode("Cadastro de funcionário realizado com sucesso");
            break;

            case "agendamento":
                foreach ($data as $key => $value) {
                    // Verificando se algum dos campos está vazio
                    if (!isset($value) || empty($value)) {
                        echo json_encode("Campo $key está vazio");
                        exit();
                    }
                }

                // Armazenando os dados do agendamento em variáveis
                $p_cpf = $data["p_cpf"];
                $f_cpf = $data["f_cpf"];
                $date = $data["date"];
                $time = $data["time"];

                // Conectando com o banco 
                $mysqli = Database::connect();

                // Resgatando o registro do funcionário
                $query = "SELECT * FROM funcionarios WHERE cpf = ?"; 
                $params = ["s", $f_cpf]; 

                $employee_result = Database::fetch_one($mysqli, $query, $params); // Realizando a query

                // Resgatando o registro do paciente
                $query = "SELECT * FROM pacientes WHERE cpf = ?"; 
                $params = ["s", $p_cpf]; 

                $patient_result = Database::fetch_one($mysqli, $query, $params); 
                
                // Verificando se o funcionário e o paciente estão cadastrados
                if (!$employee_result ) { 
                    echo json_encode("Funcionário não está cadastrado");
                    exit();
                }

                if (!$patient_result) { 
                    echo json_encode("Paciente não está cadastrado");
                    exit();
                }

                // Verificando se o horário do agendamento já está ocupado
                $query = "SELECT * FROM agendamentos WHERE id_funcionario = ? AND data = ? AND horario = ?";
                $params = ["iss", $employee_result["id_funcionario"], $date, $time];

                $schedule_result = Database::fetch_one($mysqli, $query, $params);

                // Verificando se o horário já está ocupado
                if ($schedule_result) {
                    echo json_encode("Horário do agendamento com o profissional já está ocupado");
                    exit();
                }

                // Pegando os IDs do funcionário e do paciente
                $query = "SELECT 
                cliente.id_cliente, funcionario.id_funcionario 
                FROM pacientes cliente, funcionarios funcionario 
                WHERE cliente.cpf = ? 
                AND funcionario.cpf = ?";

                $params = ["ss", $p_cpf, $f_cpf];

                $all_id = Database::fetch_all($mysqli, $query, $params); 

                // Separando cada ID 
                $patient_id = $all_id[0]["id_cliente"];
                $employee_id = $all_id[0]["id_funcionario"];

                // Inserindo as informações do agendamento no banco
                $query = "INSERT INTO agendamentos (id_cliente, id_funcionario, data, horario, status) VALUES (?, ?, ?, ?, ?)";
                $params = ["iisss", $patient_id, $employee_id, $date, $time, "Agendada"];

                Database::query($mysqli, $query, $params); 

                echo json_encode("Cadastro de agendamento realizado com sucesso");
            break;
    }


}

else {
    echo json_encode("Tipo de cadastro inválido");
}
