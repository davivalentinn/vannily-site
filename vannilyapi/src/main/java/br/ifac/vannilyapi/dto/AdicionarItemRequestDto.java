package br.ifac.vannilyapi.dto;

public record AdicionarItemRequestDto(
        Long produtoId,
        Integer quantidade
) {}
