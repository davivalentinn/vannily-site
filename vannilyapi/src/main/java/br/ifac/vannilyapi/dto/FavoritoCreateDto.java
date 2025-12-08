package br.ifac.vannilyapi.dto;

public record FavoritoCreateDto(
        Long usuarioId,
        Long produtoId
) { }
