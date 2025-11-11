-- Categoria
INSERT INTO `categoria` (`id`, `nome`) VALUES
(1, 'Brinquedos'),
(2, 'Eletrônicos'),
(3, 'Roupas'),
(4, 'Alimentos'),
(5, 'Livros'),
(6, 'Esportes'),
(7, 'Beleza'),
(8, 'Móveis'),
(9, 'Informática'),
(10,'Saúde');

-- Produto (40 itens)
INSERT INTO `produto` (`id`, `nome`, `imagem`, `preco`, `desconto`, `unidades`, `descricao`, `fornecedor`, `transportadora`, `id_categoria`, `tema`, `genero`) VALUES
(1, 'Produto 1', 'https://example.com/img1.jpg', 50.0, 5.0, 100, 'Descrição Produto 1', 'Fornecedor A', 'Transportadora X', 1, 'Aventura', 'Infantil'),
(2, 'Produto 2', 'https://example.com/img2.jpg', 60.0, 0.0, 80, 'Descrição Produto 2', 'Fornecedor B', 'Transportadora Y', 2, 'Educação', 'Juvenil'),
(3, 'Produto 3', 'https://example.com/img3.jpg', 120.0, 15.0, 30, 'Descrição Produto 3', 'Fornecedor C', 'Transportadora Z', 1, 'Esportes', 'Adulto'),
(4, 'Produto 4', 'https://example.com/img4.jpg', 75.0, 10.0, 50, 'Descrição Produto 4', 'Fornecedor D', 'Transportadora X', 3, 'Aventura', 'Infantil'),
(5, 'Produto 5', 'https://example.com/img5.jpg', 90.0, 8.0, 60, 'Descrição Produto 5', 'Fornecedor E', 'Transportadora Y', 4, 'Educação', 'Juvenil'),
(6, 'Produto 6', 'https://example.com/img6.jpg', 40.0, 0.0, 100, 'Descrição Produto 6', 'Fornecedor F', 'Transportadora Z', 5, 'Esportes', 'Adulto'),
(7, 'Produto 7', 'https://example.com/img7.jpg', 110.0, 20.0, 25, 'Descrição Produto 7', 'Fornecedor G', 'Transportadora X', 6, 'Aventura', 'Infantil'),
(8, 'Produto 8', 'https://example.com/img8.jpg', 55.0, 5.0, 70, 'Descrição Produto 8', 'Fornecedor H', 'Transportadora Y', 7, 'Educação', 'Juvenil'),
(9, 'Produto 9', 'https://example.com/img9.jpg', 130.0, 12.0, 15, 'Descrição Produto 9', 'Fornecedor I', 'Transportadora Z', 8, 'Esportes', 'Adulto'),
(10,'Produto 10','https://example.com/img10.jpg',45.0, 0.0, 90, 'Descrição Produto 10', 'Fornecedor J', 'Transportadora X', 9, 'Aventura', 'Infantil'),
(11,'Produto 11','https://example.com/img11.jpg',80.0, 10.0, 60, 'Descrição Produto 11', 'Fornecedor K', 'Transportadora Y', 10,'Educação', 'Juvenil'),
(12,'Produto 12','https://example.com/img12.jpg',95.0, 5.0, 50, 'Descrição Produto 12', 'Fornecedor L', 'Transportadora Z', 1, 'Esportes', 'Adulto'),
(13,'Produto 13','https://example.com/img13.jpg',70.0, 0.0, 80, 'Descrição Produto 13', 'Fornecedor M', 'Transportadora X', 2, 'Aventura', 'Infantil'),
(14,'Produto 14','https://example.com/img14.jpg',150.0, 15.0, 20, 'Descrição Produto 14', 'Fornecedor N', 'Transportadora Y', 3, 'Educação', 'Juvenil'),
(15,'Produto 15','https://example.com/img15.jpg',65.0, 5.0, 70, 'Descrição Produto 15', 'Fornecedor O', 'Transportadora Z', 4, 'Esportes', 'Adulto'),
(16,'Produto 16','https://example.com/img16.jpg',85.0, 8.0, 60, 'Descrição Produto 16', 'Fornecedor P', 'Transportadora X', 5, 'Aventura', 'Infantil'),
(17,'Produto 17','https://example.com/img17.jpg',55.0, 0.0, 90, 'Descrição Produto 17', 'Fornecedor Q', 'Transportadora Y', 6, 'Educação', 'Juvenil'),
(18,'Produto 18','https://example.com/img18.jpg',120.0, 12.0, 30, 'Descrição Produto 18', 'Fornecedor R', 'Transportadora Z', 7, 'Esportes', 'Adulto'),
(19,'Produto 19','https://example.com/img19.jpg',50.0, 5.0, 100,'Descrição Produto 19', 'Fornecedor S', 'Transportadora X', 8, 'Aventura', 'Infantil'),
(20,'Produto 20','https://example.com/img20.jpg',75.0, 0.0, 80, 'Descrição Produto 20', 'Fornecedor T', 'Transportadora Y', 9, 'Educação', 'Juvenil'),
(21,'Produto 21','https://example.com/img21.jpg',60.0, 10.0, 70, 'Descrição Produto 21', 'Fornecedor U', 'Transportadora Z', 10,'Esportes', 'Adulto'),
(22,'Produto 22','https://example.com/img22.jpg',90.0, 8.0, 50, 'Descrição Produto 22', 'Fornecedor V', 'Transportadora X', 1, 'Aventura', 'Infantil'),
(23,'Produto 23','https://example.com/img23.jpg',55.0, 0.0, 60, 'Descrição Produto 23', 'Fornecedor W', 'Transportadora Y', 2, 'Educação', 'Juvenil'),
(24,'Produto 24','https://example.com/img24.jpg',130.0, 15.0, 20, 'Descrição Produto 24', 'Fornecedor X', 'Transportadora Z', 3, 'Esportes', 'Adulto'),
(25,'Produto 25','https://example.com/img25.jpg',45.0, 5.0, 90, 'Descrição Produto 25', 'Fornecedor Y', 'Transportadora X', 4, 'Aventura', 'Infantil'),
(26,'Produto 26','https://example.com/img26.jpg',85.0, 8.0, 50, 'Descrição Produto 26', 'Fornecedor Z', 'Transportadora Y', 5, 'Educação', 'Juvenil'),
(27,'Produto 27','https://example.com/img27.jpg',60.0, 0.0, 70, 'Descrição Produto 27', 'Fornecedor AA','Transportadora Z', 6, 'Esportes', 'Adulto'),
(28,'Produto 28','https://example.com/img28.jpg',95.0, 12.0, 30, 'Descrição Produto 28', 'Fornecedor BB','Transportadora X', 7, 'Aventura', 'Infantil'),
(29,'Produto 29','https://example.com/img29.jpg',50.0, 5.0, 80, 'Descrição Produto 29', 'Fornecedor CC','Transportadora Y', 8, 'Educação', 'Juvenil'),
(30,'Produto 30','https://example.com/img30.jpg',120.0, 15.0, 25, 'Descrição Produto 30', 'Fornecedor DD','Transportadora Z', 9, 'Esportes', 'Adulto'),
(31,'Produto 31','https://example.com/img31.jpg',55.0, 0.0, 90, 'Descrição Produto 31', 'Fornecedor EE','Transportadora X', 10,'Aventura', 'Infantil'),
(32,'Produto 32','https://example.com/img32.jpg',75.0, 5.0, 60, 'Descrição Produto 32', 'Fornecedor FF','Transportadora Y', 1, 'Educação', 'Juvenil'),
(33,'Produto 33','https://example.com/img33.jpg',85.0, 8.0, 50, 'Descrição Produto 33', 'Fornecedor GG','Transportadora Z', 2, 'Esportes', 'Adulto'),
(34,'Produto 34','https://example.com/img34.jpg',40.0, 0.0, 100,'Descrição Produto 34', 'Fornecedor HH','Transportadora X', 3, 'Aventura', 'Infantil'),
(35,'Produto 35','https://example.com/img35.jpg',110.0, 20.0, 30, 'Descrição Produto 35', 'Fornecedor II','Transportadora Y', 4, 'Educação', 'Juvenil'),
(36,'Produto 36','https://example.com/img36.jpg',65.0, 5.0, 70, 'Descrição Produto 36', 'Fornecedor JJ','Transportadora Z', 5, 'Esportes', 'Adulto'),
(37,'Produto 37','https://example.com/img37.jpg',90.0, 10.0, 50, 'Descrição Produto 37', 'Fornecedor KK','Transportadora X', 6, 'Aventura', 'Infantil'),
(38,'Produto 38','https://example.com/img38.jpg',55.0, 0.0, 80, 'Descrição Produto 38', 'Fornecedor LL','Transportadora Y', 7, 'Educação', 'Juvenil'),
(39,'Produto 39','https://example.com/img39.jpg',120.0, 15.0, 25, 'Descrição Produto 39', 'Fornecedor MM','Transportadora Z', 8, 'Esportes', 'Adulto'),
(40,'Produto 40','https://example.com/img40.jpg',50.0, 5.0, 100,'Descrição Produto 40', 'Fornecedor NN','Transportadora X', 9, 'Aventura', 'Infantil');

