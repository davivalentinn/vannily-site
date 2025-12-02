-- Categoria
INSERT INTO `categoria` (`id`, `nome`) VALUES
(1, 'Jogos de Tabuleiro'),
(2, 'Jogos de Cartas'),
(3, 'Roupas');

-- Produto (40 itens: 20 Jogos de Tabuleiro, 20 Jogos de Cartas)
INSERT INTO `produto` (`id`, `nome`, `imagem`, `preco`, `desconto`, `unidades`, `descricao`, `fornecedor`, `transportadora`, `id_categoria`, `tema`, `genero`) VALUES

-- Jogos de Tabuleiro
(1, 'Catan', '/produtos/catan.jpg', 250.00, 0.0, 35, 'Jogo de estratégia e comércio.', 'Kosmos', 'Transportadora A', 1, 'Estratégia', 'Adulto'),
(2, 'Ticket to Ride', '/produtos/ticket_to_ride.jpg', 300.00, 10.0, 30, 'Construa rotas de trem pelo mundo.', 'Days of Wonder', 'Transportadora B', 1, 'Estratégia', 'Adulto'),
(3, 'Monopoly Deluxe', '/produtos/monopoly.jpg', 180.00, 0.0, 50, 'Compre e venda propriedades no clássico Monopoly.', 'Hasbro', 'Transportadora C', 1, 'Família', 'Infantil'),
(4, 'Carcassonne', '/produtos/carcassonne.jpg', 200.00, 5.0, 40, 'Jogo de colocação de peças e controle de cidades.', 'Hans im Glück', 'Transportadora A', 1, 'Estratégia', 'Adulto'),
(5, 'Pandemic', '/produtos/pandemic.jpg', 220.00, 0.0, 25, 'Jogo cooperativo de salvar o mundo de doenças.', 'Z-Man Games', 'Transportadora B', 1, 'Cooperativo', 'Adulto'),
(6, 'Terraforming Mars', '/produtos/terraforming_mars.jpg', 280.00, 15.0, 20, 'Transforme Marte em um planeta habitável.', 'FryxGames', 'Transportadora C', 1, 'Estratégia', 'Adulto'),
(7, 'Azul', '/produtos/azul.jpg', 190.00, 0.0, 35, 'Jogo de estratégia com mosaicos.', 'Next Move Games', 'Transportadora A', 1, 'Estratégia', 'Adulto'),
(8, 'Splendor', '/produtos/splendor.jpg', 160.00, 0.0, 40, 'Colete gemas e compre cartas de desenvolvimento.', 'Space Cowboys', 'Transportadora B', 1, 'Estratégia', 'Adulto'),
(9, '7 Wonders', '/produtos/7wonders.jpg', 230.00, 10.0, 25, 'Construa uma civilização ao longo de eras.', 'Repos Production', 'Transportadora C', 1, 'Estratégia', 'Adulto'),
(10, 'Terraforming Mars: Ares Expedition', '/produtos/ares_expedition.jpg', 270.00, 0.0, 20, 'Versão simplificada de Terraforming Mars.', 'FryxGames', 'Transportadora A', 1, 'Estratégia', 'Adulto'),
(11, 'Terraforming Mars: Prelude', '/produtos/prelude.jpg', 290.00, 5.0, 15, 'Expansão para Terraforming Mars.', 'FryxGames', 'Transportadora B', 1, 'Estratégia', 'Adulto'),
(12, 'Wingspan', '/produtos/wingspan.jpg', 240.00, 0.0, 20, 'Jogo de pássaros e habitats.', 'Stonemaier Games', 'Transportadora C', 1, 'Estratégia', 'Adulto'),
(13, 'Kingdomino', '/produtos/kingdomino.jpg', 150.00, 0.0, 35, 'Jogo rápido de dominós para família.', 'Blue Orange Games', 'Transportadora A', 1, 'Família', 'Infantil'),
(14, 'Patchwork', '/produtos/patchwork.jpg', 140.00, 0.0, 30, 'Jogo de estratégia para dois jogadores.', 'Lookout Games', 'Transportadora B', 1, 'Estratégia', 'Adulto'),
(15, 'Azul: Summer Pavilion', '/produtos/azul_summer.jpg', 200.00, 0.0, 25, 'Expansão para Azul.', 'Next Move Games', 'Transportadora C', 1, 'Estratégia', 'Adulto'),
(16, 'Viticulture', '/produtos/viticulture.jpg', 250.00, 0.0, 20, 'Gerencie vinhedos e produza vinho.', 'Stonemaier Games', 'Transportadora A', 1, 'Estratégia', 'Adulto'),
(17, 'Agricola', '/produtos/agricola.jpg', 260.00, 0.0, 20, 'Jogo de agricultura e gestão de recursos.', 'Lookout Games', 'Transportadora B', 1, 'Estratégia', 'Adulto'),
(18, 'Power Grid', '/produtos/powergrid.jpg', 270.00, 0.0, 20, 'Gerencie usinas e energia.', 'Rio Grande Games', 'Transportadora C', 1, 'Estratégia', 'Adulto'),
(19, 'Scythe', '/produtos/scythe.jpg', 300.00, 15.0, 15, 'Jogo de estratégia em um universo alternativo.', 'Stonemaier Games', 'Transportadora A', 1, 'Estratégia', 'Adulto'),
(20, 'Terraforming Mars: Turmoil', '/produtos/turmoil.jpg', 320.00, 0.0, 15, 'Expansão Terraforming Mars.', 'FryxGames', 'Transportadora B', 1, 'Estratégia', 'Adulto'),

