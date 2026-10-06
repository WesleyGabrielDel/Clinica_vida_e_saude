<?php

use function PHPSTORM_META\type;

require_once "../utils/Database.php";
require_once "../utils/_utils.php";

$data = get_data(); // Pegando os dados enviados via POST
$type = $data["tipo"]; // Pegando o tipo de cadastro

if (isset($type) && !empty($type)) {
    switch($type) {
        case "pacientes":
            $mysqli = Database::connect(); 

            /* 
                Retorna todos os registros dos pacientes e retorna um booleano 
                se o paciente tem seu id na tabela de agendamentos, no que 
                implicaria que ele tem um agendamento. Esta informação será 
                retornada com o nome tem_agendamento 
            */

            $query = "SELECT pacientes.*,
                EXISTS (SELECT 1 FROM agendamentos WHERE agendamentos.id_cliente = pacientes.id_cliente) AS tem_agendamento
                FROM pacientes";
                
            $result = Database::fetch_all($mysqli, $query, []);

            echo json_encode($result);
        break;

        case "funcionarios":
            $mysqli = Database::connect();

            // Pega todos os registros dos funcionários e adiciona sua quantidade de agendamentos
            $query = "SELECT funcionarios.*,
                (SELECT COUNT(*)
                FROM agendamentos
                WHERE agendamentos.id_funcionario = funcionarios.id_funcionario) AS qnt_atendimentos
                FROM funcionarios";

            $result = Database::fetch_all($mysqli, $query, []);

            echo json_encode($result);

        break;

        case "agendamentos":
            $mysqli = Database::connect();

            // Pega todos os agendamentos e retorna junto com eles o nome do paciente e o nome do funcionário, relacionando as tabelas com left join
            $query = "SELECT agendamentos.*, pacientes.nome AS p_nome,
            funcionarios.nome AS f_nome
            FROM agendamentos
            LEFT JOIN pacientes ON pacientes.id_cliente = agendamentos.id_cliente
            LEFT JOIN funcionarios ON funcionarios.id_funcionario = agendamentos.id_funcionario";

            $result = Database::fetch_all($mysqli, $query, []);

            echo json_encode($result);

        break;
    }

}

else {
    echo json_encode("Tipo de cadastro inválido");
}