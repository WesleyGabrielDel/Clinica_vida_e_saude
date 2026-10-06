<?php

function get_data() {
    // Pega os dados enviados via POST
    $data = json_decode(file_get_contents("php://input"), true);

    // Verificando a validade dos dados recebidos
    if (!isset($data) || empty($data)) {
        echo json_encode("Nenhum dado enviado");
        exit();
    }

    return $data;
}