-- Jogos de Cartas
(21, 'Magic: The Gathering', '/produtos/mtg.jpg', 120.00, 0.0, 50, 'Jogo de cartas colecionáveis.', 'Wizards of the Coast', 'Transportadora A', 2, 'Estratégia', 'Adulto'),
(22, 'Pokémon TCG', '/produtos/pokemon_tcg.jpg', 100.00, 0.0, 60, 'Jogo de cartas Pokémon.', 'The Pokémon Company', 'Transportadora B', 2, 'Estratégia', 'Infantil'),
(23, 'Yu-Gi-Oh! TCG', '/produtos/yugioh.jpg', 110.00, 0.0, 40, 'Jogo de cartas colecionáveis.', 'Konami', 'Transportadora C', 2, 'Estratégia', 'Infantil'),
(24, 'UNO', '/produtos/uno.jpg', 50.00, 0.0, 100, 'Jogo de cartas simples e divertido.', 'Mattel', 'Transportadora A', 2, 'Família', 'Infantil'),
(25, 'Exploding Kittens', '/produtos/exploding_kittens.jpg', 60.00, 0.0, 80, 'Jogo de cartas divertido e rápido.', 'Exploding Kittens LLC', 'Transportadora B', 2, 'Família', 'Infantil'),
(26, 'Hearthstone', '/produtos/hearthstone.jpg', 130.00, 0.0, 30, 'Jogo digital de cartas competitivo.', 'Blizzard', 'Transportadora C', 2, 'Estratégia', 'Adulto'),
(27, 'Gwent', '/produtos/gwent.jpg', 120.00, 0.0, 40, 'Jogo de cartas inspirado em The Witcher.', 'CD Projekt', 'Transportadora A', 2, 'Estratégia', 'Adulto'),
(28, 'KeyForge', '/produtos/keyforge.jpg', 100.00, 0.0, 35, 'Jogo de cartas único por deck.', 'Fantasy Flight Games', 'Transportadora B', 2, 'Estratégia', 'Adulto'),
(29, 'Dominion', '/produtos/dominion.jpg', 150.00, 0.0, 25, 'Jogo de construção de deck.', 'Rio Grande Games', 'Transportadora C', 2, 'Estratégia', 'Adulto'),
(30, '7 Wonders: Duel', '/produtos/7wonders_duel.jpg', 140.00, 0.0, 30, 'Versão de 2 jogadores de 7 Wonders.', 'Repos Production', 'Transportadora A', 2, 'Estratégia', 'Adulto'),
(31, 'Legend of the Five Rings', '/produtos/l5r.jpg', 130.00, 0.0, 20, 'Jogo de cartas colecionáveis.', 'Fantasy Flight Games', 'Transportadora B', 2, 'Estratégia', 'Adulto'),
(32, 'Ashes: Rise of the Phoenixborn', '/produtos/ashes.jpg', 120.00, 0.0, 20, 'Jogo de cartas estratégico.', 'Plaid Hat Games', 'Transportadora C', 2, 'Estratégia', 'Adulto'),
(33, 'Star Realms', '/produtos/star_realms.jpg', 100.00, 0.0, 25, 'Jogo de construção de deck espacial.', 'Wise Wizard Games', 'Transportadora A', 2, 'Estratégia', 'Adulto'),
(34, 'Marvel Champions', '/produtos/marvel_champions.jpg', 150.00, 0.0, 15, 'Jogo cooperativo de cartas.', 'Fantasy Flight Games', 'Transportadora B', 2, 'Cooperativo', 'Adulto'),
(35, 'Arkham Horror: The Card Game', '/produtos/arkham.jpg', 200.00, 0.0, 15, 'Jogo cooperativo de cartas e investigação.', 'Fantasy Flight Games', 'Transportadora C', 2, 'Cooperativo', 'Adulto'),
(36, 'Sentinels of the Multiverse', '/produtos/sentinels.jpg', 180.00, 0.0, 20, 'Jogo cooperativo de cartas.', 'Greater Than Games', 'Transportadora A', 2, 'Cooperativo', 'Adulto'),
(37, 'Legendary Marvel', '/produtos/legendary.jpg', 150.00, 0.0, 25, 'Jogo de cartas colecionáveis.', 'Upper Deck', 'Transportadora B', 2, 'Estratégia', 'Adulto'),
(38, 'Dragon Ball Super TCG', '/produtos/dbs.jpg', 100.00, 0.0, 30, 'Jogo de cartas colecionáveis.', 'Bandai', 'Transportadora C', 2, 'Estratégia', 'Infantil'),
(39, 'Force of Will', '/produtos/fow.jpg', 120.00, 0.0, 25, 'Jogo de cartas estratégico.', 'Force of Will Co.', 'Transportadora A', 2, 'Estratégia', 'Adulto'),
(40, 'Legend of the Five Rings: Roleplay', '/produtos/l5r_rpg.jpg', 130.00, 0.0, 20, 'Jogo de cartas narrativo.', 'Fantasy Flight Games', 'Transportadora B', 2, 'Estratégia', 'Adulto'),

