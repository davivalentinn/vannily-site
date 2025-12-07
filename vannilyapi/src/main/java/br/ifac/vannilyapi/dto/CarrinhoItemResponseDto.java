package br.ifac.vannilyapi.dto;

public record CarrinhoItemResponseDto(
        Long produtoId,
        String nome,
        String imagem,
        Double preco,
        Double desconto,
        Integer quantidade,
        Double totalItem
) {}
