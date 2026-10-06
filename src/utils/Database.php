<?php

class Database {

    public static function connect() {
        // Informações do banco de dados
        $host = "localhost"; 
        $username = "root"; 
        $password = ""; 
        $name = "clinica_vida_saude"; 

        try {
            // Tenta fazer a conexão com o banco de dados
            $mysqli = new mysqli($host, $username, $password, $name);
        }

        catch (Exception $e) {
            // Caso der erro, para a execução e manda a mensagem de erro
            echo json_encode("Erro ao conectar ao banco: " . $e->getMessage());
            exit();
        }

        // Retorna o objeto de conexão com o banco de dados
        return $mysqli;
    }

    // Função para ser usada quando a querie não retorna nada, por exempl: DELETE, INSERT e UPDATE
    public static function query(mysqli $mysqli, string $query, array $params) {
        $stmt = $mysqli->prepare($query); // Prepara a query do banco

        // Caso a preparação der erro, ele para a execução e retorna o erro.
        if ($stmt === false) {
            echo json_encode("Erro ao preparar a query: " . $mysqli->error);
            exit();
        }

        if ($params) {
            $stmt->bind_param(...$params); // Faz o bind dos ? na querie para os parâmetros passados
        }

        // Executa a query e trata erros
        if (!$stmt->execute()) { 
            echo json_encode("Erro ao executar a query: " . $mysqli->error);
            exit();
        }
    }

    // Função para ser usada quando a querie deve retornar apenas um registro
    public static function fetch_one(mysqli $mysqli, string $query, array $params) {
        // Prof, aqui eu usei o mysqli pra fazer as queries do banco.
        $stmt = $mysqli->prepare($query); // Prepara a query do banco

        // Caso a preparação der erro, ele para a execução e retorna o erro.
        if ($stmt === false) {
            echo json_encode("Erro ao preparar a query: " . $mysqli->error);
            exit();
        }

        if ($params) {
            $stmt->bind_param(...$params); // Faz o bind dos ? na querie para os parâmetros passados
        }
        
        // Executa a query e trata erros
        if (!$stmt->execute()) { 
            echo json_encode("Erro ao executar a query: " . $mysqli->error);
            exit();
        }

        $result = $stmt->get_result(); // Pega o resultado
        return $result->fetch_assoc(); // Retorna o resultado em um array
    }

    // Função para ser usada quando a querie deve retornar vários registros
    public static function fetch_all(mysqli $mysqli, string $query, array $params) {
        $stmt = $mysqli->prepare($query); // Prepara a query do banco

        // Caso a preparação der erro, ele para a execução e retorna o erro.
        if ($stmt === false) {
            echo json_encode("Erro ao preparar a query: " . $mysqli->error);
            exit();
        }

        if ($params) {
            $stmt->bind_param(...$params); // Faz o bind dos ? na querie para os parâmetros passados
        }
        
        // Executa a query e trata erros
        if (!$stmt->execute()) { 
            echo json_encode("Erro ao executar a query: " . $mysqli->error);
            exit();
        }

        $result = $stmt->get_result(); // Pega o resultado
        return $result->fetch_all(MYSQLI_ASSOC); // Retorna o resultado em um array
    }
}