-- Roupas (20 itens)
(41, 'Camiseta Classic Preta', '/produtos/camiseta_preta.jpg', 59.90, 0.0, 80, 'Camiseta básica de algodão.', 'Vannily Wear', 'Transportadora A', 3, 'Casual', 'Unissex'),
(42, 'Camiseta Premium Branca', '/produtos/camiseta_branca.jpg', 69.90, 0.0, 70, 'Camiseta premium macia.', 'Vannily Wear', 'Transportadora B', 3, 'Casual', 'Masculino'),
(43, 'Camiseta Floral Feminina', '/produtos/camiseta_floral.jpg', 79.90, 0.0, 60, 'Camiseta com estampa floral.', 'Vannily Wear', 'Transportadora C', 3, 'Casual', 'Feminino'),
(44, 'Moletom Cinza Hoodie', '/produtos/moletom_cinza.jpg', 149.90, 10.0, 50, 'Moletom unissex com capuz.', 'Vannily Urban', 'Transportadora A', 3, 'Streetwear', 'Unissex'),
(45, 'Moletom Azul Oversized', '/produtos/moletom_azul.jpg', 159.90, 0.0, 40, 'Moletom oversized azul.', 'Vannily Urban', 'Transportadora B', 3, 'Streetwear', 'Masculino'),
(46, 'Moletom Feminino Vermelho', '/produtos/moletom_vermelho.jpg', 149.90, 5.0, 45, 'Moletom slim feminino.', 'Vannily Urban', 'Transportadora C', 3, 'Streetwear', 'Feminino'),
(47, 'Calça Jeans Regular', '/produtos/calca_jeans_regular.jpg', 129.90, 0.0, 55, 'Calça jeans regular fit.', 'Vannily Denim', 'Transportadora A', 3, 'Casual', 'Masculino'),
(48, 'Calça Jeans Skinny Feminina', '/produtos/calca_jeans_skinny.jpg', 139.90, 0.0, 50, 'Calça jeans skinny feminina.', 'Vannily Denim', 'Transportadora B', 3, 'Casual', 'Feminino'),
(49, 'Calça Moletom Jogger', '/produtos/calca_jogger.jpg', 119.90, 0.0, 65, 'Calça jogger unissex.', 'Vannily Sport', 'Transportadora C', 3, 'Esportivo', 'Unissex'),
(50, 'Shorts Esportivo Preto', '/produtos/shorts_preto.jpg', 79.90, 0.0, 70, 'Shorts esportivo leve.', 'Vannily Sport', 'Transportadora A', 3, 'Esportivo', 'Unissex'),
(51, 'Vestido Floral Vermelho', '/produtos/vestido_vermelho.jpg', 159.90, 0.0, 40, 'Vestido feminino floral longo.', 'Vannily Fashion', 'Transportadora B', 3, 'Casual', 'Feminino'),
(52, 'Vestido Azul Casual', '/produtos/vestido_azul.jpg', 149.90, 0.0, 35, 'Vestido azul médio.', 'Vannily Fashion', 'Transportadora C', 3, 'Casual', 'Feminino'),
(53, 'Jaqueta Corta-Vento Preta', '/produtos/jaqueta_preta.jpg', 199.90, 0.0, 25, 'Jaqueta leve corta-vento.', 'Vannily Urban', 'Transportadora A', 3, 'Streetwear', 'Masculino'),
(54, 'Jaqueta Jeans Unissex', '/produtos/jaqueta_jeans.jpg', 189.90, 0.0, 30, 'Jaqueta jeans tradicional.', 'Vannily Denim', 'Transportadora B', 3, 'Casual', 'Unissex'),
(55, 'Blusa Rosa Feminina', '/produtos/blusa_rosa.jpg', 69.90, 0.0, 60, 'Blusa feminina rosa clara.', 'Vannily Wear', 'Transportadora C', 3, 'Casual', 'Feminino'),
(56, 'Blusa Branca Estampada', '/produtos/blusa_estampada.jpg', 79.90, 10.0, 55, 'Blusa estampada feminina.', 'Vannily Wear', 'Transportadora A', 3, 'Casual', 'Feminino'),
(57, 'Camisa Polo Verde Masculina', '/produtos/polo_verde.jpg', 99.90, 0.0, 45, 'Camisa polo clássica verde.', 'Vannily Wear', 'Transportadora B', 3, 'Casual', 'Masculino'),
(58, 'Camisa Polo Azul Masculina', '/produtos/polo_azul.jpg', 109.90, 5.0, 40, 'Camisa polo premium azul.', 'Vannily Wear', 'Transportadora C', 3, 'Casual', 'Masculino'),
(59, 'Camiseta Cinza Wide Fit', '/produtos/camiseta_cinza.jpg', 69.90, 0.0, 65, 'Camiseta wide fit cinza.', 'Vannily Wear', 'Transportadora A', 3, 'Casual', 'Masculino'),
(60, 'Camiseta Dry Fit Branca', '/produtos/camiseta_dryfit.jpg', 89.90, 0.0, 70, 'Camiseta dry fit para treino.', 'Vannily Sport', 'Transportadora B', 3, 'Esportivo', 'Unissex');
-- ProdutoJogo (40 itens)
INSERT INTO `produto_jogo` 
(`id`, `id_produto`, `tema`, `genero`, `qtd_pessoas`, `classificacao_indicativa`, `duracao`, `tipo_baralho`, `tamanho_cartas`, `material_cartas`, `tipo_jogo`, `numero_cartas`, `ilustrado`, `qtd_pecas`, `tamanho_tabuleiro`, `material_tabuleiro`, `tipo_tabuleiro`, `complexidade`, `possui_cartas`)
VALUES
-- Jogos de Tabuleiro (id 1 a 20)
(1, 1, 'Estratégia', 'Adulto', 3, '12+', '90min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 50, 'Grande', 'Cartão', 'Modular', 'Médio', FALSE),
(2, 2, 'Estratégia', 'Adulto', 2, '10+', '60min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 45, 'Grande', 'Cartão', 'Fixo', 'Fácil', FALSE),
(3, 3, 'Família', 'Infantil', 2, 'Livre', '120min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 60, 'Grande', 'Plástico', 'Fixo', 'Fácil', FALSE),
(4, 4, 'Estratégia', 'Adulto', 4, '12+', '45min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 35, 'Médio', 'Cartão', 'Modular', 'Médio', FALSE),
(5, 5, 'Cooperativo', 'Adulto', 2, '10+', '60min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 40, 'Grande', 'Cartão', 'Fixo', 'Médio', FALSE),
(6, 6, 'Estratégia', 'Adulto', 1, '12+', '120min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 50, 'Grande', 'Cartão', 'Modular', 'Difícil', FALSE),
(7, 7, 'Estratégia', 'Adulto', 2, '10+', '45min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 40, 'Médio', 'Cartão', 'Fixo', 'Fácil', FALSE),
(8, 8, 'Estratégia', 'Adulto', 2, '12+', '30min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 35, 'Pequeno', 'Cartão', 'Fixo', 'Fácil', FALSE),
(9, 9, 'Estratégia', 'Adulto', 3, '12+', '60min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 40, 'Médio', 'Cartão', 'Modular', 'Médio', FALSE),
(10, 10, 'Estratégia', 'Adulto', 1, '12+', '50min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 30, 'Pequeno', 'Cartão', 'Fixo', 'Fácil', FALSE),
(11, 11, 'Estratégia', 'Adulto', 2, '12+', '75min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 50, 'Grande', 'Cartão', 'Modular', 'Difícil', FALSE),
(12, 12, 'Estratégia', 'Adulto', 2, '12+', '90min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 40, 'Grande', 'Cartão', 'Fixo', 'Médio', FALSE),
(13, 13, 'Família', 'Infantil', 2, 'Livre', '30min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 30, 'Pequeno', 'Cartão', 'Fixo', 'Fácil', FALSE),
(14, 14, 'Estratégia', 'Adulto', 2, '10+', '45min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 35, 'Médio', 'Cartão', 'Fixo', 'Médio', FALSE),
(15, 15, 'Estratégia', 'Adulto', 2, '12+', '60min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 40, 'Médio', 'Cartão', 'Modular', 'Médio', FALSE),
(16, 16, 'Estratégia', 'Adulto', 2, '12+', '90min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 45, 'Grande', 'Cartão', 'Fixo', 'Médio', FALSE),
(17, 17, 'Estratégia', 'Adulto', 1, '12+', '120min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 50, 'Grande', 'Cartão', 'Fixo', 'Difícil', FALSE),
(18, 18, 'Estratégia', 'Adulto', 3, '12+', '75min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 40, 'Médio', 'Cartão', 'Modular', 'Médio', FALSE),
(19, 19, 'Estratégia', 'Adulto', 2, '12+', '90min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 50, 'Grande', 'Cartão', 'Fixo', 'Difícil', FALSE),
(20, 20, 'Estratégia', 'Adulto', 2, '12+', '120min', NULL, NULL, NULL, 'Tabuleiro', 0, TRUE, 60, 'Grande', 'Cartão', 'Modular', 'Difícil', FALSE),

-- Jogos de Cartas (id 21 a 40)
(21, 21, 'Estratégia', 'Adulto', 2, '12+', '45min', 'Cartas', 'Médio', 'Papel', 'Cartas', 60, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(22, 22, 'Estratégia', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 50, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(23, 23, 'Estratégia', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 50, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(24, 24, 'Família', 'Infantil', 4, 'Livre', '20min', 'Cartas', 'Pequeno', 'Cartão', 'Cartas', 108, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(25, 25, 'Família', 'Infantil', 2, 'Livre', '15min', 'Cartas', 'Pequeno', 'Cartão', 'Cartas', 56, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(26, 26, 'Estratégia', 'Adulto', 2, '12+', '40min', 'Cartas', 'Médio', 'Papel', 'Cartas', 80, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(27, 27, 'Estratégia', 'Adulto', 2, '12+', '35min', 'Cartas', 'Médio', 'Papel', 'Cartas', 72, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(28, 28, 'Estratégia', 'Adulto', 2, '12+', '30min', 'Cartas', 'Médio', 'Papel', 'Cartas', 70, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(29, 29, 'Estratégia', 'Adulto', 2, '12+', '40min', 'Cartas', 'Médio', 'Papel', 'Cartas', 60, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(30, 30, 'Estratégia', 'Adulto', 2, '12+', '30min', 'Cartas', 'Médio', 'Papel', 'Cartas', 50, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(31, 31, 'Estratégia', 'Adulto', 2, '12+', '35min', 'Cartas', 'Médio', 'Papel', 'Cartas', 60, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(32, 32, 'Estratégia', 'Adulto', 2, '12+', '40min', 'Cartas', 'Médio', 'Papel', 'Cartas', 70, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(33, 33, 'Estratégia', 'Adulto', 2, '12+', '25min', 'Cartas', 'Pequeno', 'Cartão', 'Cartas', 50, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(34, 34, 'Cooperativo', 'Adulto', 1, '12+', '60min', 'Cartas', 'Grande', 'Papel', 'Cartas', 60, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(35, 35, 'Cooperativo', 'Adulto', 1, '12+', '70min', 'Cartas', 'Grande', 'Papel', 'Cartas', 70, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(36, 36, 'Cooperativo', 'Adulto', 1, '12+', '50min', 'Cartas', 'Grande', 'Papel', 'Cartas', 60, TRUE, 0, NULL, NULL, NULL, 'Difícil', TRUE),
(37, 37, 'Estratégia', 'Adulto', 2, '12+', '45min', 'Cartas', 'Médio', 'Papel', 'Cartas', 50, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(38, 38, 'Estratégia', 'Infantil', 2, 'Livre', '30min', 'Cartas', 'Pequeno', 'Papel', 'Cartas', 60, TRUE, 0, NULL, NULL, NULL, 'Fácil', TRUE),
(39, 39, 'Estratégia', 'Adulto', 2, '12+', '40min', 'Cartas', 'Médio', 'Papel', 'Cartas', 70, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE),
(40, 40, 'Estratégia', 'Adulto', 2, '12+', '50min', 'Cartas', 'Médio', 'Papel', 'Cartas', 60, TRUE, 0, NULL, NULL, NULL, 'Médio', TRUE);

-- ProdutoRoupa (20 itens)
INSERT INTO `produto_roupa` (
    `id_produto`, `tamanho`, `cor`, `dimensoes`, `numero_modelo`, `tipo_capuz`,
    `espessura_tecido`, `material_forro`, `possui_ziper`, `resistente_agua`,
    `tipo_gola`, `tipo_manga`, `tecido`, `possui_bolsos`,
    `estampa_personalizada`, `modelo`
) VALUES
(41, 'M', 'Azul Marinho', '70x50cm', 'RM-1001', b'0', 'Médio', 'Algodão', b'1', b'0', 'Gola Redonda', 'Curta', 'Algodão', b'1', b'0', 'Camiseta Casual'),
(42, 'G', 'Branco', '72x52cm', 'RM-1002', b'0', 'Fino', 'Poliéster', b'0', b'0', 'Gola Polo', 'Curta', 'Poliéster', b'1', b'0', 'Polo Premium'),
(43, 'P', 'Preto', '68x48cm', 'RM-1003', b'1', 'Grossa', 'Lã Sintética', b'1', b'1', 'Gola Alta', 'Longa', 'Lã', b'1', b'0', 'Moletom Capuz'),
(44, 'GG', 'Cinza', '74x56cm', 'RM-1004', b'1', 'Grossa', 'Felpado', b'1', b'1', 'Gola Tradicional', 'Longa', 'Algodão', b'1', b'0', 'Jaqueta Básica'),
(45, 'M', 'Vermelho', '70x50cm', 'RM-1005', b'0', 'Médio', 'Algodão', b'0', b'0', 'Gola Redonda', 'Curta', 'Algodão', b'0', b'1', 'Camiseta Estampada'),
(46, 'G', 'Preto', '72x52cm', 'RM-1006', b'0', 'Fino', 'Poliéster', b'1', b'0', 'Gola V', 'Curta', 'Poliéster', b'1', b'0', 'Camiseta Slim'),
(47, 'M', 'Bege', '70x50cm', 'RM-1007', b'0', 'Fino', 'Seda', b'0', b'0', 'Gola Redonda', 'Curta', 'Seda', b'0', b'0', 'Blusa Seda'),
(48, 'P', 'Lilás', '68x48cm', 'RM-1008', b'0', 'Médio', 'Algodão', b'0', b'0', 'Gola Tradicional', '3/4', 'Algodão', b'0', b'1', 'Blusa Feminina'),
(49, 'G', 'Verde Militar', '72x52cm', 'RM-1009', b'1', 'Grossa', 'Felpado', b'1', b'1', 'Gola Alta', 'Longa', 'Algodão', b'1', b'0', 'Moletom Militar'),
(50, 'GG', 'Bordô', '74x56cm', 'RM-1010', b'0', 'Médio', 'Algodão', b'0', b'0', 'Gola V', 'Curta', 'Algodão', b'0', b'1', 'Camiseta Bordô'),
(51, 'P', 'Amarelo', '68x48cm', 'RM-1011', b'0', 'Fino', 'Poliéster', b'0', b'0', 'Gola Redonda', 'Curta', 'Poliéster', b'0', b'1', 'Regata Esportiva'),
(52, 'M', 'Preto', '70x50cm', 'RM-1012', b'0', 'Médio', 'Algodão', b'1', b'0', 'Gola Tradicional', 'Longa', 'Algodão', b'1', b'0', 'Camisa Social'),
(53, 'G', 'Jeans', '72x52cm', 'RM-1013', b'0', 'Grossa', 'Forro Jeans', b'1', b'1', 'Gola Tradicional', 'Longa', 'Jeans', b'1', b'0', 'Jaqueta Jeans'),
(54, 'M', 'Rosa', '70x50cm', 'RM-1014', b'0', 'Fino', 'Algodão', b'0', b'0', 'Gola Redonda', 'Curta', 'Algodão', b'0', b'1', 'Blusa Feminina Casual'),
(55, 'GG', 'Azul Claro', '74x56cm', 'RM-1015', b'1', 'Médio', 'Felpado', b'1', b'1', 'Gola Alta', 'Longa', 'Algodão', b'1', b'0', 'Moletom Unissex'),
(56, 'M', 'Verde', '70x50cm', 'RM-1016', b'0', 'Fino', 'Poliéster', b'0', b'0', 'Gola V', 'Curta', 'Poliéster', b'0', b'1', 'Camiseta Verde'),
(57, 'P', 'Branco', '68x48cm', 'RM-1017', b'0', 'Fino', 'Algodão', b'0', b'0', 'Gola Redonda', 'Curta', 'Algodão', b'0', b'0', 'Blusa Básica'),
(58, 'G', 'Preto', '72x52cm', 'RM-1018', b'0', 'Grossa', 'Lã Sintética', b'1', b'1', 'Gola Alta', 'Longa', 'Lã', b'1', b'0', 'Casaco Inverno'),
(59, 'M', 'Vinho', '70x50cm', 'RM-1019', b'0', 'Médio', 'Algodão', b'0', b'0', 'Gola V', 'Curta', 'Algodão', b'0', b'1', 'Camiseta Vinho'),
(60, 'GG', 'Cinza Escuro', '74x56cm', 'RM-1020', b'1', 'Grossa', 'Felpado', b'1', b'1', 'Gola Alta', 'Longa', 'Algodão', b'1', b'0', 'Moletom Premium');


-- Usuário
INSERT INTO usuario (nome, numero_telefone, email, usuario, senha, tipo_usuario, data_criacao) VALUES
('Administrador', '+55 (68) 99932-0031', 'admin@vannily.com', 'admin', '$2b$12$SyU2.9ps6CocZGHsg0KfA.4sqB.uaaGi.I.QItP1sYuFP/zr9xE9.', 'ADMIN', NOW()),
('Elyvan Teste', '+55 (68) 99940-0525', 'elyvan@vannily.com', 'elyvan', '$2b$12$vDrLNPPvIlPilD81eIpX0OXlU6ezgmi4Mso8IJbBvzjqU./9Y8Zq2', 'CLIENTE', NOW()),
('Cliente Demo', '+55 (68) 99983-5589', 'cliente@vannily.com', 'cliente', '$2b$12$IJUsHKRPzIQqVDH3X6uUaOfYkN5bbkeXZIdajd7SDvuusXAYdHFz6', 'CLIENTE', NOW());

-- Endereço
INSERT INTO `endereco` (`id`, `id_usuario`, `cep`, `pais`, `estado`, `cidade`, `bairro`, `rua`, `numero`, `complemento`) VALUES
(1, 1, '69900-000', 'Brasil', 'Acre', 'Rio Branco', 'Santa Inês', 'Rua das Flores', '123', 'Apto 101'),
(2, 2, '69900-001', 'Brasil', 'Acre', 'Rio Branco', 'Bosque', 'Rua das Palmeiras', '45', NULL),
(3, 3, '69900-002', 'Brasil', 'Acre', 'Rio Branco', 'Centro', 'Av. Sete de Setembro', '789', 'Casa');

