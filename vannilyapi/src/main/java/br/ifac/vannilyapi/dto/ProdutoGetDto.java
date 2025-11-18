package br.ifac.vannilyapi.dto;

public record ProdutoGetDto(
        Long id,
        String nome,
        String imagem,
        Double preco,
        Double desconto,
        Integer unidades,
        String descricao,
        String fornecedor,
        String transportadora,
        String categoriaNome,
        String tema,
        String genero
) {}
