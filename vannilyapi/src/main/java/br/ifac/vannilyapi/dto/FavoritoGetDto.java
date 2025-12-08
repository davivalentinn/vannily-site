package br.ifac.vannilyapi.dto;

public record FavoritoGetDto(
        Long id,
        Long usuarioId,
        Long produtoId,
        String produtoNome,
        String produtoImagem
) { }
