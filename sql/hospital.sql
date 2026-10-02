CREATE SCHEMA hospital;

CREATE TABLE clientes(

id_cliente INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
telefone VARCHAR(20) NOT NULL,
email VARCHAR(100),
cpf VARCHAR(11) NOT NULL
);
INSERT INTO cliente(nome, telefone, email, cpf)
VALUES (?, ?, ?, ?);

CREATE TABLE funcionarios(
id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
capacitacao VARCHAR(10000) NOT NULL,
cpf VARCHAR(11) NOT NULL,
telefone VARCHAR(20)
);
INSERT INTO funcionarios(nome, capacitacao, cpf, telefone)
VALUES (?, ?, ?, ?);

CREATE TABLE agendamento(
id_agendamento INT PRIMARY KEY AUTO_INCREMENT,
id_client INT NOT NULL,
id_funcionario INT NOT NULL,
data_horai DATETIME NOT NULL,
data_horaf DATETIME NOT NULL,
status ENUM('Aprovado', 'Cancelado', 'Em andamento', 'Disponível') NOT NULL,

CONSTRAINT fk_cliente FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente),

CONSTRAINT fk_funcionarios FOREIGN KEY (id_funcionario)
REFERENCES funcionarios(id_funcionario)
);

CREATE TABLE historico(
id_historico INT PRIMARY KEY AUTO_INCREMENT
);