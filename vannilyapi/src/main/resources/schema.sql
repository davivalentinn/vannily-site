-- Criar database (opcional)
CREATE DATABASE IF NOT EXISTS vannilydb;
USE vannilydb;

-- =========================
-- TABELA: categoria
-- =========================
CREATE TABLE categoria (
    id INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- =========================
-- TABELA: produto
-- =========================
CREATE TABLE produto (
    id INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    imagem VARCHAR(500),
    preco DECIMAL(10,2) NOT NULL,
    desconto DECIMAL(10,2) DEFAULT 0,
    unidades INT DEFAULT 0,
    descricao TEXT,
    fornecedor VARCHAR(255),
    transportadora VARCHAR(255),
    id_categoria INT,
    tema VARCHAR(100),
    genero VARCHAR(100),

    FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);

-- =========================
-- TABELA: produto_jogo
-- =========================
CREATE TABLE produto_jogo (
    id INT PRIMARY KEY,
    id_produto INT NOT NULL,
    tema VARCHAR(100),
    genero VARCHAR(100),
    qtd_pessoas INT,
    classificacao_indicativa VARCHAR(50),
    duracao VARCHAR(50),
    tipo_baralho VARCHAR(100),
    tamanho_cartas VARCHAR(50),
    material_cartas VARCHAR(100),
    tipo_jogo VARCHAR(100),
    numero_cartas INT,
    ilustrado BOOLEAN,
    qtd_pecas INT,
    tamanho_tabuleiro VARCHAR(50),
    material_tabuleiro VARCHAR(100),
    tipo_tabuleiro VARCHAR(100),
    complexidade VARCHAR(50),
    possui_cartas BOOLEAN,

    FOREIGN KEY (id_produto) REFERENCES produto(id)
);

-- =========================
-- TABELA: usuario
-- =========================
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    usuario VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipoUsuario ENUM('ADMIN', 'USER') NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
);


-- =========================
-- TABELA: endereco
-- =========================
CREATE TABLE endereco (
    id INT PRIMARY KEY,
    id_usuario INT NOT NULL,
    cep VARCHAR(20),
    pais VARCHAR(100),
    estado VARCHAR(100),
    cidade VARCHAR(100),
    bairro VARCHAR(100),
    rua VARCHAR(255),
    numero VARCHAR(20),
    complemento VARCHAR(255),

    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

-- =========================
-- TABELA: produto_roupa
-- =========================
CREATE TABLE produto_roupa (
    id INT PRIMARY KEY,
    id_produto INT NOT NULL,
    tamanho VARCHAR(10),
    cor VARCHAR(50),
    dimensoes VARCHAR(50),
    numero_modelo VARCHAR(50),
    tipo_capuz BOOLEAN,
    espessura_tecido VARCHAR(50),
    material_forro VARCHAR(100),
    possui_ziper BOOLEAN,
    resistente_agua BOOLEAN,
    tipo_gola VARCHAR(50),
    tipo_manga VARCHAR(50),
    tecido VARCHAR(100),
    possui_bolsos BOOLEAN,
    estampa_personalizada BOOLEAN,
    modelo VARCHAR(100),

    FOREIGN KEY (id_produto) REFERENCES produto(id)
);