-- ProdutoJogo (40 itens)
INSERT INTO `produto_jogo` 
(`id`, `id_produto`, `tema`, `genero`, `qtd_pessoas`, `classificacao_indicativa`, `duracao`, `tipo_baralho`, `tamanho_cartas`, `material_cartas`, `tipo_jogo`, `numero_cartas`, `ilustrado`, `qtd_pecas`, `tamanho_tabuleiro`, `material_tabuleiro`, `tipo_tabuleiro`, `complexidade`, `possui_cartas`)
VALUES
(1, 1, 'Aventura', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Tabuleiro', 30, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(2, 2, 'Educação', 'Juvenil', 4, '10+', '45min', 'Cartas', 'Médio', 'Plástico', 'Cartas', 40, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(3, 3, 'Esportes', 'Adulto', 3, '12+', '50min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 50, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(4, 4, 'Aventura', 'Infantil', 2, 'Livre', '35min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 25, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(5, 5, 'Educação', 'Juvenil', 3, '10+', '40min', 'Cartas', 'Médio', 'Plástico', 'Tabuleiro', 35, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(6, 6, 'Esportes', 'Adulto', 4, '12+', '60min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 60, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(7, 7, 'Aventura', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 30, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(8, 8, 'Educação', 'Juvenil', 3, '10+', '45min', 'Cartas', 'Médio', 'Plástico', 'Cartas', 40, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(9, 9, 'Esportes', 'Adulto', 2, '12+', '55min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 55, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(10, 10, 'Aventura', 'Infantil', 2, 'Livre', '25min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 20, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(11, 11, 'Educação', 'Juvenil', 4, '10+', '50min', 'Cartas', 'Médio', 'Plástico', 'Tabuleiro', 45, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(12, 12, 'Esportes', 'Adulto', 3, '12+', '60min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 50, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(13, 13, 'Aventura', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 28, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(14, 14, 'Educação', 'Juvenil', 3, '10+', '45min', 'Cartas', 'Médio', 'Plástico', 'Tabuleiro', 40, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(15, 15, 'Esportes', 'Adulto', 4, '12+', '55min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 55, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(16, 16, 'Aventura', 'Infantil', 2, 'Livre', '35min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 30, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(17, 17, 'Educação', 'Juvenil', 3, '10+', '40min', 'Cartas', 'Médio', 'Plástico', 'Cartas', 35, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(18, 18, 'Esportes', 'Adulto', 4, '12+', '60min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 60, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(19, 19, 'Aventura', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 25, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(20, 20, 'Educação', 'Juvenil', 3, '10+', '45min', 'Cartas', 'Médio', 'Plástico', 'Tabuleiro', 40, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(21, 21, 'Esportes', 'Adulto', 2, '12+', '50min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 50, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(22, 22, 'Aventura', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 30, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(23, 23, 'Educação', 'Juvenil', 3, '10+', '45min', 'Cartas', 'Médio', 'Plástico', 'Cartas', 40, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(24, 24, 'Esportes', 'Adulto', 4, '12+', '60min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 60, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(25, 25, 'Aventura', 'Infantil', 2, 'Livre', '25min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 20, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(26, 26, 'Educação', 'Juvenil', 3, '10+', '45min', 'Cartas', 'Médio', 'Plástico', 'Tabuleiro', 35, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(27, 27, 'Esportes', 'Adulto', 4, '12+', '55min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 55, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(28, 28, 'Aventura', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 30, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(29, 29, 'Educação', 'Juvenil', 3, '10+', '45min', 'Cartas', 'Médio', 'Plástico', 'Tabuleiro', 40, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(30, 30, 'Esportes', 'Adulto', 4, '12+', '60min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 60, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(31, 31, 'Aventura', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 25, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(32, 32, 'Educação', 'Juvenil', 3, '10+', '45min', 'Cartas', 'Médio', 'Plástico', 'Tabuleiro', 40, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(33, 33, 'Esportes', 'Adulto', 4, '12+', '60min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 55, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(34, 34, 'Aventura', 'Infantil', 2, 'Livre', '25min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 20, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(35, 35, 'Educação', 'Juvenil', 3, '10+', '45min', 'Cartas', 'Médio', 'Plástico', 'Tabuleiro', 35, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(36, 36, 'Esportes', 'Adulto', 4, '12+', '55min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 50, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(37, 37, 'Aventura', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 30, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(38, 38, 'Educação', 'Juvenil', 3, '10+', '45min', 'Cartas', 'Médio', 'Plástico', 'Tabuleiro', 40, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(39, 39, 'Esportes', 'Adulto', 4, '12+', '60min', 'Cartas', 'Grande', 'Plástico', 'Tabuleiro', 60, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(40, 40, 'Aventura', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 25, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE);

-- Usuário
INSERT INTO usuario (nome, numero_telefone, email, usuario, senha, tipo_usuario, data_criacao) VALUES
('Administrador do Sistema', '11999990000', 'admin@vannily.com', 'admin', 'admin123', 'ADMIN', NOW()),
('Elyvan Teste', '11988887777', 'elyvan@vannily.com', 'elyvan', 'senha123', 'USER', NOW()),
('Cliente Demo', '11977776666', 'cliente@vannily.com', 'cliente', 'cliente123', 'USER', NOW());



-- Endereço
INSERT INTO `endereco` (`id`, `id_usuario`, `cep`, `pais`, `estado`, `cidade`, `bairro`, `rua`, `numero`, `complemento`) VALUES
(1, 1, '69900-000', 'Brasil', 'Acre', 'Rio Branco', 'Santa Inês', 'Rua das Flores', '123', 'Apto 101'),
(2, 2, '69900-001', 'Brasil', 'Acre', 'Rio Branco', 'Bosque', 'Rua das Palmeiras', '45', NULL),
(3, 3, '69900-002', 'Brasil', 'Acre', 'Rio Branco', 'Centro', 'Av. Sete de Setembro', '789', 'Casa');

-- ProdutoRoupa (20 itens)
INSERT INTO `produto_roupa` (`id`, `id_produto`, `tamanho`, `cor`, `dimensoes`, `numero_modelo`, `tipo_capuz`, `espessura_tecido`, `material_forro`, `possui_ziper`, `resistente_agua`, `tipo_gola`, `tipo_manga`, `tecido`, `possui_bolsos`, `estampa_personalizada`, `modelo`) VALUES
(1, 1, 'P', 'Azul', '90x45', 'M101', TRUE, 'Fino', 'Poliéster', TRUE, TRUE, 'Redonda', 'Curta', 'Algodão', TRUE, FALSE, 'Casual'),
(2, 2, 'M', 'Preto', '100x50', 'M102', FALSE, 'Médio', 'Algodão', FALSE, FALSE, 'V', 'Longa', 'Malha', FALSE, TRUE, 'Esportivo'),
(3, 3, 'G', 'Vermelho', '110x55', 'M103', TRUE, 'Grossa', 'Poliéster', TRUE, FALSE, 'Gola Alta', 'Curta', 'Moletom', TRUE, TRUE, 'Inverno'),
(4, 4, 'P', 'Verde', '90x45', 'M104', FALSE, 'Fino', 'Algodão', FALSE, TRUE, 'Redonda', 'Curta', 'Algodão', TRUE, FALSE, 'Casual'),
(5, 5, 'M', 'Cinza', '100x50', 'M105', TRUE, 'Médio', 'Poliéster', TRUE, TRUE, 'V', 'Longa', 'Malha', TRUE, TRUE, 'Esportivo'),
(6, 6, 'G', 'Amarelo', '110x55', 'M106', FALSE, 'Grossa', 'Algodão', FALSE, FALSE, 'Gola Alta', 'Curta', 'Moletom', FALSE, FALSE, 'Inverno'),
(7, 7, 'P', 'Roxo', '90x45', 'M107', TRUE, 'Fino', 'Poliéster', TRUE, TRUE, 'Redonda', 'Longa', 'Algodão', TRUE, TRUE, 'Casual'),
(8, 8, 'M', 'Branco', '100x50', 'M108', FALSE, 'Médio', 'Malha', FALSE, TRUE, 'V', 'Curta', 'Malha', FALSE, FALSE, 'Esportivo'),
(9, 9, 'G', 'Preto', '110x55', 'M109', TRUE, 'Grossa', 'Poliéster', TRUE, TRUE, 'Gola Alta', 'Longa', 'Moletom', TRUE, TRUE, 'Inverno'),
(10, 10, 'P', 'Azul Claro', '90x45', 'M110', FALSE, 'Fino', 'Algodão', FALSE, FALSE, 'Redonda', 'Curta', 'Algodão', TRUE, FALSE, 'Casual'),
(11, 11, 'M', 'Verde Escuro', '100x50', 'M111', TRUE, 'Médio', 'Poliéster', TRUE, TRUE, 'V', 'Longa', 'Malha', TRUE, TRUE, 'Esportivo'),
(12, 12, 'G', 'Laranja', '110x55', 'M112', FALSE, 'Grossa', 'Algodão', FALSE, FALSE, 'Gola Alta', 'Curta', 'Moletom', FALSE, FALSE, 'Inverno'),
(13, 13, 'P', 'Rosa', '90x45', 'M113', TRUE, 'Fino', 'Poliéster', TRUE, TRUE, 'Redonda', 'Longa', 'Algodão', TRUE, TRUE, 'Casual'),
(14, 14, 'M', 'Cinza Claro', '100x50', 'M114', FALSE, 'Médio', 'Malha', FALSE, TRUE, 'V', 'Curta', 'Malha', FALSE, FALSE, 'Esportivo'),
(15, 15, 'G', 'Marrom', '110x55', 'M115', TRUE, 'Grossa', 'Poliéster', TRUE, TRUE, 'Gola Alta', 'Longa', 'Moletom', TRUE, TRUE, 'Inverno'),
(16, 16, 'P', 'Preto e Branco', '90x45', 'M116', FALSE, 'Fino', 'Algodão', FALSE, FALSE, 'Redonda', 'Curta', 'Algodão', TRUE, FALSE, 'Casual'),
(17, 17, 'M', 'Azul Marinho', '100x50', 'M117', TRUE, 'Médio', 'Poliéster', TRUE, TRUE, 'V', 'Longa', 'Malha', TRUE, TRUE, 'Esportivo'),
(18, 18, 'G', 'Amarelo Claro', '110x55', 'M118', FALSE, 'Grossa', 'Algodão', FALSE, FALSE, 'Gola Alta', 'Curta', 'Moletom', FALSE, FALSE, 'Inverno'),
(19, 19, 'P', 'Verde Claro', '90x45', 'M119', TRUE, 'Fino', 'Poliéster', TRUE, TRUE, 'Redonda', 'Longa', 'Algodão', TRUE, TRUE, 'Casual'),
(20, 20, 'M', 'Vermelho Escuro', '100x50', 'M120', FALSE, 'Médio', 'Malha', FALSE, TRUE, 'V', 'Curta', 'Malha', FALSE, FALSE, 'Esportivo');

